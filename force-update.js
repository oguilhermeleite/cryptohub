// =====================================================
// CRYPTO AGGREGATOR - FORCE UPDATE SYSTEM
// Sistema de atualização forçada para usuários com cache antigo
// =====================================================

console.log('[Force Update] 🚀 Script loaded successfully!');

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
        console.log('[Force Update] Checking if update needed...');
        console.log('[Force Update] - Stored:', this.storedVersion);
        console.log('[Force Update] - Current:', this.currentVersion);
        console.log('[Force Update] - Force enabled:', forceUpdate);

        // Se não tem versão armazenada, é primeira vez - não mostrar
        if (!this.storedVersion) {
            console.log('[Force Update] ❌ No stored version (first visit) - skipping modal');
            return false;
        }

        // Se forceUpdate está ativado E as versões são diferentes
        if (forceUpdate && this.storedVersion !== this.currentVersion) {
            console.log('[Force Update] ✅ UPDATE NEEDED!');
            return true;
        }

        console.log('[Force Update] ℹ️ No update needed');
        return false;
    }

    showUpdateModal() {
        if (this.modalShown) return;
        this.modalShown = true;

        console.log('[Force Update] 🎨 Creating update badge...');

        // Criar badge discreto
        const badge = document.createElement('div');
        badge.className = 'update-badge';
        badge.id = 'updateBadge';
        badge.innerHTML = `
            <div class="update-content">
                <span class="update-icon">🚀</span>
                <span class="update-text">Versão ${this.currentVersion}</span>
            </div>
            <button class="update-btn" onclick="window.forceUpdateManager.performUpdate()">
                Atualizar
            </button>
        `;

        document.body.appendChild(badge);
        console.log('[Force Update] ✅ Badge added to DOM');

        // Mostrar com animação
        setTimeout(() => {
            badge.classList.add('show');
            console.log('[Force Update] 🎉 Badge visible!');
        }, 100);

        // Auto-hide após 15 segundos (dar tempo do usuário ver)
        setTimeout(() => {
            if (badge && badge.parentNode) {
                badge.style.animation = 'slideOut 0.3s ease';
                setTimeout(() => {
                    if (badge.parentNode) {
                        badge.remove();
                        this.modalShown = false;
                    }
                }, 300);
            }
        }, 15000);
    }

    async performUpdate() {
        console.log('[Force Update] Starting update process...');

        // Mudar badge para loading
        const updateBtn = document.querySelector('.update-btn');
        if (updateBtn) {
            updateBtn.innerHTML = '⏳ Atualizando...';
            updateBtn.disabled = true;
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
        console.log('[Force Update] User dismissed badge');
        const badge = document.getElementById('updateBadge');
        if (badge) {
            badge.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                badge.remove();
            }, 300);
        }
        this.modalShown = false;
    }
}

// Inicializar quando DOM estiver pronto
console.log('[Force Update] Document readyState:', document.readyState);
let forceUpdateManager;

if (document.readyState === 'loading') {
    console.log('[Force Update] Waiting for DOMContentLoaded...');
    document.addEventListener('DOMContentLoaded', () => {
        console.log('[Force Update] DOM ready, initializing manager...');
        forceUpdateManager = new ForceUpdateManager();
        window.forceUpdateManager = forceUpdateManager;
    });
} else {
    console.log('[Force Update] DOM already loaded, initializing immediately...');
    forceUpdateManager = new ForceUpdateManager();
    window.forceUpdateManager = forceUpdateManager;
}
