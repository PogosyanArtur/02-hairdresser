'use strict';

$(document).ready(function () {
  $(".owl-carousel").owlCarousel({
    items: 1,
    nav: true,
    loop: true,
    dots: false,
    autoplay: true,
    animateIn: 'slideInRight',
    animateOut: 'slideOutRight',
    // smartSpeed: 5000,
    autoplayHoverPause: true,
    slideTransition: '',
    onChanged: function onChanged(e) {
      var pos = $('.Banner').css("background-position-x");
      pos = Number.parseInt(pos);
      $('.Banner').css("background-position-x", pos + 500 + "px");
    }
  });
});
;(function () {

  var navSubBtnIconDown = $('.Nav__subBtnIconDown');
  var navSubBtnIconUp = $('.Nav__subBtnIconUp');
  var navSubContent = $(".Nav__subContent");
  var navMenu = $('.Nav__menu');

  var navMenuDisplayState = function navMenuDisplayState() {
    if ($(window).outerWidth() >= 992) {
      navMenu.css("display", '');
    } else {
      navMenu.css("display", "none");
    }
  };
  var navSlideUp = function navSlideUp() {
    navSubContent.slideUp("slow");
    navSubBtnIconUp.addClass('Nav__subBtnIcon_active');
    navSubBtnIconDown.removeClass('Nav__subBtnIcon_active');
  };
  var navSlideDown = function navSlideDown() {
    navSubContent.slideDown("slow");
    navSubBtnIconUp.removeClass('Nav__subBtnIcon_active');
    navSubBtnIconDown.addClass('Nav__subBtnIcon_active');
  };
  var navInit = function navInit() {
    navMenuDisplayState();
    navSubBtnIconUp.addClass('Nav__subBtnIcon_active');
  };
  $(window).resize(function () {
    navMenuDisplayState();
  });
  $(window).scroll(function () {
    if ($(window).scrollTop() > 40) {
      $('.Nav').addClass('Nav_sticky');
    } else {
      $('.Nav').removeClass('Nav_sticky');
    }
  });

  $(".Nav__sub").on("click", function (e) {
    var t = e.target;
    var target = $(t);
    var navSubContent = target.parents(".Nav__sub").children('.Nav__subContent');
    if (navSubContent.is(':hidden')) {
      navSlideDown();
    } else {
      navSlideUp();
    }
  });
  $('.Nav__btn').on('click', function () {
    $(navMenu).slideToggle('slow');
  });
  $(document).mouseup(function (e) {
    if (!navSubContent.is(e.target) && navSubContent.has(e.target).length === 0) {
      navSlideUp();
    }
  });
  navInit();
})();
;
(function () {
  var slick = $('.Portfolio__slides').slick({
    slidesToShow: 3,
    infinite: true,
    arrows: true,
    // autoplay: true,
    prevArrow: $('.Portfolio__arrowPrev'),
    nextArrow: $('.Portfolio__arrowNext'),
    responsive: [{
      breakpoint: 992,
      settings: {
        slidesToShow: 2
      }
    }, {
      breakpoint: 768,
      settings: {
        slidesToShow: 1
      }
    }]
  });
  $('[data-portfolio-filter="all"]').addClass('Portfolio__filter_active');
  $('[data-portfolio-filter]').on('click', function (e) {
    var item = $(e.target).parents(".Portfolio__filter").data('portfolio-filter');
    if (item === undefined) {
      item = $(e.target).data('portfolio-filter');
    } else {
      item;
    }
    if (item === 'all') {
      $('[data-portfolio-filter]').removeClass('Portfolio__filter_active');
      $('[data-portfolio-filter="' + item + '"]').addClass('Portfolio__filter_active');
      $('.Portfolio__slides').slick('slickUnfilter');
    } else {
      $('[data-portfolio-filter]').removeClass('Portfolio__filter_active');
      $('.Portfolio__slides').slick('slickUnfilter');
      $('[data-portfolio-filter="' + item + '"]').addClass('Portfolio__filter_active');
      var filterItem = $('.Portfolio__slides').slick('slickFilter', '.' + item);
      filterItem.find('.Portfolio__item').addClass('animated zoomIn');
    }
  });
})();

var $grid = $('.grid').isotope({
  // options...
  itemSelector: '.grid-item',
  layoutMode: 'fitRows'
});
$grid.isotope({ filter: '.space' });
var priceFilterButtons = $('.Price__filter .btn_line');
var priceSections = $('.Price__section');
var priceSubItems = $('.Price__subItems');
priceFilterButtons.eq(0).addClass('btn_line_active');
$('.Price__filter').on('click', function (e) {
  e.preventDefault();
  var filter = $(e.target);
  var section = $(e.target).parent().data('price-filter');
  priceFilterButtons.removeClass('btn_line_active');
  filter.addClass('btn_line_active');
  priceSections.fadeOut();
  $('[data-price-section="' + section + '"]').fadeIn('slow');
});
(function () {
  $('.TopLine__arrow_top').click(function () {
    $('.TopLine__box').slideDown('slow');
    $(".TopLine__arrow_top").hide('slow');
  });
  $('.TopLine__arrow_bottom').click(function () {
    $('.TopLine__box').slideUp('slow');
    $(".TopLine__arrow_top").show('slow');
  });
  $(window).on('resize', function () {
    if ($(window).outerWidth() > 992) {
      $(".TopLine__box").css('display', 'block');
    } else {
      $(".TopLine__box").css('display', 'none');
    }
  });
})();