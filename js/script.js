$(function () {
  // add lazy loading to images
  $("img").attr("loading", "lazy");

  // change the menu icon 
  const $toggler = $('.navbar-toggler');
  const $collapseEl = $('#navbarSupportedContent');
  const $menuIcon = $toggler.find('.menu-icon');
  const $closeIcon = $toggler.find('.close-icon');

  $collapseEl.on('show.bs.collapse', function () {
    $menuIcon.addClass('d-none');
    $closeIcon.removeClass('d-none');
  });

  $collapseEl.on('hide.bs.collapse', function () {
    $menuIcon.removeClass('d-none');
    $closeIcon.addClass('d-none');
  });


  // Scroll events: fixed navbar and scroll-to-top button
  const $navbar = $("#navbar");
  const $scrollBtn = $("#scrollToTopBtn");

  $(window).on("scroll", () => {
    const scrollTop = $(this).scrollTop();

    // Fixed navbar
    if (scrollTop > 250) {
      $navbar.addClass("scrolled");
    } else {
      $navbar.removeClass("scrolled");
    }

    // Scroll-to-top button visibility
    if (scrollTop > 300) {
      $scrollBtn.addClass('active');
    } else {
      $scrollBtn.removeClass('active');
    }
  });

  // click scroll top 
  $scrollBtn.click(function () {
    $("html, body").animate({ scrollTop: 0 });
    return false;
  })


  // Initialize Swiper sliders
  const initSwiper = () => {
    // home hero slider
    new Swiper(".mySwiperHomeHero", {
      effect: 'fade',
      navigation: {
        prevEl: ".mySwiperHomeHero .swiper-button-prev",
        nextEl: ".mySwiperHomeHero .swiper-button-next",
      },
      autoplay: { delay: 5000, disableOnInteraction: true },
    });

    // top location slider 
    new Swiper(".mySwiperTopLocation", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        prevEl: ".top_location_slider_arrows .swiper-button-prev",
        nextEl: ".top_location_slider_arrows .swiper-button-next",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        992: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
        1400: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
      },
    });

    // popular package 
    new Swiper(".mySwiperPopularPackage", {
      slidesPerView: 1,
      spaceBetween: 10,
      navigation: {
        prevEl: ".popularPackage_slider_arrow .swiper-button-prev",
        nextEl: ".popularPackage_slider_arrow .swiper-button-next",
      },
      breakpoints: {
        768: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });

    // cliet  review  
    new Swiper(".mySwiperClientReview", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    });


    // company logo  
    new Swiper(".mySwiperCompanyLogo", {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
      speed: 5000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
    });

    // insta slider   
    new Swiper(".mySwiperInstaSlider", {
      slidesPerView: 1,
      spaceBetween: 0,
      loop: true,
      speed: 5000,
      autoplay: {
        delay: 0,
        disableOnInteraction: false,
      },
      allowTouchMove: false,
      breakpoints: {
        768: {
          slidesPerView: 3,
        },
        992: {
          slidesPerView: 4,
        },
        1200: {
          slidesPerView: 5,
        },
        1400: {
          slidesPerView: 6,
        },

      },
    });

    // about client review slider 
    new Swiper(".mySwiperAboutClientReview", {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      breakpoints: {
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 24,
        },
      },
    });

    // activites Details slider 
    $('.activitesDetailsSlider').owlCarousel({
      center: true,
      items: 1,
      loop: true,
      autoplay: true,
      margin: 16,
      dots: false,
      nav: true, 
      navText: [
        '<i class="ri-arrow-left-s-line"></i>',
        '<i class="ri-arrow-right-s-line"></i>'
      ],
      responsive: {
        768: {
          items: 2,
        }
      }
    });


  };
  initSwiper();

  // video popup 
  if ($('.popup-youtube').length) {
    $('.popup-youtube').magnificPopup({
      type: 'iframe',
      mainClass: 'mfp-fade',
      preloader: true
    });
  }

  // Set current year dynamically
  $("#year").text(new Date().getFullYear());
  initCounterAnimation();

  // jquery date picker 
  if ((".datepicker").length > 0) {
    $(".datepicker").datepicker();
  }

  // pricing icnrease decrease slider 
  if ($("#slider-range").length) {
    $("#slider-range").slider({
      range: true,
      min: 0,
      max: 1000,
      step: 1,
      values: [0, 1000],
      slide: function (event, ui) {
        $("#minPrice").text(ui.values[0]);
        $("#maxPrice").text(ui.values[1]);
      }
    });
  }
});


// counter animation function 
function initCounterAnimation(selector = '.counter') {
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight);
  }

  function startCounter($el) {
    if ($el.hasClass('counted')) return;

    var target = parseInt($el.attr('data-target'));
    var duration = $el.data('duration') || 2000;
    var steps = 50;
    var increment = target / steps;
    var interval = duration / steps;
    var count = 0;
    var suffix = $el.data('suffix') || '';

    $el.addClass('counted');

    var counterInterval = setInterval(function () {
      count += increment;
      if (count >= target) {
        $el.text(target);
        $el.text(target + suffix);
        clearInterval(counterInterval);
      } else {
        $el.text(Math.ceil(count) + suffix);
      }
    }, interval);
  }

  function checkCounters() {
    $(selector).each(function () {
      if (isElementInViewport(this)) {
        startCounter($(this));
      }
    });
  }

  // Initial check
  checkCounters();

  // Attach scroll/resize events
  $(window).on('scroll resize', checkCounters);

  // incement and decrement input 
  $('#plus').click(function () {
    let input = $('#People');
    let currentVal = parseInt(input.val()) || 0;
    input.val(currentVal + 1);
  });

  $('#minus').click(function () {
    let input = $('#People');
    let currentVal = parseInt(input.val()) || 0;
    let min = parseInt(input.attr('min')) || 0;

    if (currentVal > min) {
      input.val(currentVal - 1);
    }
  });


  // click star review 
  $('.star_review_Add .ri-star-line').on('click', function () {
    $(this).toggleClass('ri-star-line ri-star-fill');
  });
}



