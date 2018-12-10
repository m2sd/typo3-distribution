<?php
defined('TYPO3_MODE') or die('Access denied.');

$GLOBALS['TBE_STYLES']['stylesheet'] = 'EXT:m2s_site_package/Resources/Public/Css/login.css';

(function () {
    $iconRegistry = \TYPO3\CMS\Core\Utility\GeneralUtility::makeInstance(\TYPO3\CMS\Core\Imaging\IconRegistry::class);

    $iconRegistry->registerIcon(
        'tx-m2s-site-icon',
        \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
        ['source' => 'EXT:m2s/Resources/Public/Icons/Extension.png']
    );
    $iconRegistry->registerIcon(
        'tx-m2s-site-layout-root',
        \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
        ['source' => 'EXT:m2s/Resources/Public/Icons/Layouts/root.png']
    );
    $iconRegistry->registerIcon(
        'tx-m2s-site-layout-page',
        \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
        ['source' => 'EXT:m2s/Resources/Public/Icons/Layouts/page.png']
    );
    $iconRegistry->registerIcon(
        'tx-m2s-site-layout-list',
        \TYPO3\CMS\Core\Imaging\IconProvider\BitmapIconProvider::class,
        ['source' => 'EXT:m2s/Resources/Public/Icons/Extension.png']
    );
})();
