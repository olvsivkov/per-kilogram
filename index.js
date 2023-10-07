"use strict";
var resultPerKilo = document.querySelector(".result-per-kilo");
var BTNSubmit = document.querySelector(".BTNSubmit");
var form = document.querySelector('form');
var toLocalStorage = document.querySelector('.result-per-kilo');
var BTNLocalStorageClear = document.querySelector('.BTNLocalStorageClear');
var resultPerKiloElem = document.querySelector('.result-per-kilo');
var switchTheme = document.querySelector('.switch-theme');
var numberFields = document.querySelectorAll('.number-field');
var isDarkTheme = false;
// type guard function
function validateForm() {
    var inputValueAmount = form === null || form === void 0 ? void 0 : form.num_amount.value.trim();
    var inputValueWeight = form === null || form === void 0 ? void 0 : form.num_weight.value.trim();
    if (!inputValueAmount || isNaN(Number(inputValueAmount))) {
        if (form !== null)
            form.num_amount.classList.add("invalid");
        return "not a number";
    }
    if (!inputValueWeight || isNaN(Number(inputValueWeight))) {
        if (form !== null)
            form.num_weight.classList.add("invalid");
        return "not a number";
    }
    if (+inputValueAmount < 1 || +inputValueWeight < 1) {
        showPopUp();
        return "not a number";
    }
}
function borderWhenFormNotEmpty() {
    numberFields.forEach(function (elem) { return elem.classList.remove("invalid"); });
}
function showPopUp() {
    var popupElement = document.getElementById('popup');
    popupElement.style.display = 'block';
    setTimeout(function () {
        popupElement.style.display = 'none';
    }, 2000);
}
var valuesFromForm = {
    numAmount: 0,
    numWeight: 0
};
function getValueFromForm() {
    valuesFromForm.numAmount = form === null || form === void 0 ? void 0 : form.num_amount.value,
        valuesFromForm.numWeight = form === null || form === void 0 ? void 0 : form.num_weight.value;
}
function calcToOneHundredGrams() {
    var valueToOneGram = Number(valuesFromForm.numAmount / valuesFromForm.numWeight) * 100;
    return +valueToOneGram.toFixed(2);
}
function calcToOneThousandGrams() {
    var valueToThousandGram = Number(valuesFromForm.numAmount / valuesFromForm.numWeight) * 1000;
    return +valueToThousandGram.toFixed(2);
}
// create info element after calculate values
function createElem(amount, weight) {
    var _a;
    var lightTheme = "<div class=\"inner-div-item\"><div class=\"value-wrapper\"><p>100 \u0433\u0440 = ".concat(amount, " \u0440\u0443\u0431 </p> <p> 1 \u043A\u0433 = ").concat(weight, " \u0440\u0443\u0431</p></div><div class=\"close-symbol\">&#10005;</div></div>");
    var darkTheme = "<div class=\"inner-div-item\"><div class=\"value-wrapper\"><p class=\"app-switcher\">100 \u0433\u0440 = ".concat(amount, " \u0440\u0443\u0431</p> <p class=\"app-switcher\"> \u0437\u0430 1 \u043A\u0433 = ").concat(weight, "\u0440\u0443\u0431 </p></div><div class=\"close-symbol\">&#10005;</div></div>");
    var div = document.createElement('div');
    div.classList.add("new-div-item");
    div.innerHTML = isDarkTheme ? darkTheme : lightTheme;
    (_a = div.querySelector('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        div.remove();
    });
    return div;
}
function submitForm() {
    if (validateForm() && "not a number") {
        console.log("No div");
        return;
    }
    else {
        borderWhenFormNotEmpty();
        getValueFromForm();
        var newCalculateElem = createElem(calcToOneHundredGrams(), calcToOneThousandGrams());
        resultPerKilo === null || resultPerKilo === void 0 ? void 0 : resultPerKilo.append(newCalculateElem);
        putDataToLocalstorage();
        form === null || form === void 0 ? void 0 : form.reset();
    }
}
// put data in localstorage
function putDataToLocalstorage() {
    var divsWithCalculate = toLocalStorage === null || toLocalStorage === void 0 ? void 0 : toLocalStorage.outerHTML.toString();
    if (typeof divsWithCalculate === "string") {
        localStorage.setItem('items', divsWithCalculate);
    }
}
window.onload = function () {
    var savedData = localStorage.getItem('items');
    if (savedData) {
        var divElem = document.createElement('div');
        divElem.classList.add('new-div-item');
        divElem.innerHTML = savedData;
        resultPerKiloElem === null || resultPerKiloElem === void 0 ? void 0 : resultPerKiloElem.append(divElem);
    }
    else {
        console.log('No data in localStorage');
    }
    checkDarkThemeAfterReload();
    var removeDivItem = function (event) {
        if (event.target.classList.contains('close-symbol')) {
            var divItemElem = event.target.closest('.new-div-item');
            if (divItemElem) {
                divItemElem.remove();
                localStorage.clear();
                putDataToLocalstorage();
            }
        }
    };
    resultPerKiloElem === null || resultPerKiloElem === void 0 ? void 0 : resultPerKiloElem.addEventListener('click', removeDivItem);
};
BTNLocalStorageClear === null || BTNLocalStorageClear === void 0 ? void 0 : BTNLocalStorageClear.addEventListener('click', function () {
    localStorage.removeItem('items');
    location.reload();
});
BTNSubmit === null || BTNSubmit === void 0 ? void 0 : BTNSubmit.addEventListener('click', submitForm);
// switch color theme
switchTheme === null || switchTheme === void 0 ? void 0 : switchTheme.addEventListener('click', switchThemeStyle);
function checkDarkThemeAfterReload() {
    var darkThemeStatus = localStorage.getItem('darkThemeStatus');
    if (darkThemeStatus === 'darkThemeTrue')
        switchThemeStyle();
}
function switchThemeStyle() {
    var body = document.querySelector('body');
    var app = document.getElementById('app');
    var blockInForm = document.querySelectorAll('.block-fields');
    var paragraph = document.querySelectorAll('p');
    var changeImg = document.querySelector('.switch-theme');
    body === null || body === void 0 ? void 0 : body.classList.toggle('body-switcher');
    app === null || app === void 0 ? void 0 : app.classList.toggle('app-switcher');
    paragraph === null || paragraph === void 0 ? void 0 : paragraph.forEach(function (elem) { return elem.classList.toggle('app-switcher'); });
    blockInForm === null || blockInForm === void 0 ? void 0 : blockInForm.forEach(function (elem) {
        elem.classList.toggle('block-in-form-switcher');
        elem.classList.toggle('app-switcher');
    });
    if (body === null || body === void 0 ? void 0 : body.classList.contains('body-switcher')) {
        isDarkTheme = true;
        if (changeImg !== null) {
            changeImg.innerHTML = "\n      <span>Light</span>\n      <img src=\"./assets/icon-sun.svg\" alt=\"sun icon\">\n    ";
        }
        localStorage.setItem('darkThemeStatus', "darkThemeTrue");
    }
    else {
        isDarkTheme = false;
        if (changeImg !== null) {
            changeImg.innerHTML = "\n      <span>Dark</span>\n      <img src=\"./assets/icon-moon.svg\" alt=\"moon icon\">\n    ";
        }
        localStorage.removeItem('darkThemeStatus');
    }
}
