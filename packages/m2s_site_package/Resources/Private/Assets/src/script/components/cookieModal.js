'use strict';

class CookieModal {
    constructor(container) {
        if (typeof container === 'string') {
            container = document.querySelector(container);
        }

        if (container) {
            this.container = container;
            this.container.setAttribute('style', 'display: block;');

            if (!CookieModal.getConsentCookie()) {
                this.container.querySelectorAll('button').forEach(button => {
                    button.addEventListener('click', e => {
                        CookieModal.setConsentCookie(
                            e.currentTarget.getAttribute('data-value')
                        );
                        this.container.className = '';
                        setTimeout(() => {
                            this.container.remove();
                        }, 500);
                    });
                });
                this.container.className = 'show';
            } else {
                this.container.remove();
            }
        }
    }

    static setConsentCookie(value) {
        document.cookie =
            'cookieconsent_status=' + value + '; path=/; max-age=31536000';
        window.location.reload(true);
    }

    static getConsentCookie() {
        const match = document.cookie.match(
            /(?:^|; )cookieconsent_status=([^;]+)(?:;|$)/
        );
        if (!match || !match[1]) {
            return false;
        }

        return match[1];
    }
}

export default CookieModal;
