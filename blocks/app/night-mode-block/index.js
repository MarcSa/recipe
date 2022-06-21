import classnames from 'classnames';
import block_icons from '../icons/index';
import btn_icon from './icon';
import './editor.scss';

const { registerBlockType }                         =   wp.blocks;
const { __ }                                        =   wp.i18n;
const { BlockControls,
        InspectorControls }                         =   wp.blockEditor;
const { ToolbarGroup, ToolbarButton, Tooltip, 
        PanelBody, PanelRow, 
        FormToggle }                                =   wp.components;

registerBlockType( 'marcvirtual/night-mode', {
    title:                              __( 'Night Mode', 'recipe' ),
    description:                        __( 'Content with night mode.', 'recipe'),
    category:                           'common',
    icon:                               block_icons.night,
    attributes: {
        night_mode: {
            type:                       'boolean',
            default:                    false
        }
    },
    edit: ( props ) => {

        const toggle_night_mode = () => {
            props.setAttributes({ night_mode: !props.attributes.night_mode });
        }

        return [
            <InspectorControls>
                <PanelBody title={ __( 'Night mode.', 'recipe') }>
                    <PanelRow>
                        <label htmlFor="marcvirtual-recipe-night-mode-toggle">
                            { __( 'Night mode.', 'recipe') }
                        </label>
                        <FormToggle id='marcvirtual-recipe-night-mode-toggle' 
                                    checked={ props.attributes.night_mode }
                                    onChange={ toggle_night_mode }
                        />
                    </PanelRow>
                </PanelBody>
            </InspectorControls>,
            <div className={ props.className }>
                <BlockControls>
                    <ToolbarGroup>
                        <Tooltip text={ __( 'Night mode', 'recipe') }>
                            <ToolbarButton
                                className={ classnames(
                                    'components-icon-button',
                                    'components-toolbar__control',
                                    { 'is-active': props.attributes.night_mode }
                                )}
                                onClick={ toggle_night_mode }
                            >
                                { btn_icon }
                            </ToolbarButton>
                        </Tooltip>
                    </ToolbarGroup>
                </BlockControls>
                <div className={ classnames(
                    'content-example',
                    { 'night': props.attributes.night_mode }
                )}>
                    This is an example of a block with night mode.
                </div>
            </div>
        ];
    },
    save: ( props ) => {
        return (
            <div>
                <div className={ classnames(
                    'content-example',
                    { 'night': props.attributes.night_mode }
                )}>
                    This is an example of a block with night mode.
                </div>
            </div>
        )
    },

});
