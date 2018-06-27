var $grid = $('.grid').isotope({
    // options...
    itemSelector: '.grid-item',
    layoutMode: 'fitRows'
  });
$grid.isotope({ filter: '.space' })