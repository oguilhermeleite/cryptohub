// =====================================================
// CRYPTO AGGREGATOR - AUTO UPDATE SYSTEM
// Professional auto-update and cache busting solution
// =====================================================

class AutoUpdateManager {
    constructor() {
        this.currentVersion = null;
        this.checkInterval = 60000; // Check every 60 seconds
        this.versionCheckUrl = '/version.json';
        this.updateNotificationShown = false;

        this.init();
    }

    async init() {
        console.log('🔄 Auto-Update System initialized');

        // Get current version
        await this.loadCurrentVersion();

        // Start periodic version checking
        this.startVersionCheck();

        // Handle page visibility changes (when user comes back to tab)
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                this.checkForUpdates();
            }
        });

        // Check on window focus
        window.addEventListener('focus', () => {
            this.checkForUpdates();
        });

        // Service Worker update detection
        this.setupServiceWorkerUpdateDetection();
    }

    async loadCurrentVersion() {
        try {
            const response = await fetch(this.versionCheckUrl + '?t=' + Date.now());
            const data = await response.json();
            this.currentVersion = data.version;
            console.log('📦 Current version:', this.currentVersion);

            // Store version in localStorage
            localStorage.setItem('app_version', this.currentVersion);
        } catch (error) {
            console.warn('⚠️ Could not load version:', error);
        }
    }

    startVersionCheck() {
        // Check immediately
        this.checkForUpdates();

        // Then check periodically
        setInterval(() => {
            this.checkForUpdates();
        }, this.checkInterval);
    }

    async checkForUpdates() {
        try {
            // Bypass cache with timestamp
            const response = await fetch(this.versionCheckUrl + '?t=' + Date.now(), {
                cache: 'no-store',
                headers: {
                    'Cache-Control': 'no-cache, no-store, must-revalidate',
                    'Pragma': 'no-cache',
                    'Expires': '0'
                }
            });

            const data = await response.json();
            const latestVersion = data.version;

            // Compare versions
            if (this.currentVersion && latestVersion !== this.currentVersion) {
                console.log('🆕 New version available:', latestVersion);
                this.showUpdateNotification(data);
            }
        } catch (error) {
            console.warn('⚠️ Version check failed:', error);
        }
    }

    showUpdateNotification(versionData) {
        if (this.updateNotificationShown) return;
        this.updateNotificationShown = true;

        // Create elegant notification
        const notification = document.createElement('div');
        notification.className = 'auto-update-notification';
        notification.innerHTML = `
            <div class="auto-update-content">
                <div class="auto-update-icon">🚀</div>
                <div class="auto-update-text">
                    <h4>Nova versão disponível!</h4>
                    <p>Versão ${versionData.version} está pronta</p>
                </div>
                <button class="auto-update-btn" onclick="autoUpdateManager.performUpdate()">
                    Atualizar Agora
                </button>
                <button class="auto-update-close" onclick="autoUpdateManager.closeNotification()">
                    ✕
                </button>
            </div>
        `;

        document.body.appendChild(notification);

        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);

        // Auto-update after 10 seconds if user doesn't interact
        setTimeout(() => {
            if (notification.classList.contains('show')) {
                this.performUpdate();
            }
        }, 10000);
    }

    async performUpdate() {
        console.log('🔄 Performing update...');

        // Show loading state
        const notification = document.querySelector('.auto-update-notification');
        if (notification) {
            notification.innerHTML = `
                <div class="auto-update-content">
                    <div class="auto-update-icon">⏳</div>
                    <div class="auto-update-text">
                        <h4>Atualizando...</h4>
                        <p>Por favor, aguarde</p>
                    </div>
                </div>
            `;
        }

        try {
            // Clear service worker cache
            if ('serviceWorker' in navigator) {
                const registrations = await navigator.serviceWorker.getRegistrations();
                for (const registration of registrations) {
                    await registration.unregister();
                }
            }

            // Clear browser cache
            if ('caches' in window) {
                const cacheNames = await caches.keys();
                await Promise.all(
                    cacheNames.map(cacheName => caches.delete(cacheName))
                );
            }

            // Clear localStorage version
            localStorage.removeItem('app_version');

            // Reload page with cache bust
            window.location.reload(true);
        } catch (error) {
            console.error('❌ Update failed:', error);
            this.closeNotification();
        }
    }

    closeNotification() {
        const notification = document.querySelector('.auto-update-notification');
        if (notification) {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
                this.updateNotificationShown = false;
            }, 300);
        }
    }

    setupServiceWorkerUpdateDetection() {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/sw.js').then(registration => {
                // Check for updates on load
                registration.update();

                // Listen for new service worker
                registration.addEventListener('updatefound', () => {
                    const newWorker = registration.installing;

                    newWorker.addEventListener('statechange', () => {
                        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                            console.log('🆕 New service worker installed');
                            // New version is available
                            this.checkForUpdates();
                        }
                    });
                });
            });
        }
    }
}

// Initialize auto-update manager
let autoUpdateManager;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        autoUpdateManager = new AutoUpdateManager();
    });
} else {
    autoUpdateManager = new AutoUpdateManager();
}

// Make it globally accessible for button onclick
window.autoUpdateManager = autoUpdateManager;
