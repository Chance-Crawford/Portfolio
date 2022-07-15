/* Description: Custom JS file */


(function($) {
    "use strict"; 
	
    /* Navbar Scripts */
    // jQuery to collapse the navbar on scroll
    $(window).on('scroll load', function() {
		if ($(".navbar").offset().top > 60) {
			$(".fixed-top").addClass("top-nav-collapse");
		} else {
			$(".fixed-top").removeClass("top-nav-collapse");
		}
    });
    
	// jQuery for page scrolling feature - requires jQuery Easing plugin
	$(function() {
		$(document).on('click', 'a.page-scroll', function(event) {
			var $anchor = $(this);
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top
			}, 600, 'easeInOutExpo');
			event.preventDefault();
		});
    });

    // offcanvas script from Bootstrap + added element to close menu on click in small viewport
    $('[data-toggle="offcanvas"], .navbar-nav li a:not(.dropdown-toggle').on('click', function () {
        $('.offcanvas-collapse').toggleClass('open')
    })

    // hover in desktop mode
    function toggleDropdown (e) {
        const _d = $(e.target).closest('.dropdown'),
            _m = $('.dropdown-menu', _d);
        setTimeout(function(){
            const shouldOpen = e.type !== 'click' && _d.is(':hover');
            _m.toggleClass('show', shouldOpen);
            _d.toggleClass('show', shouldOpen);
            $('[data-toggle="dropdown"]', _d).attr('aria-expanded', shouldOpen);
        }, e.type === 'mouseleave' ? 300 : 0);
    }
    $('body')
    .on('mouseenter mouseleave','.dropdown',toggleDropdown)
    .on('click', '.dropdown-menu a', toggleDropdown);


    /* Move Form Fields Label When User Types */
    // for input and textarea fields
    $("input, textarea").keyup(function(){
		if ($(this).val() != '') {
			$(this).addClass('notEmpty');
		} else {
			$(this).removeClass('notEmpty');
		}
	});
	

    /* Back To Top Button */
    // create the back to top button
    $('body').prepend('<a href="body" class="back-to-top page-scroll">Back to Top</a>');
    var amountScrolled = 700;
    $(window).scroll(function() {
        if ($(window).scrollTop() > amountScrolled) {
            $('a.back-to-top').fadeIn('500');
        } else {
            $('a.back-to-top').fadeOut('500');
        }
    });


	/* Removes Long Focus On Buttons */
	$(".button, a, button").mouseup(function() {
		$(this).blur();
	});

})(jQuery);


// Image carousel wheel

let imgHeight = document.querySelector('.slide-img').offsetHeight;
console.log(imgHeight);

let wheelArr = document.querySelectorAll('.wheel');

wheelArr.forEach((wheel)=>{
    wheel.style.height = `${imgHeight}px`;
});

// checks to see if height of container is equal to absolute position child
setInterval(()=>{
    // full height of image including the border
    let imgHeight = document.querySelector('.slide-img').offsetHeight;

    if(wheelArr[0].offsetHeight === imgHeight){
        return;
    }

    wheelArr.forEach((wheel)=>{
        wheel.style.height = `${imgHeight}px`;
    });

}, 1000)

// scroll through wheel
const wheelBtns = document.querySelectorAll("[data-wheel-button]");

wheelBtns.forEach((btn)=>{
    btn.addEventListener("click", () => {
        const wheelIndex = btn.dataset.wheelButton === "next" ? 1 : -1;
        const slides = btn.closest("[data-wheel]").querySelector("[data-slides]");

        const currSlide = slides.querySelector("[data-current]");
        let changeIndex = [...slides.children].indexOf(currSlide) + wheelIndex;

        // if the wheel index is at first slide and the "previous wheel button" is clicked 
        // again, loop.
        if(changeIndex < 0){
            changeIndex = slides.children.length - 1;
        }
        // if at last slide, loop to the starting slide
        if(changeIndex >= slides.children.length){
            changeIndex = 0;
        }

        slides.children[changeIndex].dataset.current = true;
        delete currSlide.dataset.current;
    })
})