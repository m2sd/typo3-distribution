<?php

// function wrapper to avoid cluttering the global namespace
(function () {
    // Disable the description record so it can be used as content field
    $GLOBALS['TCA']['tt_content']['ctrl']['descriptionColumn'] = null;

    /** ### Add custom content elements ### */
    /** ## Special elements ## */
    // m2s_logo
    \M2S\SitePackage\Utility\TtContentOverridesUtility::addCustomPlugin(
        'Logo',
        'm2s_logo',
        'EXT:core/Resources/Public/Icons/T3Icons/content/content-info.svg',
        '
			header,
			subheader,
	        header_link,
	        image
	    ',
        [
            'header' => [
                'label' => 'Title Text:',
            ],
            'subheader' => [
                'label' => 'Alt Text:',
            ],
            'header_link' => [
                'label' => 'Link:',
            ],
            'image' => [
                'label' => 'Image:',
                'config' => [
                    'maxitems' => 1,
                ],
            ],
        ]
    );

    // m2s_hero
    \M2S\SitePackage\Utility\TtContentOverridesUtility::addCustomPlugin(
        'Hero Overlay',
        'm2s_hero',
        'EXT:core/Resources/Public/Icons/T3Icons/content/content-menu-recently-updated.svg',
        '
			header,
	        rowDescription,
	        bodytext,
	        subheader,
	        header_link,
	    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.images,
	        image
	    ',
        [
            'header' => [
                'label' => 'Intro Text:',
            ],
            'rowDescription' => [
                'label' => 'Typed sentences: (one per Line)',
            ],
            'subheader' => [
                'label' => 'Link Text:',
            ],
            'bodytext' => [
                'config' => [
                    'enableRichtext' => 1,
                    'richtextConfiguration' => 'default',
                ],
            ],
        ]
    );

    // m2s_contact
    \M2S\SitePackage\Utility\TtContentOverridesUtility::addCustomPlugin(
        'Contact info',
        'm2s_contact',
        'EXT:core/Resources/Public/Icons/T3Icons/content/content-form.svg',
        '
	        header,
	        bodytext,
	        subheader,
	        header_link,
	    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
	        sectionIndex;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:sectionIndex_formlabel,
	    ',
        [
            'header' => [
                'label' => 'Denomination:',
            ],
            'bodytext' => [
                'label' => 'Address:',
            ],
            'subheader' => [
                'label' => 'Telephone: (with the separator "|" a secondary number may be added)',
            ],
            'header_link' => [
                'label' => 'Email:',
                'config' => [
                    'eval' => 'email',
                ],
            ],
        ]
    );

    /** ## Content elements ## */
    /** # Normal elements # */

    // add custom palettes for standard element
    $GLOBALS['TCA']['tt_content']['palettes'] = array_merge(
        $GLOBALS['TCA']['tt_content']['palettes'],
        [
            'm2s_headers' => [
                'showitem' => 'header,--linebreak--,subheader',
            ],
            'm2s_button' => [
                'showitem' => 'rowDescription,header_link',
            ],
            'm2s_decoration' => [
                'showitem' => 'frame_class,header_layout',
            ],
            'm2s_gallerySettings' => [
                'showitem' => 'layout,imageborder,space_before_class,--linebreak--,imageorient,imagecols,--linebreak--,imageheight,image_zoom',
            ],
        ]
    );

    // m2s_textpic
    \M2S\SitePackage\Utility\TtContentOverridesUtility::addCustomPlugin(
        'Standardelement',
        'm2s_textpic',
        'EXT:core/Resources/Public/Icons/T3Icons/content/content-textpic.svg',
        '
			--palette--;;m2s_headers,
	        bodytext,
	        --palette--;Button;m2s_button,
	    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.images,
	        --palette--;Gallerie-Einstellungen;m2s_gallerySettings,
	        image,
	    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
	        header_position,
	        --palette--;;m2s_decoration,
	        sectionIndex;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:sectionIndex_formlabel
	    ',
        [
            'header_position' => [
                'label' => 'Layout',
                'config' => [
                    'items' => [
                        ['Normal', ''],
                        ['Stylized', 'stylized'],
                        ['Card (half width)', 'card'],
                        ['Light background', 'light'],
                    ],
                ],
            ],
            'header_layout' => [
                'label' => 'Divider:',
                'config' => [
                    'items' => [
                        ['None', 0],
                        ['above', 1],
                        ['below', 2],
                        ['above + below', 3],
                    ],
                ],
            ],
            'frame_class' => [
                'label' => 'Background:',
                'config' => [
                    'items' => [
                        ['None', 'default'],
                        ['Leaf', 'decorate'],
                    ],
                ],
            ],
            'bodytext' => [
                'config' => [
                    'enableRichtext' => 1,
                    'richtextConfiguration' => 'default',
                ],
            ],
            'rowDescription' => [
                'label' => 'Text:',
                'config' => [
                    'rows' => 1,
                ],
            ],
            'layout' => [
                'onChange' => 'reload',
                'config' => [
                    'items' => [
                        ['Standard (Slider)', 0],
                        ['Mosaic', 1],
                        ['Content-slider', 2],
                        ['Content-slider (full width)', 3],
                    ],
                ],
            ],
            'space_before_class' => [
                'displayCond' => 'FIELD:layout:>:1',
                'label' => 'Text alignment on large screens',
                'config' => [
                    'items' => [
                        ['alternating', ''],
                        ['left', 'left'],
                        ['right', 'right'],
                    ],
                ],
            ],
            'imageborder' => [
                'displayCond' => 'FIELD:layout:<:2',
                'label' => 'Use title/alt as caption:',
            ],
            'imagecols' => [
                'displayCond' => 'FIELD:layout:<:2',
            ],
            'imageheight' => [
                'displayCond' => 'FIELD:layout:<:2',
            ],
            'image_zoom' => [
                'displayCond' => 'FIELD:layout:<:2',
            ],
        ]
    );

    // m2s_citation
    \M2S\SitePackage\Utility\TtContentOverridesUtility::addCustomPlugin(
        'Quote',
        'm2s_citation',
        'EXT:core/Resources/Public/Icons/T3Icons/content/content-quote.svg',
        '
	        bodytext,
	        header;Author:,
	        header_link;Link:,
	    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
	        sectionIndex;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:sectionIndex_formlabel,
	    '
    );

    /** # Plugins #
     *
     * Consider additional configuration in EXT:m2s_site_package/Configuration/TSConfig/Page/Global.tsconfig
     */
    // m2s_poi_list
    \M2S\SitePackage\Utility\TtContentOverridesUtility::addCustomFlexFormPlugin(
        'Point of interest list',
        'm2s_poi_list',
        'EXT:poi_map/Resources/Public/Icons/Types/Default.svg',
        'FILE:EXT:poi_map/Configuration/FlexForms/PoiMapPlaces.xml',
        '
		--div--;Gallery settings:,
	        layout,
	        space_before_class,
	    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
	        sectionIndex;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:sectionIndex_formlabel,
	    ',
        [
            'layout' => [
                'config' => [
                    'items' => [
                        ['Content-slider', 0],
                        ['Content-slider (full width)', 1],
                    ],
                ],
            ],
            'space_before_class' => [
                'label' => 'Text alignment on large screens',
                'config' => [
                    'items' => [
                        ['alternating', ''],
                        ['left', 'left'],
                        ['right', 'right'],
                    ],
                ],
            ],
        ]
    );

    // m2s_poi_map
    \M2S\SitePackage\Utility\TtContentOverridesUtility::addCustomFlexFormPlugin(
        'Point of interest map',
        'm2s_poi_map',
        'EXT:poi_map/Resources/Public/Icons/Types/Default.svg',
        'FILE:EXT:poi_map/Configuration/FlexForms/PoiMapPlaces.xml',
        '
	    --div--;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:tabs.appearance,
	        sectionIndex;LLL:EXT:frontend/Resources/Private/Language/locallang_ttc.xlf:sectionIndex_formlabel,
	    '
    );

    // m2s_list
    /* @TODO: add plugin for blog list */
})();
