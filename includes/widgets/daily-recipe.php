<?php

class R_Daily_Recipe_Widget extends WP_Widget {

	/**
	 * Sets up the widgets name etc
	 */
	public function __construct() {
		$widget_ops             =   array( 
			'classname'         =>  'recipe-display',
			'description'       =>  'Displays a random recipe each day',
		);
		parent::__construct( 'r_daily_recipe_widget', 'Recipe of the day', $widget_ops );
	}

	/**
	 * Outputs the options form on admin
	 *
	 * @param array $instance The widget options
	 */
	public function form( $instance ) {
		// outputs the options form on admin
        $default                =   ['title' => esc_html__( 'Recipe of the day.', 'recipe' )];
        $instance               =   wp_parse_args( (array) $instance, $default );

        ?>

        <p>
		    <label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"><?php esc_attr_e( 'Title:', 'recipe' ); ?></label> 
		    <input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>" name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>" type="text" value="<?php echo esc_attr( $instance['title'] ); ?>">
		</p>
        <?php 
	}

	/**
	 * Processing widget options on save
	 *
	 * @param array $new_instance The new options
	 * @param array $old_instance The previous options
	 *
	 * @return array
	 */
	public function update( $new_instance, $old_instance ) {
		// processes widget options to be saved
        $instance               =   [];
        $instance['title']      =   sanitize_text_field( $new_instance['title'] );
        return $instance;
	}

	/**
	 * Outputs the content of the widget
	 *
	 * @param array $args
	 * @param array $instance
	 */
	public function widget( $args, $instance ) {
		// outputs the content of the widget
        extract( $args );
		extract( $instance );

		$title					=	apply_filters( 'widget_title', $title );

		echo $before_widget;
		echo $before_title . $title . $after_title;
		
		$recipe_id				=	get_transient( 'r_daily_recipe' );

		if ( !$recipe_id ){
			$recipe_id			=	r_get_random_recipe();
			set_transient(
				'r_daily_recipe', 
				r_get_random_recipe(), 
				DAY_IN_SECONDS 
			);
		}

		?>

		<div class="portfolio-image">
			<a href="<?php echo get_permalink( $recipe_id ) ?>">
				<?php echo get_the_post_thumbnail( $recipe_id, 'thumbnail' ); ?>
			</a>
		</div>
		<div class="portfolio-desc center nobottompadding">
			<h3>
				<a href="<?php echo get_permalink( $recipe_id ) ?>">
					<?php echo get_the_title( $recipe_id ) ?>
				</a>
			</h3>
		</div>

		<?php 

		echo $after_widget;

	}
}