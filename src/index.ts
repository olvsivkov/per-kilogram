const resultPerKilo = document.querySelector(".result-per-kilo")
const BTNSubmit = document.querySelector(".BTNSubmit")
const form: HTMLFormElement | null = document.querySelector('form');
const toLocalStorage = document.querySelector('.result-per-kilo')
const BTNLocalStorageClear = document.querySelector('.BTNLocalStorageClear')
const resultPerKiloElem = document.querySelector('.result-per-kilo');
const switchTheme = document.querySelector('.switch-theme')
const numberFields = document.querySelectorAll('.number-field')
let isDarkTheme = false

// type guard function

function validateForm(): string | undefined{
  const inputValueAmount: string = form?.num_amount.value.trim();
  const inputValueWeight: string = form?.num_weight.value.trim();
  if(!inputValueAmount || isNaN(Number(inputValueAmount))) {
    if(form !== null) form.num_amount.classList.add("invalid"); 
    return "not a number";
  }
  if(!inputValueWeight || isNaN(Number(inputValueWeight))) {
    if(form !== null) form.num_weight.classList.add("invalid");
    return "not a number";
  }
  if( +inputValueAmount < 1 || +inputValueWeight < 1){
    showPopUp()
    return "not a number";
  }
}

function borderWhenFormNotEmpty(){
  numberFields.forEach( elem => elem.classList.remove("invalid") )
}

function showPopUp() {
  const popupElement = document.getElementById('popup') as HTMLElement;
    popupElement.style.display = 'block';
    setTimeout(function() {
      popupElement.style.display = 'none';
    }, 2000);

}

/*form?.addEventListener('focus', function(event: FocusEvent) {
  const targetElement = event.target as HTMLElement; 
  targetElement?.classList.remove("invalid");
});*/

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

  const lightTheme = `<div class="inner-div-item"><div class="value-wrapper"><p>100 гр = ${amount} &#x20bd.</p> <p> 1 кг = ${weight} &#x20bd.</p></div><div class="close-symbol">&#10005;</div></div>`;

  const darkTheme = `<div class="inner-div-item"><div class="value-wrapper"><p class="app-switcher">100 гр = ${amount} &#x20bd.</p> <p class="app-switcher"> 1 кг = ${weight} &#x20bd.</p></div><div class="close-symbol">&#10005;</div></div>`;
  const div: HTMLDivElement = document.createElement('div');
  div.classList.add("new-div-item");
  div.innerHTML = isDarkTheme ? darkTheme : lightTheme;
  div.querySelector('button')?.addEventListener('click', () => {
    div.remove();
  });
  return div;
}

function submitForm(): void {
  if(validateForm() && "not a number") {
    console.log("No div")
    return
  }
  else {
    borderWhenFormNotEmpty();
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

  checkDarkThemeAfterReload()

  const removeDivItem = (event: any): void => {
    if (event.target.classList.contains('close-symbol')) {
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

BTNLocalStorageClear?.addEventListener('click', () => {
  window.localStorage.clear();
  location.reload();
})

BTNSubmit?.addEventListener('click', submitForm)

// switch color theme

switchTheme?.addEventListener('click', switchThemeStyle)

function checkDarkThemeAfterReload() {
  const darkThemeStatus = localStorage.getItem('darkThemeStatus')
  if(darkThemeStatus === 'darkThemeTrue') switchThemeStyle()
}

function switchThemeStyle(): void {
  const body = document.querySelector('body')
  const app = document.getElementById('app')
  const blockInForm = document.querySelectorAll('.block-fields')
  const paragraph = document.querySelectorAll('p')
  const changeImg = document.querySelector('.switch-theme')

  body?.classList.toggle('body-switcher')
  app?.classList.toggle('app-switcher')
  paragraph?.forEach(elem => elem.classList.toggle('app-switcher'))
  blockInForm?.forEach(elem => { 
    elem.classList.toggle('block-in-form-switcher')
    elem.classList.toggle('app-switcher')
  })

  if(body?.classList.contains('body-switcher'))  {
    isDarkTheme = true;
    if(changeImg !== null) {
    changeImg.innerHTML = `
      <span>Light</span>
      <img src="./assets/icon-sun.svg" alt="sun icon">
    `}
    localStorage.setItem('darkThemeStatus', "darkThemeTrue");
   }else { 
    isDarkTheme = false;
    if(changeImg !== null) {
    changeImg.innerHTML = `
      <span>Dark</span>
      <img src="./assets/icon-moon.svg" alt="moon icon">
    `}
    localStorage.removeItem('darkThemeStatus');
   }
}


