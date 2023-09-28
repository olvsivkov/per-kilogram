"use strict";
var resultPerKilo = document.querySelector(".result-per-kilo");
var BTNSubmit = document.querySelector(".BTNSubmit");
var form = document.querySelector('form');
var toLocalStorage = document.querySelector('.result-per-kilo');
var BTNLoalStorageClear = document.querySelector('.BTNLoalStorageClear');
var resultPerKiloElem = document.querySelector('.result-per-kilo');
// type guard function
function isNaNFormValue() {
    var inputValueAmount = form === null || form === void 0 ? void 0 : form.num_amount.value.trim();
    var inputValueWeight = form === null || form === void 0 ? void 0 : form.num_weight.value.trim();
    if (inputValueAmount === "" || inputValueAmount === "0" || isNaN(Number(inputValueAmount))) {
        if (form !== null)
            form.num_amount.classList.add("invalid"); // !!!!!!!!!!!!! В css сделать рамку
        // !!!!!!!! дописать popup
        return "not a number";
    }
    if (inputValueWeight === "" || inputValueWeight === "0" || isNaN(Number(inputValueWeight))) {
        if (form !== null)
            form.num_weight.classList.add("invalid");
        // !!!!!!!! дописать popup
        return "not a number";
    }
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
    var div = document.createElement('div');
    div.classList.add("new-div-item");
    div.innerHTML = "<p>100 \u0433\u0440 = ".concat(amount, " &#x20bd.</p> <p> 1 \u043A\u0433 = ").concat(weight, " &#x20bd.</p><p class=\"close-symbol\">&#10005;</p>");
    (_a = div.querySelector('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', function () {
        div.remove();
    });
    return div;
}
function submitForm() {
    if (isNaNFormValue() && "not a number") {
        console.log("No div");
        return;
    }
    else {
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
    //const divItemElem = event.target.closest('.new-div-item');
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
BTNLoalStorageClear === null || BTNLoalStorageClear === void 0 ? void 0 : BTNLoalStorageClear.addEventListener('click', function () {
    window.localStorage.clear();
    location.reload();
});
BTNSubmit === null || BTNSubmit === void 0 ? void 0 : BTNSubmit.addEventListener('click', submitForm);
