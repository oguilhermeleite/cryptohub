/* ═══════════════════════════════════════════════════════════════
   PREMIUM VISUAL ELEMENTS - JavaScript Controller
   FAB Menu | Toast System | Modal Manager | Interactive Elements
   ═══════════════════════════════════════════════════════════════ */

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 1. FLOATING ACTION BUTTON (FAB) - Controller
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class FloatingActionButton {
    constructor() {
        this.isOpen = false;
        this.init();
    }

    init() {
        const fabButton = document.querySelector('.fab-button');
        const fabMenu = document.querySelector('.fab-menu');

        if (!fabButton || !fabMenu) return;

        fabButton.addEventListener('click', () => this.toggle());

        // Close on outside click
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.fab-container')) {
                this.close();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') this.close();
        });
    }

    toggle() {
        this.isOpen ? this.close() : this.open();
    }

    open() {
        this.isOpen = true;
        document.querySelector('.fab-button')?.classList.add('active');
        document.querySelector('.fab-menu')?.classList.add('active');
    }

    close() {
        this.isOpen = false;
        document.querySelector('.fab-button')?.classList.remove('active');
        document.querySelector('.fab-menu')?.classList.remove('active');
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 2. TOAST NOTIFICATION SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class ToastNotification {
    constructor() {
        this.container = this.createContainer();
        this.toasts = [];
    }

    createContainer() {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }
        return container;
    }

    show(options = {}) {
        const {
            type = 'info',
            title = 'Notification',
            message = '',
            duration = 5000,
            icon = this.getDefaultIcon(type)
        } = options;

        const toast = this.createToast(type, title, message, icon);
        this.container.appendChild(toast);
        this.toasts.push(toast);

        // Auto remove after duration
        if (duration > 0) {
            setTimeout(() => this.remove(toast), duration);
        }

        return toast;
    }

    createToast(type, title, message, icon) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;

        toast.innerHTML = `
            <div class="toast-icon">${icon}</div>
            <div class="toast-content">
                <div class="toast-title">${title}</div>
                ${message ? `<div class="toast-message">${message}</div>` : ''}
            </div>
            <button class="toast-close" aria-label="Close">×</button>
        `;

        // Close button handler
        toast.querySelector('.toast-close').addEventListener('click', () => {
            this.remove(toast);
        });

        // Click anywhere on toast to close
        toast.addEventListener('click', (e) => {
            if (!e.target.classList.contains('toast-close')) {
                this.remove(toast);
            }
        });

        return toast;
    }

    remove(toast) {
        toast.classList.add('removing');
        setTimeout(() => {
            if (toast.parentElement) {
                toast.parentElement.removeChild(toast);
            }
            this.toasts = this.toasts.filter(t => t !== toast);
        }, 300);
    }

    getDefaultIcon(type) {
        const icons = {
            success: '✓',
            info: 'ℹ',
            warning: '⚠',
            error: '✕',
            premium: '⭐'
        };
        return icons[type] || icons.info;
    }

    // Shorthand methods
    success(title, message, duration) {
        return this.show({ type: 'success', title, message, duration, icon: '✓' });
    }

    info(title, message, duration) {
        return this.show({ type: 'info', title, message, duration, icon: 'ℹ' });
    }

    warning(title, message, duration) {
        return this.show({ type: 'warning', title, message, duration, icon: '⚠' });
    }

    error(title, message, duration) {
        return this.show({ type: 'error', title, message, duration, icon: '✕' });
    }

    premium(title, message, duration) {
        return this.show({ type: 'premium', title, message, duration, icon: '⭐' });
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 3. MODAL OVERLAY SYSTEM
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

class PremiumModal {
    constructor(modalId) {
        this.modalId = modalId;
        this.overlay = document.querySelector(`#${modalId}`);
        if (this.overlay) {
            this.init();
        }
    }

    init() {
        const closeBtn = this.overlay.querySelector('.premium-modal-close');
        const cancelBtn = this.overlay.querySelector('[data-modal-cancel]');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.close());
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => this.close());
        }

        // Close on overlay click
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) {
                this.close();
            }
        });

        // Close on ESC key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });
    }

    open() {
        this.overlay?.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay?.classList.remove('active');
        document.body.style.overflow = '';
    }

    isOpen() {
        return this.overlay?.classList.contains('active') || false;
    }

    setContent(title, body) {
        const titleEl = this.overlay.querySelector('.premium-modal-title');
        const bodyEl = this.overlay.querySelector('.premium-modal-body');

        if (titleEl) titleEl.textContent = title;
        if (bodyEl) bodyEl.innerHTML = body;
    }
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 4. GLOBAL INSTANCES & INITIALIZATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Initialize FAB
    if (document.querySelector('.fab-container')) {
        window.fab = new FloatingActionButton();
    }

    // Initialize Toast System
    window.toast = new ToastNotification();

    // Initialize all modals
    document.querySelectorAll('.premium-modal-overlay').forEach(overlay => {
        const modalId = overlay.id;
        if (modalId) {
            window[`modal_${modalId}`] = new PremiumModal(modalId);
        }
    });

    // Example: Auto-trigger buttons that open modals
    document.querySelectorAll('[data-modal-trigger]').forEach(trigger => {
        trigger.addEventListener('click', () => {
            const modalId = trigger.getAttribute('data-modal-trigger');
            const modal = window[`modal_${modalId}`];
            if (modal) {
                modal.open();
            }
        });
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 5. DEMO FUNCTIONS - Examples of Usage
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Example toast notifications
function showDemoToasts() {
    setTimeout(() => {
        window.toast.success(
            'Conexão Estabelecida',
            'Sua carteira foi conectada com sucesso!'
        );
    }, 1000);

    setTimeout(() => {
        window.toast.info(
            'Nova Atualização',
            'Confira as novidades da plataforma.'
        );
    }, 2500);

    setTimeout(() => {
        window.toast.premium(
            'Recurso PRO',
            'Desbloqueie recursos avançados de análise.'
        );
    }, 4000);
}

// Example FAB menu item actions
function setupFABActions() {
    const fabItems = document.querySelectorAll('.fab-menu-item');

    fabItems.forEach((item, index) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();

            const action = item.getAttribute('data-action');

            switch(action) {
                case 'theme':
                    toggleTheme();
                    window.toast.info('Tema', 'Tema alterado com sucesso!');
                    break;
                case 'share':
                    handleShare();
                    break;
                case 'favorites':
                    window.toast.success('Favoritos', 'Adicionado aos favoritos!');
                    break;
                case 'settings':
                    // Open settings modal if exists
                    const settingsModal = window.modal_settingsModal;
                    if (settingsModal) settingsModal.open();
                    break;
                case 'help':
                    window.toast.info('Ajuda', 'Em breve: Central de ajuda completa.');
                    break;
            }

            // Close FAB menu after action
            if (window.fab) {
                window.fab.close();
            }
        });
    });
}

// Theme toggle helper
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

// Share functionality
function handleShare() {
    if (navigator.share) {
        navigator.share({
            title: 'Crypto Aggregator',
            text: 'Confira as melhores plataformas de criptomoedas!',
            url: window.location.href
        }).then(() => {
            window.toast.success('Compartilhado', 'Link compartilhado com sucesso!');
        }).catch(() => {
            fallbackShare();
        });
    } else {
        fallbackShare();
    }
}

// Fallback share (copy to clipboard)
function fallbackShare() {
    navigator.clipboard.writeText(window.location.href).then(() => {
        window.toast.success('Copiado', 'Link copiado para área de transferência!');
    }).catch(() => {
        window.toast.error('Erro', 'Não foi possível copiar o link.');
    });
}

// Initialize FAB actions when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    setupFABActions();
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 6. UTILITY FUNCTIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

// Create modal dynamically
function createModal(id, title, body, buttons = []) {
    const overlay = document.createElement('div');
    overlay.className = 'premium-modal-overlay';
    overlay.id = id;

    const buttonsHTML = buttons.map(btn => `
        <button class="premium-modal-button premium-modal-button-${btn.type || 'secondary'}"
                ${btn.action ? `onclick="${btn.action}"` : ''}
                ${btn.dataAttr ? btn.dataAttr : ''}>
            ${btn.label}
        </button>
    `).join('');

    overlay.innerHTML = `
        <div class="premium-modal">
            <div class="premium-modal-header">
                <h3 class="premium-modal-title">${title}</h3>
                <button class="premium-modal-close" aria-label="Close">×</button>
            </div>
            <div class="premium-modal-body">${body}</div>
            ${buttons.length ? `<div class="premium-modal-footer">${buttonsHTML}</div>` : ''}
        </div>
    `;

    document.body.appendChild(overlay);
    window[`modal_${id}`] = new PremiumModal(id);

    return window[`modal_${id}`];
}

// Show confirmation modal
function showConfirmation(title, message, onConfirm, onCancel) {
    const modalId = 'confirmModal_' + Date.now();

    const modal = createModal(modalId, title, message, [
        {
            label: 'Cancelar',
            type: 'secondary',
            dataAttr: 'data-modal-cancel'
        },
        {
            label: 'Confirmar',
            type: 'primary',
            action: `window.modal_${modalId}.close(); (${onConfirm.toString()})();`
        }
    ]);

    modal.open();

    return modal;
}

// Export to window for global access
window.PremiumElements = {
    FloatingActionButton,
    ToastNotification,
    PremiumModal,
    createModal,
    showConfirmation,
    showDemoToasts
};

console.log('🚀 Premium Elements initialized successfully!');
