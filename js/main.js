// Fixed Navbar
let navHeight = $('.menu').height();
window.onscroll = function () {
    if (window.scrollY > 0) {
        $(".menu").addClass("navbar-fixed");
    } else {
        $(".menu").removeClass("navbar-fixed");
    }
};

// Add shadow under expanded navbar
$('.navbar-toggler').on('click', (event) => {
    if ($('.menu').height() == navHeight) {
        $('.menu').addClass('expanded');
    } else {
        $('.menu').removeClass('expanded');
    }
});

// Collapse navbar and set active tab
$('.nav-link').on('click', (event) => {
    $('.navbar-collapse').collapse('hide');
    $('.nav-link').removeClass('active');
    event.target.classList.add('active');
});