
$(document).on("pageshow", function() {

  try {
    /* Hack to prevent data-filter from reducing page size and making scrolling buggy. */
    var uicontainer = $.mobile.activePage.find(".ui-content");

    if (uicontainer != null) {
      $(uicontainer).css('min-height', $(uicontainer).height());
    }

    /* Reinitialize program table on return from another page */
    var program = $.mobile.activePage.find(".sigcomm-program");

    if (program != null) {
      $('input[data-type="search"]').val("");
      $('input[data-type="search"]').trigger("keyup");

      filter("all");
    }

  } catch (err) {
    // alert (err);
  }

});
