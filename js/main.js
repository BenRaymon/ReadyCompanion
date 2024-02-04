// Fixed Navbar
let navHeight = $('.menu').height();
let prevScrollY = window.height;
window.onscroll = function () {
    if (window.scrollY < prevScrollY) {
        $(".menu").addClass("navbar-fixed");
    } else {
        $(".menu").removeClass("navbar-fixed");
    }
    prevScrollY = window.scrollY;
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


/* Send Email - Contact Form */
// TODO - set emailjs key
emailjs.init('96I6oe9EPq39uF1ED');

async function sendEmail(formElement) {
    // TODO - set emailjs service and template keys
    let res = await emailjs.sendForm('service_83z8ebl', 'template_st9qbul', formElement);
    console.log(res);
}

async function handleFormSubmit(event) {
    event.preventDefault();

    const formElement = $('#contactform')[0];
    const formData = new FormData(formElement);

    let valid = true;
    for (const item of formData.entries()) {
        valid = validateInputs(item[0], item[1]) ? valid : false;
    }

    if (valid) {
        await sendEmail(formElement);
        formElement.reset();
    }
}

function validateInputs(key, value) {
    let valid = true;
    switch (key) {
        case 'user_name':
            valid = isNotWhiteSpace(value);
            addValidation(key, valid);
            break;
        case 'user_email':
            valid = isValidEmail(value);
            addValidation(key, valid);
            break;
    }
    return valid;
}

function isNotWhiteSpace(text) {
    let hasEverything = /\S/.test(text) && text !== undefined && text !== null;
    if (typeof text === "object") {
        if (text.size === 0) {
            hasEverything = false;
        }
    }
    return hasEverything;
}

function isValidEmail(email) {
    let regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
    return regex.test(email);
}

function addValidation(fieldId, isValid) {
    if (!isValid) {
        $(`#${fieldId}`).addClass('is-invalid');
    } else {
        $(`#${fieldId}`).removeClass('is-invalid');
    }
}

$('#submit-message').on('click', (event) => { handleFormSubmit(event); });