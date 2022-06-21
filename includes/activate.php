<?php 

function r_activate_plugin(){
    if ( version_compare( get_bloginfo( 'version' ), '5.0', '<'  ) ) {
        wp_die( __('You must update Wordpress to use this plugin', 'recipe') );
    }

    global $wpdb;
    
    $charset_collate = $wpdb->get_charset_collate();

    $sql     =   
    "CREATE TABLE " . $wpdb->prefix . "recipe_ratings (
        ID bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT,
        recipe_id bigint(20) UNSIGNED NOT NULL,
        rating float(3,2) UNSIGNED NOT NULL,
        user_ip varchar(50) NOT NULL,
        PRIMARY KEY  (ID)
    ) ENGINE=InnoDB " . $charset_collate . ";";

    require_once( ABSPATH . "/wp-admin/includes/upgrade.php" );
    dbDelta( $sql );
    
}