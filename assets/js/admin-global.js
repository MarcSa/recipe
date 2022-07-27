(function($){
    $(document).on( "click", "#r-recipe-pending-notice .notice-dismiss",  function(e){
        e.preventDefault();

        $.post( recipe_obj.ajax_url, {
            action:         'r_dismiss_pending_recipe_notice'
        });
    });
})(jQuery);