// Inside recipe-block folder

import block_icons from '../icons/index'
import './editor.scss'

const { registerBlockType }             =   wp.blocks;
const { __ }                            =   wp.i18n;
const { InspectorControls, 
        BlockControls,
        AlignmentToolbar,
        BlockAlignmentToolbar    
    }                                   =   wp.blockEditor;
const { PanelBody, PanelRow, 
        TextControl, SelectControl  }   =   wp.components;




registerBlockType( 'marcvirtual/recipe', {
    title:                                  __( 'Recipe', 'recipe' ),
    description:                            __( 
        'Provides a short summary of a recipe.', 
        'recipe' 
    ),
    // common, formatting, layouts, widget, embed 
    category:                               'common',
    icon:                                   block_icons.dish,
    keywords:   [
        __( 'Food', 'recipe' ), 
        __( 'Ingredients', 'recipe' ), 
        __( 'Meal Type', 'recipe' )
    ],
    suports:    {
        html:                               false

    },
    attributes: {
        ingredients: {
            type:                   'string',
            source:                 'text',
            selector:               '.ingredients-ph'
        },
        cooking_time: {
            type:                   'string',
            source:                 'text',
            selector:               '.cooking-time-ph'

        },
        utensils: {
            type:                   'string',
            source:                 'text',
            selector:               '.utensils-ph'

        },
        cooking_experience: {
            type:                   'string',
            source:                 'text',
            default:                'Beginner',
            selector:               '.cooking-experience-ph'

        },
        meal_type: {
            type:                   'string',
            source:                 'text',
            default:                'Breakfast',
            selector:               '.meal-type-ph'

        },
        text_alignment: {
            type:                   'string',

        },
        block_alignment: {
            type:                   'string',
            default:                'wide'
        }

    },
    getEditWrapperProps: ({ block_alignment }) => {
        if( 'left' === block_alignment || 'right' === block_alignment || 'full' === block_alignment ){
            return { 'data-align': block_alignment}
        }
    },
    edit:   ( props )  =>   {

        return [
            <InspectorControls>
                <PanelBody title={ __( 'Basics', 'recipe' ) }>
                    <PanelRow>
                        <p>{ __( 'Config the content of your block here', 'recipe') }</p>
                    </PanelRow>
                    <TextControl 
                        label={ __( 'Ingredients', 'recipe' ) }
                        help={ __( 'Ex: tomatoes, lettuce, olive oil, etc.', 'recipe' ) }
                        value={ props.attributes.ingredients }
                        onChange={ ( new_val ) => {
                            props.setAttributes( { ingredients: new_val } )
                        }
                    }
                    />
                    <TextControl 
                        label={ __( 'Cooking Time', 'recipe' ) }
                        help={ __( 'How long wil this take to cook?', 'recipe' ) }
                        value={ props.attributes.cooking_time }
                        onChange={ ( new_val ) => {
                            props.setAttributes( { cooking_time: new_val } )
                        } }
                    />
                    <TextControl 
                        label={ __( 'Utensils', 'recipe' ) }
                        help={ __( 'Ex: spoon, knife, pots, pans, etc.', 'recipe' ) }
                        value={ props.attributes.utensils }
                        onChange={ ( new_val ) => {
                            props.setAttributes( { utensils: new_val } )
                        } }
                    />
                    <SelectControl
                        label={ __('Cooking Experience', 'recipe') }
                        help={ __('How skilled should the reader be?', 'recipe') }
                        value={ props.attributes.cooking_experience }
                        options={[
                            { 
                                value:  'Beginner',
                                label:  'Beginner'
                            },
                            { 
                                value:  'Intermediate',
                                label:  'Intermediate'
                            },
                            { 
                                value:  'Expert',
                                label:  'Expert'
                            }
                        ]}
                        onChange={ ( new_val ) => {
                            props.setAttributes( { cooking_experience: new_val } )
                        } }
                    />
                    <SelectControl
                        label={ __('Meal Type', 'recipe') }
                        help={ __('When is this best eaten?', 'recipe') }
                        value={ props.attributes.meal_type }
                        options={[
                            { 
                                value:  'Breakfast',
                                label:  'Breakfast'
                            },
                            { 
                                value:  'Lunch',
                                label:  'Lunch'
                            },
                            { 
                                value:  'Dinner',
                                label:  'Dinner'
                            }
                        ]}
                        onChange={ ( new_val ) => {
                            props.setAttributes( { meal_type: new_val } )
                        } }
                    />
                </PanelBody>
            </InspectorControls>,
            <div className={ props.className }>
                <BlockControls>
                    <BlockAlignmentToolbar 
                        value={ props.attributes.block_alignment }
                        onChange={ ( new_val ) => {
                            props.setAttributes( { block_alignment: new_val } )
                        } }    
                    />
                    <AlignmentToolbar
                        value={ props.attributes.text_alignment }
                        onChange={ ( new_val ) => {
                            props.setAttributes( { text_alignment: new_val } )
                        } }
                    />
                </BlockControls>
                <ul 
                    className="list-unstyled"
                    style={{ textAlign: props.attributes.text_alignment }}
                >
                    <li>
                        <strong>{ __('Ingredients', 'recipe') }: </strong> 
                        <span className="ingredients-ph">{ props.attributes.ingredients }</span>
                    </li>
                    <li>
                        <strong>{ __('Cooking Time', 'recipe') }: </strong> 
                        <span className="cooking-time-ph">{ props.attributes.cooking_time }</span>
                    </li>
                    <li>
                        <strong>{ __('Utensils', 'recipe') }: </strong> 
                        <span className="utensils-ph">{ props.attributes.utensils }</span>
                    </li>
                    <li>
                        <strong>{ __('Cooking Experience', 'recipe') }: </strong> 
                        <span className="cooking-experience-ph">{ props.attributes.cooking_experience }</span>
                    </li>
                    <li>
                        <strong>{ __('Meal Type', 'recipe') }: </strong> 
                        <span className="meal-type-ph">{ props.attributes.meal_type }</span>
                    </li>
                </ul>
            </div>
        ]
    },
    save:   ( props )  =>  {
    
        return (            
            <div className={ `align${props.attributes.block_alignment}` } >
                <ul 
                    className="list-unstyled"
                    style={{ textAlign: props.attributes.text_alignment }}
                >

                    <li>
                        <strong>{ __('Ingredients', 'recipe') }: </strong> 
                        <span className="ingredients-ph">{ props.attributes.ingredients }</span>
                    </li>
                    <li>
                        <strong>{ __('Cooking Time', 'recipe') }: </strong> 
                        <span className="cooking-time-ph">{ props.attributes.cooking_time }</span>
                    </li>
                    <li>
                        <strong>{ __('Utensils', 'recipe') }: </strong> 
                        <span className="utensils-ph">{ props.attributes.utensils }</span>
                    </li>
                    <li>
                        <strong>{ __('Cooking Experience', 'recipe') }: </strong> 
                        <span className="cooking-experience-ph">{ props.attributes.cooking_experience }</span>
                    </li>
                    <li>
                        <strong>{ __('Meal Type', 'recipe') }: </strong> 
                        <span className="meal-type-ph">{ props.attributes.meal_type }</span>
                    </li>
                </ul>
            </div>
        )

    }
} );