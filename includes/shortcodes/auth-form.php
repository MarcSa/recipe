<?php

function r_recipe_auth_form_shortcode(){

    if ( is_user_logged_in() ){
        return '';
    }
    $auth_form_tpl_res         =   wp_remote_get( 
        plugins_url( 'includes/shortcodes/auth-form-template.php', RECIPE_PLUGIN_URL )  
    );
    $formHTML       =   wp_remote_retrieve_body($auth_form_tpl_res);

    $formHTML       =   str_replace( 
        'NONCE_FIELD_PH',
        wp_nonce_field( 'recipe_auth', '_wpnonce', true, false ),
        $formHTML
    );

    $formHTML       =   str_replace( 
        'SHOW_REG_FORM',
        ( !get_option( 'users_can_register' )  ? 'style="display:none;"' : ' ' ),
        $formHTML
    );


    return $formHTML;
}
