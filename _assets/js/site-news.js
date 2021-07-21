$(document).on("pagebeforeshow", function() {

  try { 
    /* Hide news list items on page show. */
    var newslibtn = $.mobile.activePage.find(".newslibtn");

    if (newslibtn != null) {
      $(newslibtn).siblings().slice(6).hide(); 
      $(newslibtn).find("a").text("Older News");
      $(newslibtn).find("span").toggleClass("ui-icon-plus", true);
      $(newslibtn).find("span").toggleClass("ui-icon-minus", false);
    }

    /* Configure sponsor ticker tape */
    var logobar = $.mobile.activePage.find(".logobar");

    if (logobar != null) {
      init_sps();
      resize();
    }
    
  } catch (err) {
    // alert (err);
  }
  
});

/* Show/hide list items on newslibtn click. */

function showall(divname) {
    var newslibtn = $.mobile.activePage.find(".newslibtn");
    
    if (newslibtn != null) {
      $(newslibtn).find("span").toggleClass("ui-icon-plus ui-icon-minus");
 
      if ($(newslibtn).find("span").hasClass('ui-icon-minus')) {
        $(newslibtn).siblings().show();
        $(newslibtn).find("a").text("Hide Older News");
      } else {
        $(newslibtn).siblings().slice(6).hide();
        $(newslibtn).find("a").text("Older News");
      }
    }
}

