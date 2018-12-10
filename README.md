# M² solutions typo3 kickstarter

Slight variation of the [helhum/typo3-distribution](https://github.com/helhum/TYPO3-Distribution) courtesy of [Helmut Hummel](https://helhum.io/).

Comes with the following features:

-   guided installation
-   typo3cms (Typo3 console)
-   `.yml` setup convertible to `.php` for production
-   customizable error pages
-   secure setup, only exposes public ressources in web root (`/public`)

Additions:

-   3 custom page layouts with content defender setup
-   8 custom elements
-   A PHP utility class to facilitate adding custom elements/plugins
-   composer script to format all `.php` files in `/packages` (coding style provided by [helhum/typo3-distribution](https://github.com/helhum/TYPO3-Distribution))
-   webpack setup to generate assest from modular resources
-   webpack adapter to automatically load generated ressources into typoscript
-   automatic asynchronous loading with fully configurable screen loader

## Installation steps

1. `git clone git@github.com:m2sd/typo3-distribution.git [project-name]`
2. `cd [project-name]`
3. `composer install`
4. Complete setup

Thanks to Helmut Hummel for his Typo3-Disto
