const resultPerKilo = document.querySelector(".result-per-kilo")
const BTNSubmit = document.querySelector(".BTNSubmit")
const form = document.querySelector('form');

interface IvalueFromForm {
  numAmount: number,
  numWeight: number
}

// calculate functions

const valueObject: IvalueFromForm = {
  numAmount: 0,
  numWeight: 0
}

function getValueFromForm():void {
    valueObject.numAmount = form?.num_amount.value,
    valueObject.numWeight = form?.num_weight.value
}
function calcToOneHundredGrams(): number {
  const valueToOneGram: number = valueObject.numAmount/valueObject.numWeight
  return +valueToOneGram.toFixed(2) 
}

function calcToOneThousandGrams(): number  {
  const valueToThousandGram: number = (valueObject.numAmount/valueObject.numWeight) * 1000
  return +valueToThousandGram.toFixed(2) 
}

// create info element after calculate values

function createElem(amount:number, weight:number) {
  const div: HTMLDivElement = document.createElement('div');
  div.innerHTML = `<p>цена за 100 гр ${amount} р. Цена за 1 кг ${weight} р.</p><button>Close</button>`;
  div.querySelector('button')?.addEventListener('click', () => {
    div.remove();
  });
  return div;
}

function submitForm() {
  getValueFromForm()
  resultPerKilo?.append(createElem(calcToOneHundredGrams(),calcToOneThousandGrams()))
  //numAmount.value = null
}

BTNSubmit?.addEventListener('click', submitForm)



