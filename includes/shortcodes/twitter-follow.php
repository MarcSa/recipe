<?php

function r_twitter_follow_shortcode( $atts, $content = null ){
    $atts           =   shortcode_atts([
        'handle'   =>  'marc_santa'
    ], $atts);

    return '<a href="https://twitter.com/' . $atts['handle'] . '" 
                class="button button-rounded button-aqua">
                <i class="icon-twitter"></i> ' . do_shortcode($content) . '
            </a>';
}
