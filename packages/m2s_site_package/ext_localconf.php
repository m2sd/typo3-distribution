<?php
defined('TYPO3_MODE') or die();

/**** Add TSConfig files ****/
/* Page configuration */
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
    '<INCLUDE_TYPOSCRIPT: source="FILE:EXT:m2s_site_package/Configuration/TSConfig/Page/Global.tsconfig">'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
    '<INCLUDE_TYPOSCRIPT: source="DIR:EXT:m2s_site_package/Configuration/TSConfig/Page/Layouts" extensions="tsconfig">'
);
\TYPO3\CMS\Core\Utility\ExtensionManagementUtility::addPageTSConfig(
    '<INCLUDE_TYPOSCRIPT: source="DIR:EXT:m2s_site_package/Configuration/TSConfig/Page/Elements" extensions="tsconfig">'
);
