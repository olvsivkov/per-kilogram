"use strict";
var resultPerKilo = document.querySelector(".result-per-kilo");
var BTNSubmit = document.querySelector(".BTNSubmit");
var form = document.querySelector('form');
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
// calculate functions
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
    div.innerHTML = "<p>\u0446\u0435\u043D\u0430 \u0437\u0430 100 \u0433\u0440 ".concat(amount, " \u0440. \u0426\u0435\u043D\u0430 \u0437\u0430 1 \u043A\u0433 ").concat(weight, " \u0440.</p><button>Close</button>");
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
        resultPerKilo === null || resultPerKilo === void 0 ? void 0 : resultPerKilo.append(createElem(calcToOneHundredGrams(), calcToOneThousandGrams()));
        form === null || form === void 0 ? void 0 : form.reset();
    }
}
BTNSubmit === null || BTNSubmit === void 0 ? void 0 : BTNSubmit.addEventListener('click', submitForm);
