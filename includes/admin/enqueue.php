<?php

function r_admin_enqueue(){
    wp_register_script(
        'r_admin_global',
        plugins_url('/assets/js/admin-global.js', RECIPE_PLUGIN_URL),
        ['jquery'],
        '1.0.0',
        true
    );

    wp_localize_script('r_admin_global', 'recipe_obj', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'home_url' => home_url('/'),
    ]);

    wp_enqueue_script('r_admin_global');

    if ( !isset($_GET['page']) || $_GET['page']!="r_plugin_opts" ) {
        return;
    }

    wp_register_style( 'r_bootstrap', plugins_url( '/assets/css/bootstrap.css', RECIPE_PLUGIN_URL ) );
    wp_enqueue_style( 'r_bootstrap' );

}


