<?php

function r_rate_recipe(){
    global $wpdb;

    $output                 =   [ 'status' => 1 ];
    $recipe_option          =   get_option( 'r_opts' );

    if( !is_user_logged_in() && $recipe_option['rating_login_required'] == 1 ){
        wp_send_json( $output );
    }

    $post_ID                =   abs( $_POST['rid'] );
    $rating                 =   round( $_POST['rating'], 1 );
    $user_IP                =   $_SERVER['REMOTE_ADDR'];

    $rating_count           =   $wpdb->get_var($wpdb->prepare(
        "SELECT COUNT(*) FROM  " . $wpdb->prefix . "recipe_ratings 
        WHERE recipe_id=%d AND user_ip=%s",
        $post->ID, $user_IP
    ));

    if( $rating_count > 0 ){
        wp_send_json( $output );
    }

    // Insert rating into a database
    $wpdb->insert(
        $wpdb->prefix . 'recipe_ratings',
        [
            'recipe_id'     =>  $post_ID,
            'rating'        =>  $rating,
            'user_ip'       =>  $user_IP
        ],
        [ '%d', '%f', '%s' ]
    );

    // Update Recipe Metadata
    $recipe_data            =   get_post_meta( $post_ID, 'recipe_data', true );
    $recipe_data['rating_count']++;
    $recipe_data['rating']  =   round($wpdb->get_var( $wpdb->prepare(
        "SELECT AVG(`rating`) FROM `" . $wpdb->prefix . "recipe_ratings`
        WHERE recipe_id=%d", $post_ID 
    )), 1);
    
    update_post_meta( $post_ID, 'recipe_data', $recipe_data );

    do_action( 'recipe_rated', [
        'post_id'           =>  $post_ID,
        'rating'            =>  $rating,
        'user_ip'           =>  $user_IP
    ] );

    $output['status']       =   2;
    wp_send_json( $output );
}