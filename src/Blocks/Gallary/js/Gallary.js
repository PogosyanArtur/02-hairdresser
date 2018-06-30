var $grid = $('.Gallary__items').isotope({
  // options...
  itemSelector: '.Gallary__item',
  layoutMode: 'fitRows',
  percentPosition: true,
  masonry: {
    columnWidth: '.Gallary__item',
    fitWidth: true
  },
  horiz: {
    verticalAlignment: 1,
  }
});
$('.Gallary__filters').on('click', (e) => {
  let gallaryFilter = $(e.target).data('gallary-filter');
  let gallaryFilterToJqClassName = "." + gallaryFilter
  $grid.isotope({
    filter: gallaryFilterToJqClassName
  })
})

