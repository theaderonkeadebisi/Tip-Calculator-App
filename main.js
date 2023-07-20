'use strict';
const bill = document.getElementById('bill');
const numberOfPeople = document.getElementById('numberOfPeople');
const tipPercent = document.querySelectorAll('.tip-value');
const totalBill = document.getElementById('total');
const tipPerPersonAmount = document.getElementById('tipAmount');
const customTip = document.getElementById('customTip');
const resetBtn = document.getElementById('resetBtn');

let amount;
let person;
let tip = 0;

const checkingInputValues = () => {
  if (person <= 0) {
    numberOfPeople.parentNode.classList.add('person-error');
    totalBill.innerText = `$0.00`;
    tipPerPersonAmount.innerText = `$0.00`;
  } else {
    numberOfPeople.parentElement.classList.remove('person-error');
    if (tip > 0) {
      calculateValues();
    } else {
      showBill();
    }
  }
};

const calculateBill = () => {
  amount = +bill.value;
  person = +numberOfPeople.value;
  tipPercent.forEach((item) => item.classList.remove('clicked'));
  checkingInputValues();
};

const calculateValues = () => {
  const number = (amount * tip / 100) / person;
  tipPerPersonAmount.innerText = `$ ${number.toFixed(2)}`;
  totalBill.innerText = `$ ${(number + (amount / person)).toFixed(2)}`;
};

const tipCalculate = (item) => {
  item.classList.add('clicked');
  if (item.classList.contains('predefined')) {
    tip = item.dataset.percent;
    calculateValues();
  } else {
    customTip.addEventListener('input', () => {
      tip = customTip.value;
      calculateValues();
    });
  }
};

const showBill = () => {
  tipPercent.forEach((item) => {
    item.addEventListener('click', () => {
      tipPercent.forEach((item) => item.classList.remove('clicked'));
      tipCalculate(item);
    });
  });
};

bill.addEventListener('input', calculateBill);
numberOfPeople.addEventListener('change', calculateBill);

resetBtn.addEventListener('click', () => {
  amount = 0;
  person = 0;
  tip = 0;
  bill.value = 0;
  numberOfPeople.value = 0;
  customTip.value = 0;
  tipPercent.forEach((item) => item.classList.remove('clicked'));
  totalBill.innerText = `$0.00`;
  tipPerPersonAmount.innerText = `$0.00`;
  numberOfPeople.classList.remove('error');
});