<?php

function r_admin_menu(){
    add_menu_page( 'recipe_options', 'Recipe Options', 'edit_theme_options', 'r_plugin_opts', 'r_plugin_opts_page' );
}