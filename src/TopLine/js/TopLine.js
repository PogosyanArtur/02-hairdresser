;
(function () {
    $('.TopLine__arrow_top').click(() => {
        $('.TopLine__box').slideDown('slow');
        $(".TopLine__arrow_top").hide('slow');
    });
    $('.TopLine__arrow_bottom').click(() => {
        $('.TopLine__box').slideUp('slow');
        $(".TopLine__arrow_top").show('slow');
    });
    $(window).on('resize', () => {
        if ($(window).outerWidth() > 992) {
            $(".TopLine__box").css('display', 'block');
        }else{
            $(".TopLine__box").css('display', 'none'); 
        }
    })

})()