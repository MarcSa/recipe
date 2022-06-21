import block_icons from '../icons/index';

const { registerBlockType }         =   wp.blocks;
const { RichText }                  =   wp.blockEditor;
const { __ }                        =   wp.i18n;

registerBlockType( 'marcvirtual/rich-text', {
    title:                              __( 'Rich Text Example', 'recipe' ),
    description:                        __( 'Rich text example', 'recipe' ),
    category:                           'common',
    icon:                               block_icons.richtext,
    attributes: {
        message: {
            type:                       'array',
            source:                     'children',
            selector:                   '.message-ctr'
        }
    },
    edit: ( props ) => {
        return (
            <div className={ props.className }>
                <RichText 
                    tagName=        "div"
                    multiline=      "p"
                    placeholder=    { __('Add your content here.', 'recipe') }
                    onChange=       {( new_val ) => {
                                        props.setAttributes({ message: new_val });
                                    }}
                    value=          { props.attributes.message }
                />
            </div>
        );
    },
    save: ( props ) => {
        return ( 
            <div>
                <div className=".message-ctr">
                    { props.attributes.message }
                </div>
            </div>);
    }
});