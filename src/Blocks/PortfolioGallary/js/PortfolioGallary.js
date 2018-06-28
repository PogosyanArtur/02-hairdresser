var $grid = $('.PortfolioGallary__items').isotope({
    // options...
    itemSelector: '.PortfolioGallary__item',
    layoutMode: 'fitRows',
    percentPosition: true,
    masonry: {
      columnWidth: '.PortfolioGallary__item',
      fitWidth: true
    },
    horiz: {
      verticalAlignment: 1,
    }
  });
$('.PortfolioGallary__filters').on('click',(e)=>{
  let portfoliofilter =$(e.target).data('portfoliofilter');
  let portfoliofilterConvertToJqClass = "."+portfoliofilter
  console.log(portfoliofilter);
  
  $grid.isotope({ filter: portfoliofilterConvertToJqClass })

})
