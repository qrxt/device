"use strict";

const overlay = document.querySelector(".overlay");

const writeUsViewButton = document.querySelector(".contacts-button");
const writeUsPopup = document.querySelector(".write-us");
const writeUsForm = document.querySelector(".write-us-form");
const writeUsFormName = document.querySelector("[name=write-us-name]");
const writeUsFormEmail = document.querySelector("[name=write-us-email]");
const writeUsFormMessage = document.querySelector("[name=write-us-message]");
const writeUsPopupCloseButton = document.querySelector(".write-us-close");
const writeUsFormFields = [writeUsFormName, writeUsFormEmail, writeUsFormMessage];

const locationViewButton = document.querySelector(".contacts-map");
const locationPopup = document.querySelector(".our-location");
const locationPopupCloseButton = document.querySelector(".our-location-close");

const sliderTabsMenu = document.querySelectorAll(".slider-controls");

const userName = (localStorage && localStorage.getItem("userName")) ?
    localStorage.getItem("userName") : null;

const userEmail = (localStorage && localStorage.getItem("userEmail")) ?
    localStorage.getItem("userEmail") : null;

/* Выпадающая карта */

locationViewButton.addEventListener("click", function (clickEvent) {
    clickEvent.preventDefault();
    overlay.classList.add("show");
    locationPopup.classList.add("show");
    locationPopup.classList.add("show-animation");
    setTimeout(function () {
        locationPopup.classList.remove("show-animation");
    }, 500);
});

locationViewButton.addEventListener("keydown", function (clickEvent) {
    if (clickEvent.keyCode === 27) closeLocationPopup();
});

locationPopupCloseButton.addEventListener("click", function (clickEvent) {
    clickEvent.preventDefault();
    closeLocationPopup();
});

const closeLocationPopup = function () {
    overlay.classList.remove("show");
    locationPopup.classList.remove("show");
}

/* Окончание кода выпадающей карты */

/* Выпадающеее окно обратной связи */

writeUsViewButton.addEventListener("click", function (clickEvent) {
    clickEvent.preventDefault();
    overlay.classList.add("show");
    writeUsPopup.classList.add("show");
    writeUsPopup.classList.add("show-animation");
    setTimeout(function () {
        writeUsPopup.classList.remove("show-animation");
    }, 500);

    if (userName && userEmail) {
        writeUsFormName.value = userName;
        writeUsFormEmail.value = userEmail;
        writeUsFormMessage.focus();
    } else writeUsFormName.focus();
});

writeUsForm.addEventListener("submit", function (submitEvent) {
    if (!writeUsFormName.value || !writeUsFormEmail.value || !writeUsFormMessage.value) {
        submitEvent.preventDefault();
        writeUsPopup.classList.add("error");
        setTimeout(function () {
            writeUsPopup.classList.remove("error");
        }, 800);
        writeUsFormFields.forEach(function (item) {
            if (!item.value) {
                item.classList.add("incorrect");
            }
        })
    } else if (localStorage) {
        localStorage.setItem("userName", writeUsFormName.value);
        localStorage.setItem("userEmail", writeUsFormEmail.value);
    }
});

writeUsPopupCloseButton.addEventListener("click", function (clickEvent) {
    clickEvent.preventDefault();
    closeWriteUsPopup();
});

writeUsPopup.addEventListener("keydown", function (keypressEvent) {
    if (keypressEvent.keyCode === 27) closeWriteUsPopup();
});

const closeWriteUsPopup = function () {
    overlay.classList.remove("show");
    writeUsPopup.classList.remove("show");
}

/* Окончание кода выпадающей формы фидбека */

/* Слайдеры */

sliderTabsMenu.forEach(function (tabsMenuItem) {
    const sliderTabsMenuControls = tabsMenuItem.querySelectorAll("button");
    sliderTabsMenuControls.forEach(function (button) {
        button.addEventListener("click", function (clickEvent) {
            sliderTabsMenuControls.forEach(function (button, Buttonindex) {
                button.classList.remove("active");
                if (clickEvent.target === button) {
                    button.classList.add("active");
                    tabsMenuItem.nextElementSibling
                        .querySelectorAll(".slider-item")
                        .forEach(function (relativeSlide, slideIndex) {
                            relativeSlide.classList.remove("active");
                            if (Buttonindex === slideIndex) {
                                relativeSlide.classList.add("active");
                            }
                        });
                }
            });
        });
    });
});

/* Окончание кода слайдеров */

overlay.addEventListener("click", function () {
    closeWriteUsPopup();
    closeLocationPopup();
});