/* sponsors ticker tape, adapted from sigcomm 2012 code */

(function(a, b) {
    var c = function(a, c, b) {
        var f;
        return function() {
            var g = this,
            h = arguments;
            f ? clearTimeout(f) : b && a.apply(g, h);
            f = setTimeout(function() {
            b || a.apply(g, h);
            f = null
            }, c || 100)
        }
    };
    jQuery.fn[b] = function(a) {
        return a ? this.bind("resize", c(a)) : this.trigger(b)
    }
})(jQuery, "smartresize");

function resize() {
  try {
    var logobar = $.mobile.activePage.find(".logobar");
    
    scrh = $(window).height();
    scrw = $(window).width();
    logoh = scrh / 12 + 30;
    logow = Math.max(200, scrw / 6);
    lidx = gidx = 0;
    logos = 0.8;
    lcnt = parseInt(scrw / logow, 10);
    $(logobar).html("");
    ticker_tape();
  }
  catch (err) {
    // alert (err);
  }
}

$(window).smartresize(resize);

function shuffle(a) {
    for (var b, c, d = a.length; d; b = parseInt(Math.random() * d, 10), c = a[--d], a[d] = a[b], a[b] = c);
    return a;
}

function init_sps() { 
    shuffle(sps);
    for (var a = 1; a < sps.length; a++)
      sps[a][0] = sps[a - 1][0] + sps[a][0];
}

function choose_logo_idx() {
    var a = -1;
    if (gidx < sps.length) a = gidx;
    else {
        for (var b = sps[sps.length - 1][0] + 1, b = parseInt(Math.random() * b, 10), c = 0; c < sps.length; c++)
            if (b <= sps[c][0] && 0 === sps[c][4]) {
            a = c;
            break;
            }
        if (0 > a)
            for (b = 0; b < sps.length; b++)
            if (0 === sps[b][4]) {
                a = b;
                break;
            }
    }
    sps[a][4] = 1;
    gidx += 1;
    return a;
}

function onfinish() {
    if (!(lcnt >= sps.length)) {
        var a = lidx % lcnt;
        var mylogo_a = $.mobile.activePage.find("#mylogo" + a);
        var mylink_a = $.mobile.activePage.find("#mylink" + a);
        
        lidx += 1;
        var b = choose_logo_idx(),
            c = parseInt($(mylogo_a).attr("alt"), 10);
        
        $(mylogo_a).fadeOut(500, function() {
            sps[c][4] = 0;
            $(mylogo_a).attr("src", sps[b][1]);
            $(mylogo_a).attr("alt", b);
            $(mylink_a).attr("href", sps[b][2]);
            var d = logos * logoh,
            e = logos * logow;
            d / e < sps[b][5] / sps[b][6] ? ($(mylogo_a).attr("height", d + "px"), $(mylogo_a).removeAttr("width")) : ($(mylogo_a).removeAttr("height"), $(mylogo_a).attr("width", e + "px"));
            $(mylogo_a).fadeIn(500);
        })
    }
}

function get_logo(a) {
    var b = choose_logo_idx(),
        c = sps[b][1],
        d = logos * logoh,
        e = logos * logow,
        i = sps[b][5],
        f = sps[b][6],
        a = "<td width='" + parseInt(100 / lcnt, 10) + "%'><a id='mylink" + a + "' href='" + sps[b][2] + "'><img id='mylogo" + a + "' src='" + c + "' alt='" + b + "' style='display:block; margin:auto;' ";
    return a = (d / e < i / f ? a + " height='" + d + "px'>" : a + " width='" + (e - 10) + "px'>") + "</a></td>";
}

function ticker_tape() {
  try {
    var logobar = $.mobile.activePage.find(".logobar");
    var content = $.mobile.activePage.find(".leftnav");
    
    $(logobar).css("height", logoh + "px");
    $(content).css("padding-bottom", 1.25 * logoh + "px");
    $(logobar).append("<table width='100%' height='100%' cellspacing='0' cellpadding='0' border='0' valign='middle'><tr class='logobarrow'></tr></table>");

    var logobarrow = $.mobile.activePage.find(".logobarrow");
    for (var a = 0; a < lcnt; a++)
      nlogo = get_logo(a), $(logobarrow).append(nlogo);
  }
  catch (err) {
    // alert(err);
  }
}

setInterval(function() {
    onfinish()
}, 3E3);

/* conference program filtering (code from previous years does not seem to work with jquery-1.4.5) */

function filter(progitem) {
  try {

    // using show() and hide() methods does not work well with li rouding, so we need to 
    // manually handle them. first, we disable rouding for current first and last items
    $(".prog-item").toggleClass('listfirst listlast', false);

    // go after all .prog-item items according to the day of the week to be displayed
    // for some particular date, hide all then show only those items having its class
    if (progitem == "all") {
      $('.prog-item').show();
    } else {
      $('.prog-item').hide();
      $('.prog-' + progitem).show();
    }

    // the date header should always be visible, that's why we use a display: block
    // however, we want to hide it if we are not displaying that particular date
    var kids = $.mobile.activePage.find(".program").children('li');
    kids.each(function () {
      if ($(this).hasClass("prog-header")) {
        if (progitem == "all" || $(this).hasClass('prog-' + progitem)) {
          $(this).toggleClass( 'prog-no-filter', true);
        } else {
          $(this).toggleClass( 'prog-no-filter', false);
        }
      }
    });

    // finally, include rouding to first and last visible items only
    $(".prog-item").filter(":visible").first().toggleClass('listfirst', true);
    $(".prog-item").filter(":visible").last().toggleClass('listlast', true);

  } catch (err) {
    // alert( err);
  }
}

(function( $, undefined ) {
    //special click handling to make widget work remove after nav changes in 1.4
    var href,
	ele = "";
    $( document ).on( "click", "a", function( e ) {
	href = $( this ).attr( "href" );
	var hash = $.mobile.path.parseUrl( href );
	if( typeof href !== "undefined" && hash !== "" && href !== href.replace( hash,"" ) && hash.search( "/" ) !== -1 ){
	    //remove the hash from the link to allow normal loading of the page.
	    var newHref = href.replace( hash,"" );
	    $( this ).attr( "href", newHref );
	}
	ele = $( this );
    });
    $( document ).on( "pagebeforechange", function( e, f ){
	f.originalHref = href;
    });
    $( document ).on("pagebeforechange", function( e,f ){
	var hash = $.mobile.path.parseUrl(f.toPage).hash,
	    hashEl, hashElInPage;

	try {
	    hashEl = $( hash );
	} catch( e ) {
	    hashEl = $();
	}

	try {
	    hashElInPage = $( ".ui-page-active " + hash );
	} catch( e ) {
	    hashElInPage = $();
	}

	if( typeof hash !== "undefined" &&
	    hash.search( "/" ) === -1 &&
	    hash !== "" &&
	    hashEl.length > 0 &&
	    !hashEl.hasClass( "ui-page" ) &&
	    !hashEl.hasClass( "ui-popup" ) &&
	    hashEl.data('role') !== "page" &&
	    !hashElInPage.hasClass( "ui-panel" ) &&
	    !hashElInPage.hasClass( "ui-popup" ) ) {
	    //scroll to the id
	    var pos = hashEl.offset().top;
	    $.mobile.silentScroll( pos );
	    $.mobile.navigate( hash, '', true );
	} else if( typeof f.toPage !== "object" &&
		   hash !== "" &&
		   $.mobile.path.parseUrl( href ).hash !== "" &&
		   !hashEl.hasClass( "ui-page" ) && hashEl.attr('data-role') !== "page" &&
		   !hashElInPage.hasClass( "ui-panel" ) &&
		   !hashElInPage.hasClass( "ui-popup" ) ) {
	    $( ele ).attr( "href", href );
	    $.mobile.document.one( "pagechange", function() {
		if( typeof hash !== "undefined" &&
		    hash.search( "/" ) === -1 &&
		    hash !== "" &&
		    hashEl.length > 0 &&
		    hashElInPage.length > 0 &&
		    !hashEl.hasClass( "ui-page" ) &&
		    hashEl.data('role') !== "page" &&
		    !hashElInPage.hasClass( "ui-panel" ) &&
		    !hashElInPage.hasClass( "ui-popup" ) ) {
		    hash = $.mobile.path.parseUrl( href ).hash;
		    var pos = hashElInPage.offset().top;
		    $.mobile.silentScroll( pos );
		}
	    } );
	}
    });

    $( document ).on( "mobileinit", function(){
        hash = window.location.hash;
        $.mobile.document.one( "pageshow", function(){
	    var hashEl, hashElInPage;

	    try {
	        hashEl = $( hash );
	    } catch( e ) {
	        hashEl = $();
	    }

	    try {
	        hashElInPage = $( ".ui-page-active " + hash );
	    } catch( e ) {
	        hashElInPage = $();
	    }

	    if( hash !== "" &&
	        hashEl.length > 0 &&
	        hashElInPage.length > 0 &&
	        hashEl.attr('data-role') !== "page" &&
	        !hashEl.hasClass( "ui-page" ) &&
	        !hashElInPage.hasClass( "ui-panel" ) &&
	        !hashElInPage.hasClass( "ui-popup" ) &&
	        !hashEl.is( "body" ) ){
	        var pos = hashElInPage.offset().top;
	        setTimeout( function(){
		    $.mobile.silentScroll( pos );
	        }, 400 );
	    }
        });
    });
})(jQuery);
