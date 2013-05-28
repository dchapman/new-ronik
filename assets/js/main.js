$(document).ready(function(){

    // QueryLoader 2 init
    $("body").queryLoader2().fadeIn(200);

    $("#site-nav a").on("click", function() {
        $(this).addClass("selected");
    });

    // Cache the Window object
	$window = $(window);

	// Cache the Y offset and the speed of each sprite
	$('[data-type]').each(function() {
		$(this).data('offsetY', parseInt($(this).attr('data-offsetY')));
		$(this).data('speed', $(this).attr('data-speed'));
	});

	// For each element that has a data-type attribute
	$('section[data-type="background"], header[data-type="background"]').each(function(){

		// Store some variables based on where we are
		var $this = $(this),
			offsetCoords = $this.offset(),
			topOffset = offsetCoords.top;

		// When the window is scrolled...
	    $(window).scroll(function() {

            var scrollTop = $window.scrollTop();

			// If this section is in view
			if ( (scrollTop + $window.height()) > (topOffset) &&
				 ( (topOffset + $this.height()) > scrollTop ) ) {

                // Scroll the background at var speed
				var yPos = -(scrollTop / $this.data('speed'));

				// If this element has a Y offset then add it on
				if ($this.data('offsetY')) {
					yPos += $this.data('offsetY');
				}

				// Put together our final background position
				var coords = '0 '+ yPos + 'px';

				// Move the background
				$this.css({ backgroundPosition: coords });

				// Check for sprites in this section
				$('[data-type="sprite"]', $this).each(function() {

					// Cache the sprite
					var $sprite = $(this);

                    // Determine new position
                    var yPos = -($window.scrollTop() / $sprite.data('speed'));
                    var coord = (yPos + $sprite.data('offsetY')) + 'px';

                    $sprite.css({ top: coord });
				}); // sprites

                // Check for fades in this section
                $('[data-type="fade"]', $this).each(function() {
                    var $fader = $(this);

                    var fadeLength = $fader.attr("data-fadeLength");
                    $fader.css('opacity', 1-(scrollTop/fadeLength));
                });


				// Check for videos in this section
				$('[data-type="video"]', $this).each(function() {

					// Cache the video
					var $video = $(this);
                    
                    // Determine new position
					var yPos = -($window.scrollTop() / $video.data('speed'));
					var coords = (yPos + $video.data('offsetY')) + 'px';

					$video.css({ top: coords });

				}); // video

			}; // in view

		}); // window scroll

	});	// each data-type

}); // document ready