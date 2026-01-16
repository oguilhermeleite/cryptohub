// =====================================================
// CRYPTO AGGREGATOR - FORCE UPDATE SYSTEM
// Sistema de atualização forçada para usuários com cache antigo
// =====================================================

class ForceUpdateManager {
    constructor() {
        this.currentVersion = null;
        this.storedVersion = null;
        this.versionCheckUrl = '/version.json';
        this.modalShown = false;

        this.init();
    }

    async init() {
        console.log('[Force Update] Initializing version check...');

        // Buscar versão atual do servidor
        await this.checkVersion();
    }

    async checkVersion() {
        try {
            // Buscar versão do servidor (com cache bust)
            const response = await fetch(this.versionCheckUrl + '?t=' + Date.now(), {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });

            if (!response.ok) {
                console.warn('[Force Update] Could not fetch version');
                return;
            }

            const data = await response.json();
            this.currentVersion = data.version;
            const forceUpdate = data.forceUpdate || false;

            console.log('[Force Update] Server version:', this.currentVersion);
            console.log('[Force Update] Force update enabled:', forceUpdate);

            // Buscar versão armazenada localmente
            this.storedVersion = localStorage.getItem('site_version');
            console.log('[Force Update] Stored version:', this.storedVersion || 'none');

            // Verificar se precisa atualizar
            if (this.needsUpdate(forceUpdate)) {
                console.log('[Force Update] UPDATE REQUIRED - Showing modal');
                this.showUpdateModal();
            } else {
                console.log('[Force Update] Version is up to date');
                // Salvar versão atual
                localStorage.setItem('site_version', this.currentVersion);
            }

        } catch (error) {
            console.warn('[Force Update] Version check failed:', error);
        }
    }

    needsUpdate(forceUpdate) {
        // Se não tem versão armazenada, é primeira vez - não mostrar
        if (!this.storedVersion) {
            return false;
        }

        // Se forceUpdate está ativado E as versões são diferentes
        if (forceUpdate && this.storedVersion !== this.currentVersion) {
            return true;
        }

        return false;
    }

    showUpdateModal() {
        if (this.modalShown) return;
        this.modalShown = true;

        // Criar overlay
        const overlay = document.createElement('div');
        overlay.className = 'force-update-overlay';
        overlay.innerHTML = `
            <div class="force-update-modal">
                <div class="force-update-header">
                    <div class="force-update-icon">🚀</div>
                    <h2>Nova Versão Disponível!</h2>
                </div>
                <div class="force-update-body">
                    <p class="force-update-version">Versão <strong>${this.currentVersion}</strong></p>
                    <p class="force-update-message">
                        Detectamos que você está usando uma versão desatualizada do site.
                        Por favor, atualize para ter acesso às melhorias mais recentes e garantir o melhor desempenho.
                    </p>
                    <ul class="force-update-benefits">
                        <li>✅ Novas funcionalidades</li>
                        <li>✅ Melhor desempenho</li>
                        <li>✅ Correções de bugs</li>
                        <li>✅ Interface atualizada</li>
                    </ul>
                </div>
                <div class="force-update-footer">
                    <button class="force-update-btn force-update-btn-primary" onclick="forceUpdateManager.performUpdate()">
                        Atualizar Agora
                    </button>
                    <button class="force-update-btn force-update-btn-secondary" onclick="forceUpdateManager.dismissModal()">
                        Atualizar Depois
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Mostrar com animação
        setTimeout(() => {
            overlay.classList.add('show');
        }, 100);
    }

    async performUpdate() {
        console.log('[Force Update] Starting update process...');

        // Mudar botão para loading
        const primaryBtn = document.querySelector('.force-update-btn-primary');
        if (primaryBtn) {
            primaryBtn.innerHTML = '⏳ Atualizando...';
            primaryBtn.disabled = true;
        }

        try {
            // 1. Limpar Service Worker cache
            if ('serviceWorker' in navigator) {
                console.log('[Force Update] Clearing service worker cache...');
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) {
                    await registration.unregister();
                }
            }

            // 2. Limpar Cache API
            if ('caches' in window) {
                console.log('[Force Update] Clearing cache storage...');
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            }

            // 3. Salvar nova versão no localStorage
            localStorage.setItem('site_version', this.currentVersion);
            console.log('[Force Update] Saved new version:', this.currentVersion);

            // 4. Recarregar página com cache bust
            console.log('[Force Update] Reloading page...');
            window.location.href = window.location.href.split('?')[0] + '?v=' + Date.now();

        } catch (error) {
            console.error('[Force Update] Update failed:', error);
            alert('Erro ao atualizar. Por favor, recarregue a página manualmente (Ctrl+Shift+R)');
        }
    }

    dismissModal() {
        console.log('[Force Update] User dismissed modal');
        const overlay = document.querySelector('.force-update-overlay');
        if (overlay) {
            overlay.classList.remove('show');
            setTimeout(() => {
                overlay.remove();
            }, 300);
        }
        this.modalShown = false;
    }
}

// Inicializar quando DOM estiver pronto
let forceUpdateManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        forceUpdateManager = new ForceUpdateManager();
    });
} else {
    forceUpdateManager = new ForceUpdateManager();
}

// Tornar globalmente acessível para onclick
window.forceUpdateManager = forceUpdateManager;
