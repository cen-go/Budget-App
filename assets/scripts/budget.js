// SELECT ELEMENTS
const balanceEl = document.querySelector(".budget-header .balance .value");
const incomeTotalEl = document.querySelector(".income-total");
const outcomeTotalEl = document.querySelector(".outcome-total");
const chartEl = document.querySelector(".chart");
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