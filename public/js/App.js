
var page = 0;

function previous_page_view (e) { 
    console.log("previous page: " + page);
    if (page > 0) {
        page--;
        update_mobile_form_page_views();
    }
    else if (page <= 0 ) {
        page = 0;
        update_mobile_form_page_views();
    }
}

function next_page_view (e) {
    const pageMax = document.getElementsByClassName("form-pages").length;
    console.log("max slides:\t" + pageMax);
    if (page < pageMax) {
        page++;
        update_mobile_form_page_views();
    }
    else if (page >= pageMax) {
        page = pageMax;
        update_mobile_form_page_views();
    }
}



function update_mobile_form_page_views () {
    var pages = document.getElementsByClassName("form-pages");
    var slideNo = pages[0].offsetWidth;
    for (var pg = 0; pg < pages.length; pg++) {
        pages[pg].style.transform = "translateX(-" + (slideNo * page) + "px)";
        pages[pg].style.transition = "0.3s ease-in";
    }

}