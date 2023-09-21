"use strict";
const resultPerKilo = document.querySelector(".result-per-kilo");
const BTNSubmit = document.querySelector(".BTNSubmit");
const form = document.querySelector('form');
function createElem(amount, weight) {
    var _a;
    const div = document.createElement('div');
    div.innerHTML = `<p>цена ${amount} вес ${weight}</p><button>Close</button>`;
    (_a = div.querySelector('button')) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
        div.remove();
    });
    return div;
}
function submitForm() {
    let numAmount = Number(form === null || form === void 0 ? void 0 : form.num_amount.value);
    const numWeight = Number(form === null || form === void 0 ? void 0 : form.num_weight.value);
    console.log(typeof numAmount);
    resultPerKilo === null || resultPerKilo === void 0 ? void 0 : resultPerKilo.append(createElem(numAmount, numWeight));
    //numAmount.value = null
}
BTNSubmit === null || BTNSubmit === void 0 ? void 0 : BTNSubmit.addEventListener('click', submitForm);
