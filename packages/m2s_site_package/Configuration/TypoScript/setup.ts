### Global configuration
<INCLUDE_TYPOSCRIPT: source="FILE:EXT:m2s_site_package/Configuration/TypoScript/Config/Globals.t3s">
# Helpers
<INCLUDE_TYPOSCRIPT: source="FILE:EXT:m2s_site_package/Configuration/TypoScript/Config/Helpers.t3s">
# get parseFunc from fluid styled content
<INCLUDE_TYPOSCRIPT: source="FILE:EXT:fluid_styled_content/Configuration/TypoScript/Helper/ParseFunc.txt">

### Custom render definitions
<INCLUDE_TYPOSCRIPT: source="DIR:EXT:m2s_site_package/Configuration/TypoScript/Config/RenderDefinitions/" extensions="t3s">

### Page config
page = PAGE
# setup
<INCLUDE_TYPOSCRIPT: source="FILE:EXT:m2s_site_package/Configuration/TypoScript/Config/Page/Setup.t3s">
# metadata
<INCLUDE_TYPOSCRIPT: source="FILE:EXT:m2s_site_package/Configuration/TypoScript/Config/Page/Metadata.t3s">
# assets
<INCLUDE_TYPOSCRIPT: source="FILE:EXT:m2s_site_package/Configuration/TypoScript/Config/Page/Assets.t3s">

### Page customization
page {
    10 = FLUIDTEMPLATE
    10 {
        templateName.cObject = CASE
        templateName.cObject {
            key {
                data = levelfield:-2,backend_layout_next_level,slide
                override.field = backend_layout
            }

            default = TEXT
            default.value = Default
        }

        templateRootPaths {
            0 = EXT:m2s_site_package/Resources/Private/Templates/Page
        }
        partialRootPaths {
            0 = EXT:m2s_site_package/Resources/Private/Partials/
        }
        layoutRootPaths {
            0 = EXT:m2s_site_package/Resources/Private/Layouts/Page
        }

        settings {
            gtm_id = {$themes.m2s_site_package.gtm_id}
        }

        variables {
            cookie_modal = COA
            cookie_modal {
                wrap = <div id="cookie-modal" style="opacity: 0; -moz-opacity: 0;">|</div>

                10 = COA
                10 {
                    wrap = <p>|</p>

                    10 = TEXT
                    10 {
                        # @TODO: export into locllang_ts.xml
                        value = {$themes.m2s_site_package.cookie_consent_de}
                        lang.it = {$themes.m2s_site_package.cookie_consent_it}
                        lang.en = {$themes.m2s_site_package.cookie_consent_en}
                    }

                    15 = TEXT
                    15.char = 10

                    # @TODO: export into locallang_ts.xml
                    20 = TEXT
                    20 {
                        value = Further information
                        lang.it = Ulteriori informazioni
                        lang.de = Weitere Informationen

                        typolink {
                            parameter = {$themes.m2s_site_package.privacy_uid}

                            title = Privacy
                        }
                    }
                }

                30 = COA
                30 {
                    wrap = <div class="button-group">|</div>

                    10 = TEXT
                    10 {
                        wrap = <button class="button" data-value="deny">|</button>

                        # @TODO: export into locllang_ts.xml
                        value = Deny consent
                        lang.it = Negare consenso
                        lang.de = Zustimmung verweigern
                    }

                    20 = TEXT
                    20 {
                        wrap = <button class="highlight button" data-value="allow">|</button>

                        value = Okay!
                    }
                }
            }
        }
    }
}

### Render definitions for page sections (Template variables)
<INCLUDE_TYPOSCRIPT: source="DIR:EXT:m2s_site_package/Configuration/TypoScript/Config/Page/Sections/" extensions="t3s">

# cs_seo configuration
pageCsSeoSitemap.config.tx_realurl_enable = 1
