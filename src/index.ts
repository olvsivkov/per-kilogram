const resultPerKilo = document.querySelector(".result-per-kilo")
const BTNSubmit = document.querySelector(".BTNSubmit")
const form = document.querySelector('form');

function createElem(amount:number, weight:number) {
  const div: HTMLDivElement = document.createElement('div');
  div.innerHTML = `<p>цена ${amount} вес ${weight}</p><button>Close</button>`;
  div.querySelector('button')?.addEventListener('click', () => {
    div.remove();
  });
  return div;
}

function submitForm() {
  let numAmount: number = Number(form?.num_amount.value)
  const numWeight: number = Number(form?.num_weight.value)
  console.log(typeof numAmount)
  resultPerKilo?.append(createElem(numAmount, numWeight))
  //numAmount.value = null
}

BTNSubmit?.addEventListener('click', submitForm)



