/**
 * Created by Rodrigo on 4/9/16.
 */

$(document).ready(function(){
  $(".main-container").css("height",window.innerHeight);
  $(".home-container").css("height",window.innerHeight - 52);
  $("#canvas-container").css("height",window.innerHeight);

  // Returns true if the specified element has been scrolled into the viewport.
  function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
  }

// Check if it's time to start the animation.
  function checkAnimation() {
    var $elem = $('#bar-chart-title-axis');

    // If the animation has already been started
    if ($('#bar-chart').hasClass('start')) return;

    if (isElementInViewport($elem)) {
      // Start the animation
      $('#bar-chart').addClass('start');
    }
  }

// Capture scroll events
  $(window).scroll(function(){
    checkAnimation();
  });

});
