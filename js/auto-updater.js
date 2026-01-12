/**
 * AUTO-UPDATER SYSTEM
 * Sistema inteligente de atualização automática que força o navegador
 * a sempre carregar a versão mais recente sem precisar limpar cache
 */

(function() {
    'use strict';

    const AutoUpdater = {
        // Configurações
        config: {
            checkInterval: 30000, // Verifica a cada 30 segundos
            versionFile: '/version.json',
            storageKey: 'site_version',
            forceReloadDelay: 1000,
            maxRetries: 3
        },

        // Estado
        state: {
            currentVersion: null,
            checking: false,
            retries: 0
        },

        /**
         * Inicializa o sistema de auto-update
         */
        init() {
            console.log('[AutoUpdater] Inicializando sistema de auto-atualização...');

            // Carrega versão atual do localStorage
            this.state.currentVersion = localStorage.getItem(this.config.storageKey);

            // Verifica versão imediatamente
            this.checkVersion();

            // Configura verificação periódica
            setInterval(() => this.checkVersion(), this.config.checkInterval);

            // Detecta quando a página fica visível novamente (usuário volta para a aba)
            document.addEventListener('visibilitychange', () => {
                if (!document.hidden) {
                    this.checkVersion();
                }
            });

            // Detecta quando volta do background
            window.addEventListener('focus', () => {
                this.checkVersion();
            });

            // Força atualização do Service Worker
            this.updateServiceWorker();
        },

        /**
         * Verifica se há nova versão disponível
         */
        async checkVersion() {
            if (this.state.checking) return;

            this.state.checking = true;

            try {
                // Adiciona timestamp para evitar cache
                const timestamp = new Date().getTime();
                const response = await fetch(`${this.config.versionFile}?t=${timestamp}`, {
                    cache: 'no-store',
                    headers: {
                        'Cache-Control': 'no-cache, no-store, must-revalidate',
                        'Pragma': 'no-cache',
                        'Expires': '0'
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}`);
                }

                const data = await response.json();
                const serverVersion = data.version;

                console.log('[AutoUpdater] Versão do servidor:', serverVersion);
                console.log('[AutoUpdater] Versão local:', this.state.currentVersion);

                // Se não tem versão local, salva a atual
                if (!this.state.currentVersion) {
                    this.state.currentVersion = serverVersion;
                    localStorage.setItem(this.config.storageKey, serverVersion);
                    console.log('[AutoUpdater] Versão inicial registrada:', serverVersion);
                    this.state.checking = false;
                    return;
                }

                // IMPORTANTE: Só atualiza se a versão for DIFERENTE
                // Ignora o forceUpdate para evitar loops infinitos
                if (serverVersion !== this.state.currentVersion) {
                    console.log('[AutoUpdater] 🔄 Nova versão detectada! Atualizando...');
                    console.log('[AutoUpdater]    De:', this.state.currentVersion, '→ Para:', serverVersion);
                    this.performUpdate(serverVersion);
                } else {
                    console.log('[AutoUpdater] ✅ Versão atual está atualizada');
                }

                this.state.retries = 0;
            } catch (error) {
                console.error('[AutoUpdater] Erro ao verificar versão:', error);
                this.state.retries++;

                if (this.state.retries >= this.config.maxRetries) {
                    console.warn('[AutoUpdater] Número máximo de tentativas atingido');
                }
            } finally {
                this.state.checking = false;
            }
        },

        /**
         * Executa a atualização do site
         */
        async performUpdate(newVersion) {
            try {
                // Limpa todos os caches
                await this.clearAllCaches();

                // Atualiza Service Worker
                await this.updateServiceWorker();

                // Salva nova versão
                localStorage.setItem(this.config.storageKey, newVersion);
                this.state.currentVersion = newVersion;

                // Mostra notificação ao usuário
                this.showUpdateNotification();

                // Aguarda um pouco e recarrega a página
                setTimeout(() => {
                    console.log('[AutoUpdater] Recarregando página com nova versão...');
                    window.location.reload(true);
                }, this.config.forceReloadDelay);

            } catch (error) {
                console.error('[AutoUpdater] Erro ao executar atualização:', error);
                // Mesmo com erro, tenta recarregar a página
                setTimeout(() => window.location.reload(true), this.config.forceReloadDelay);
            }
        },

        /**
         * Limpa todos os caches do navegador
         */
        async clearAllCaches() {
            console.log('[AutoUpdater] Limpando caches...');

            // Limpa Cache API
            if ('caches' in window) {
                try {
                    const cacheNames = await caches.keys();
                    await Promise.all(
                        cacheNames.map(cacheName => {
                            console.log('[AutoUpdater] Removendo cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                    );
                } catch (error) {
                    console.error('[AutoUpdater] Erro ao limpar Cache API:', error);
                }
            }

            // Limpa sessionStorage (mantém localStorage para o versionamento)
            try {
                sessionStorage.clear();
            } catch (error) {
                console.error('[AutoUpdater] Erro ao limpar sessionStorage:', error);
            }

            console.log('[AutoUpdater] ✅ Caches limpos');
        },

        /**
         * Atualiza o Service Worker
         */
        async updateServiceWorker() {
            if ('serviceWorker' in navigator) {
                try {
                    const registration = await navigator.serviceWorker.getRegistration();

                    if (registration) {
                        console.log('[AutoUpdater] Atualizando Service Worker...');

                        // Força atualização do SW
                        await registration.update();

                        // Se há um SW esperando, ativa ele imediatamente
                        if (registration.waiting) {
                            registration.waiting.postMessage({ type: 'SKIP_WAITING' });
                        }

                        // Escuta por novo SW ativado
                        navigator.serviceWorker.addEventListener('controllerchange', () => {
                            console.log('[AutoUpdater] Service Worker atualizado');
                        });
                    }
                } catch (error) {
                    console.error('[AutoUpdater] Erro ao atualizar Service Worker:', error);
                }
            }
        },

        /**
         * Mostra notificação visual de atualização
         */
        showUpdateNotification() {
            // Remove notificação anterior se existir
            const existingNotification = document.getElementById('auto-update-notification');
            if (existingNotification) {
                existingNotification.remove();
            }

            // Cria notificação
            const notification = document.createElement('div');
            notification.id = 'auto-update-notification';
            notification.innerHTML = `
                <div style="
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: linear-gradient(135deg, #01dba2 0%, #a9d9df 100%);
                    color: white;
                    padding: 16px 24px;
                    border-radius: 12px;
                    box-shadow: 0 8px 32px rgba(1, 219, 162, 0.3);
                    z-index: 999999;
                    font-family: 'Inter', sans-serif;
                    font-size: 14px;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    animation: slideIn 0.3s ease-out;
                ">
                    <span style="font-size: 20px;">🔄</span>
                    <span>Atualizando para versão mais recente...</span>
                </div>
                <style>
                    @keyframes slideIn {
                        from {
                            transform: translateX(400px);
                            opacity: 0;
                        }
                        to {
                            transform: translateX(0);
                            opacity: 1;
                        }
                    }
                </style>
            `;

            document.body.appendChild(notification);

            // Remove após 3 segundos
            setTimeout(() => {
                notification.style.transition = 'opacity 0.3s ease-out';
                notification.style.opacity = '0';
                setTimeout(() => notification.remove(), 300);
            }, 3000);
        },

        /**
         * Força atualização imediata
         */
        forceUpdate() {
            console.log('[AutoUpdater] Forçando atualização imediata...');
            this.clearAllCaches().then(() => {
                window.location.reload(true);
            });
        }
    };

    // Inicializa quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AutoUpdater.init());
    } else {
        AutoUpdater.init();
    }

    // Expõe globalmente para debug
    window.AutoUpdater = AutoUpdater;

    console.log('[AutoUpdater] Sistema carregado. Use AutoUpdater.forceUpdate() para forçar atualização.');

})();
