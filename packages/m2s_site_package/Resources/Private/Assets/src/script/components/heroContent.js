'use strict';

import Typed from 'typed.js';

class HeroContent {
    constructor(typingSelector, slogansSelector, typeSpeed, backSpeed) {
        this.typed = new Typed(typingSelector, {
            stringsElement: slogansSelector,
            showCursor: true,
            loop: true,
            typeSpeed: typeSpeed || 70,
            backSpeed: backSpeed || 50
        });
    }
}

export default HeroContent;
