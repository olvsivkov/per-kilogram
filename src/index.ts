const resultPerKilo = document.querySelector(".result-per-kilo")
const BTNSubmit = document.querySelector(".BTNSubmit")
const form = document.querySelector('form');

interface IvalueFromForm {
  numAmount: number,
  numWeight: number
}

// type guard function

function isNaNFormValue(): string | undefined{
  const inputValueAmount: string = form?.num_amount.value;
  const inputValueWeight: string = form?.num_weight.value;
  if (inputValueWeight === ""|| inputValueAmount === "" || isNaN(Number(inputValueAmount|| inputValueWeight))) {
    return "not a number"
  }
  else if(inputValueWeight === "0" || inputValueAmount === "0") { 
    return "not a number" 
  }
}

// calculate functions

const valueObject: IvalueFromForm = {
  numAmount: 0,
  numWeight: 0
}

function getValueFromForm():void {
  valueObject.numAmount = form?.num_amount.value,
  valueObject.numWeight = form?.num_weight.value; 
}
function calcToOneHundredGrams(): number {
  const valueToOneGram: number = Number(valueObject.numAmount/valueObject.numWeight) * 100
  return +valueToOneGram.toFixed(2) 
}

function calcToOneThousandGrams(): number  {
  const valueToThousandGram: number = Number(valueObject.numAmount/valueObject.numWeight) * 1000
  return +valueToThousandGram.toFixed(2) 
}

// create info element after calculate values

function createElem(amount:number, weight:number): HTMLDivElement {
  const div: HTMLDivElement = document.createElement('div');
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
    resultPerKilo?.append(createElem(calcToOneHundredGrams(),calcToOneThousandGrams()))
    //numAmount.value = null
  }
}

BTNSubmit?.addEventListener('click', submitForm)



