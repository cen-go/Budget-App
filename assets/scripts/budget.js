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

let ENTRY_LIST = [];

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

// FUNCTION UPDATING DASHBORD UI
const addToUI = (type, listEntry) => {  
    const uiInput = document.createElement("li");
    uiInput.id = `${ENTRY_LIST.indexOf(listEntry)}`;
    uiInput.className = `${type}`;
    uiInput.innerHTML = `
      <div class="entry">${listEntry.type}: \$${listEntry.amount}</div>
      <div id="edit"></div>
      <div id="delete"></div>      
    `;
    if (type === "expense") {
      expenseList.append(uiInput);
    } else {
      incomeList.append(uiInput);
    }
    const allUiInput = uiInput.cloneNode(true);
    allList.append(allUiInput);
};


const addExpenseHandler = () => {
  if (!expenseTitle.value || !expenseAmount.value) {
    return;
  }
  let expense = {
    type: "expense",
    title: expenseTitle.value,
    amount: parseFloat(expenseAmount.value),
  }
  ENTRY_LIST.push(expense);
  console.log(ENTRY_LIST);
  addToUI(expense.type, expense);
  clearFields([expenseTitle, expenseAmount]);
};

const addIncomeHandler = () => {
  if (!incomeTitle.value || !incomeAmount.value) {
    return;
  }
  let income = {
    type: "income",
    title: incomeTitle.value,
    amount: parseFloat(incomeAmount.value),
  }
  ENTRY_LIST.push(income);
  console.log(ENTRY_LIST);
  addToUI(income.type, income);
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