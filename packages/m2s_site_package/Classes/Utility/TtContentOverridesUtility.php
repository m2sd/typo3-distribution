<?php

/**
 * Created by PhpStorm.
 * User: main
 * Date: 10/3/18
 * Time: 9:59 AM
 */
namespace M2S\SitePackage\Utility;

use TYPO3\CMS\Core\Utility\ArrayUtility;
use TYPO3\CMS\Core\Utility\ExtensionManagementUtility;

class TtContentOverridesUtility
{
    /**
     * @param string $name
     * @param string $type
     * @param string $icon
     * @param string $showItems
     * @param array  $columnOverrides
     */
    public static function addCustomPlugin(string $name, string $type, string $icon, string $showItems, array $columnOverrides = []) : void
    {
        ExtensionManagementUtility::addPlugin(
            [
                $name,
                $type,
                $icon,
            ],
            'CType',
            'm2s_site_package'
        );

        $GLOBALS['TCA']['tt_content']['types'][$type] = [
            'showitem' => '
			    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:general,
			        --palette--;;general,' .
                    trim(trim($showItems), ',') . ',' .
                '--div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:language,
			        --palette--;;language,
			    --div--;LLL:EXT:core/Resources/Private/Language/Form/locallang_tabs.xlf:access,
			        --palette--;;hidden,
			        --palette--;;access
			',
            'columnsOverrides' => $columnOverrides,
        ];
    }

    /**
     * @param string $name
     * @param string $type
     * @param string $icon
     * @param string $flexForm
     * @param string $additionalShowItems
     * @param array  $additionalColumnOverrides
     */
    public static function addCustomFlexFormPlugin(string $name, string $type, string $icon, string $flexForm, string $additionalShowItems = '', array $additionalColumnOverrides = []) : void
    {
        $columnOverrides = [
            'header' => [
                'l10n_mode' => '',
            ],
            'bodytext' => [
                'l10n_mode' => '',
            ],
            'rowDescription' => [
                'config' => [
                    'rows' => 1,
                ],
            ],
            'pi_flexform' => [
                'config' => [
                    'search' => [
                        'andWhere' => '`CType`=`' . $type . '`',
                    ],
                    'ds_pointerField' => 'CType',
                ],
            ],
        ];

        ArrayUtility::mergeRecursiveWithOverrule($columnOverrides, $additionalColumnOverrides);

        self::addCustomPlugin($name, $type, $icon, 'header;Internal name (will not be displayed on page),pi_flexform,' . $additionalShowItems, $columnOverrides);

        $GLOBALS['TCA']['tt_content']['columns']['pi_flexform']['config']['ds'][$type] = $flexForm;
    }
}
