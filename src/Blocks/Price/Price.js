let priceFilterButtons = $('.Price__filter .btn_line');
let priceSections = $('.Price__section');
let priceSubItems= $('.Price__subItems');
priceFilterButtons.eq(0).addClass('btn_line_active');
$('.Price__filter').on('click',(e)=>{
    e.preventDefault()
    let filter = $(e.target);
    let section = $(e.target).parent().data('price-filter');
    priceFilterButtons.removeClass('btn_line_active');
    filter.addClass('btn_line_active');
    priceSections.fadeOut();
    $('[data-price-section="'+section+'"]').fadeIn('slow')
})

