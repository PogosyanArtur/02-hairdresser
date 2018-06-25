;
(function () {
  let slick = $('.Portfolio__slides').slick({
    slidesToShow: 3,
    infinite: true,
    arrows: true,
    // autoplay: true,
    prevArrow:$('.Portfolio__arrowPrev'),
    nextArrow:$('.Portfolio__arrowNext'),
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1
        }
      }
    ]
  });
  $(`[data-portfolio-filter="all"]`).addClass('Portfolio__filter_active');
  $('[data-portfolio-filter]').on('click', function (e) {
    let item = $(e.target).parents( ".Portfolio__filter").data('portfolio-filter')
    if(item===undefined){
      item = $(e.target).data('portfolio-filter')
    }else{
      item
    }    
    if (item === 'all') {
      $(`[data-portfolio-filter]`).removeClass('Portfolio__filter_active');
      $(`[data-portfolio-filter="${item}"]`).addClass('Portfolio__filter_active');
      $('.Portfolio__slides').slick('slickUnfilter');
    } else {
      $(`[data-portfolio-filter]`).removeClass('Portfolio__filter_active');
      $('.Portfolio__slides').slick('slickUnfilter');
      $(`[data-portfolio-filter="${item}"]`).addClass('Portfolio__filter_active');
     let filterItem = $('.Portfolio__slides').slick('slickFilter', '.' + item);
     filterItem.find('.Portfolio__item').addClass('animated zoomIn')     
    }
  });

})()
