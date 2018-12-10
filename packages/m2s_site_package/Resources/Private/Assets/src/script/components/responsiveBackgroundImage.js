'use strict';

class ResponsiveBackgroundImage {
    constructor(element) {
        this.element = element;
        this.image = element.querySelector('img');
        this.src = '';

        this.image.addEventListener('load', () => {
            this.update();
        });

        if (this.image.complete) {
            this.update();
        }
    }

    update() {
        const src =
            typeof this.image.currentSrc !== 'undefined'
                ? this.image.currentSrc
                : this.image.src;

        if (this.src !== src) {
            this.src = src;
            this.element.style.backgroundImage = 'url("' + this.src + '")';
        }
    }
}

module.exports = ResponsiveBackgroundImage;
