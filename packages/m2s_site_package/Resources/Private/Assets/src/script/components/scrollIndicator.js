'use strict';

import debounce from 'just-debounce-it';

const defaults = {
    input: document.querySelector('html'),
    offset: 0,
    firstLoadDelay: 0,
    debounceInverval: 500
};

class ScrollIndicator {
    constructor(element, options) {
        this.options = Object.assign(defaults, options);

        if (typeof element === 'string') {
            this.element = document.querySelector(element);
        } else {
            this.element = element;
        }

        this.scrollListener = () => {
            this.updatePosition();
        };
        this.resizeListener = debounce(() => {
            this.redraw();
        }, this.options.debounceInterval);

        window.addEventListener('load', () => {
            setTimeout(() => {
                this.init();
            }, this.options.firstLoadDelay);
        });
    }

    init() {
        this.ratio =
            (this.element.parentElement.scrollHeight + this.options.offset) /
            (this.options.input.scrollHeight - this.options.input.clientHeight);

        this.updatePosition();
        window.addEventListener('scroll', this.scrollListener);
        window.addEventListener('resize', this.resizeListener);
    }

    destroy() {
        if (this.element.style.removeProperty) {
            this.element.style.removeProperty('height');
        } else {
            this.element.style.removeAttribute('height');
        }
        window.removeEventListener('scroll', this.scrollListener);
        window.removeEventListener('resize', this.resizeListener);
    }

    redraw() {
        this.destroy();
        this.init();
    }

    updatePosition() {
        this.element.style.display = 'none';
        this.element.style.height =
            this.ratio * this.options.input.scrollTop + 'px';
        this.element.style.display = null;
    }
}

export default ScrollIndicator;
