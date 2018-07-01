$.when($.ready).then(function () {
  var $grid = $('.Gallary__items').isotope({
    // options...
    itemSelector: '.Gallary__item',
    percentPosition: true,
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
});