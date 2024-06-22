// SELECT ELEMENTS
const balanceEl = document.querySelector(".budget-header .balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const expenseEl = document.getElementById("expense");
const incomeEl = document.getElementById("income");
const allEl = document.getElementById("all");
const expenseList = document.querySelector("#expense .list");
const incomeList = document.querySelector("#income .list");
const allList = document.querySelector("#all .list");
// SELECT TABS
const expenseBtn = document.querySelector(".tab1");
const incomeBtn = document.querySelector(".tab2");
const allBtn = document.querySelector(".tab3");
// SELECT INPUT ELEMENTS
const incomeTitle = document.getElementById("income-title-input");
const incomeAmount = document.getElementById("income-amount-input");
const addIncomeBtn = document.querySelector(".add-income");
const expenseTitle = document.getElementById("expense-title-input");
const expenseAmount = document.getElementById("expense-amount-input");
const addExpenseBtn = document.querySelector(".add-expense");

let ENTRY_LIST = [];
let balance = 0;
let income = 0;
let outcome = 0;

// FUNCTIONS FOR SWITCHING TABS

const active = (element) => {
  element.classList.add("focus");
};

const inactive = (elementsArray) => {
  elementsArray.forEach(element => element.classList.remove("focus"));
};

const show = (element) => {
  element.classList.remove("hide");
};

const hide = (elementsArray) => {
  elementsArray.forEach(element => element.classList.add("hide"));
};

const clearFields = (inputFields) => {
  inputFields.forEach(field => field.value = "");
};

const calculateTotal = (type) => {
  let sum = 0;
  for (const entry of ENTRY_LIST) {
    if (entry.type === type) {
      sum += entry.amount;
    }
  }
  return sum;
};

// CALCULATION FUNCTIONS
const calculateBalance = () => balance = income - outcome;

// FUNCTION UPDATING UI
const addToUI = (type, listEntry) => {  
    const uiInput = document.createElement("li");
    uiInput.id = `${ENTRY_LIST.indexOf(listEntry)}`;
    uiInput.className = `${type}`;
    uiInput.innerHTML = `
      <div class="entry">${listEntry.title}: \$${listEntry.amount}</div>
      <div id="edit"></div>
      <div id="delete"></div>      
    `;
    if (type === "expense") {
      expenseList.insertAdjacentElement("afterbegin",uiInput);
    } else {
      incomeList.insertAdjacentElement("afterbegin",uiInput);
    }
    const allListEntry = uiInput.cloneNode(true);
    allList.insertAdjacentElement("afterbegin", allListEntry);
    let balanceSign = (income >= outcome) ? "$" : "-$";
    balanceEl.innerHTML = `<small>${balanceSign}</small>${Math.abs(balance)}`;
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
    updateChart();
};


const addExpenseHandler = () => {
  if (!expenseTitle.value || !expenseAmount.value) {
    return;
  }
  let expenseInput = {
    type: "expense",
    title: expenseTitle.value,
    amount: parseFloat(expenseAmount.value),
  }
  ENTRY_LIST.push(expenseInput);  
  outcome = calculateTotal("expense");
  calculateBalance();
  console.log(income, outcome, balance);
  addToUI(expenseInput.type, expenseInput);
  clearFields([expenseTitle, expenseAmount]);
};

const addIncomeHandler = () => {
  if (!incomeTitle.value || !incomeAmount.value) {
    return;
  }
  let incomeInput = {
    type: "income",
    title: incomeTitle.value,
    amount: parseFloat(incomeAmount.value),
  }
  ENTRY_LIST.push(incomeInput);
  income = calculateTotal("income");
  calculateBalance();
  console.log(income, outcome, balance);
  addToUI(incomeInput.type, incomeInput);
  clearFields([incomeTitle, incomeAmount]);
};


// EVENT LISTENERS FOR TABS

expenseBtn.addEventListener("click", () => {
  active(expenseBtn);
  inactive([incomeBtn, allBtn]);
  show(expenseEl);
  hide([incomeEl, allEl]);
});

incomeBtn.addEventListener("click", () => {
  active(incomeBtn);
  inactive([expenseBtn, allBtn]);
  show(incomeEl);
  hide([expenseEl, allEl]);
});

allBtn.addEventListener("click", () => {
  active(allBtn);
  inactive([incomeBtn, expenseBtn]);
  show(allEl);
  hide([expenseEl, incomeEl]);
});

// EVENT LISTENERS FOR INPUTS

addExpenseBtn.addEventListener("click", addExpenseHandler);

addIncomeBtn.addEventListener("click", addIncomeHandler);

