const resultPerKilo = document.querySelector(".result-per-kilo")
const BTNSubmit = document.querySelector(".BTNSubmit")
const form: HTMLFormElement | null = document.querySelector('form');
const toLocalStorage = document.querySelector('.result-per-kilo')
const BTNLoalStorageClear = document.querySelector('.BTNLoalStorageClear')
const resultPerKiloElem = document.querySelector('.result-per-kilo');

// type guard function

function isNaNFormValue(): string | undefined{
  const inputValueAmount: string = form?.num_amount.value.trim();
  const inputValueWeight: string = form?.num_weight.value.trim();
  if(inputValueAmount === "" || inputValueAmount === "0" || isNaN(Number(inputValueAmount))) {
    if(form !== null) form.num_amount.classList.add("invalid"); // !!!!!!!!!!!!! В css сделать рамку
    // !!!!!!!! дописать popup
    return "not a number";
  }
  if(inputValueWeight === "" || inputValueWeight === "0" || isNaN(Number(inputValueWeight))) {
    if(form !== null) form.num_weight.classList.add("invalid");
    // !!!!!!!! дописать popup
    return "not a number";
  }
}

// calculate functions

  interface IvalueFromForm {
    numAmount: number,
    numWeight: number
  }

  const valuesFromForm: IvalueFromForm = {
    numAmount: 0,
    numWeight: 0
  }

function getValueFromForm():void {
  valuesFromForm.numAmount = form?.num_amount.value,
  valuesFromForm.numWeight = form?.num_weight.value; 
}
function calcToOneHundredGrams(): number {
  const valueToOneGram: number = Number(valuesFromForm.numAmount / valuesFromForm.numWeight) * 100
  return +valueToOneGram.toFixed(2) 
}

function calcToOneThousandGrams(): number  {
  const valueToThousandGram: number = Number(valuesFromForm.numAmount / valuesFromForm.numWeight) * 1000
  return +valueToThousandGram.toFixed(2) 
}

// create info element after calculate values

function createElem(amount:number, weight:number): HTMLDivElement {
  const div: HTMLDivElement = document.createElement('div');
  div.classList.add("new-div-item")
  div.innerHTML = `<p>цена за 100 гр ${amount} р. Цена за 1 кг ${weight} р.</p><button>Close</button>`;
  div.querySelector('button')?.addEventListener('click', () => {
    div.remove();
  });
  return div;
}

function submitForm(): void {
  if(isNaNFormValue() && "not a number") {
    console.log("No div")
    return
  }
  else {
    getValueFromForm()
    const newCalculateElem = createElem(calcToOneHundredGrams(),calcToOneThousandGrams())
    resultPerKilo?.append(newCalculateElem);
    putDataToLocalstorage()
    form?.reset();
  }
}

// put data in localstorage

function putDataToLocalstorage(): void {
  let divsWithCalculate = toLocalStorage?.outerHTML.toString()
  if (typeof divsWithCalculate === "string"){
    localStorage.setItem('items', divsWithCalculate)
  }
}

window.onload = () => {
  
  const savedData = localStorage.getItem('items');
  if (savedData) {
    const divElem = document.createElement('div');
    divElem.classList.add('new-div-item');
    divElem.innerHTML = savedData;
    resultPerKiloElem?.append(divElem);
  } else {
    console.log('No data in localStorage');
  }

  const removeDivItem = (event: any): void => {
    if (event.target.tagName === 'BUTTON') {
      const divItemElem = event.target.closest('.new-div-item');
      if (divItemElem) {
        divItemElem.remove();
        localStorage.clear();
        putDataToLocalstorage();
      }
    }
};
resultPerKiloElem?.addEventListener('click', removeDivItem);
}

BTNLoalStorageClear?.addEventListener('click', () => {
  window.localStorage.clear();
  resultPerKiloElem?.remove();
})

BTNSubmit?.addEventListener('click', submitForm)



