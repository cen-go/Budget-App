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

let ENTRY_LIST = JSON.parse(localStorage.getItem("entry_list")) || [];
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

// CALCULATION FUNCTIONS
const calculateTotal = (type) => {
  let sum = 0;
  for (const entry of ENTRY_LIST) {
    if (entry.type === type) {
      sum += entry.amount;
    }
  }
  return sum;
};

const calculateBalance = () => balance = income - outcome;

// FUNCTION UPDATING UI

const clearLists = (lists) => {
  lists.forEach(list => list.innerHTML = "");
}

const updateUI = () => {  
    clearLists([expenseList, incomeList, allList]);
    for (const entry of ENTRY_LIST) {
      const uiInput = document.createElement("li");
      uiInput.id = `${ENTRY_LIST.indexOf(entry)}`;
      uiInput.className = `${entry.type}`;
      uiInput.innerHTML = `
        <div class="entry">${entry.title}: \$${entry.amount}</div>
        <div id="edit"></div>
        <div id="delete"></div>      
      `;
      if (entry.type === "expense") {
        expenseList.insertAdjacentElement("afterbegin",uiInput);
      } else {
        incomeList.insertAdjacentElement("afterbegin",uiInput);
      }   
      const allListEntry = uiInput.cloneNode(true);
      allList.insertAdjacentElement("afterbegin", allListEntry);       
    }
    //CALCULATIONS AND UPDATE OF UI HEADER
    outcome = calculateTotal("expense");
    income = calculateTotal("income");
    calculateBalance();  
    let balanceSign = income >= outcome ? "$" : "-$";
    balanceEl.innerHTML = `<small>${balanceSign}</small>${Math.abs(balance)}`;
    incomeTotalEl.innerHTML = `<small>$</small>${income}`;
    outcomeTotalEl.innerHTML = `<small>$</small>${outcome}`;
    updateChart();
    localStorage.setItem("entry_list", JSON.stringify(ENTRY_LIST));    
};

updateUI();  // To read data from local storage at first launch of the app


// EVENT HANDLER FUNCTIONS FOR ADDING INCOME AND EXPENSE
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
  updateUI();
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
  updateUI();
  clearFields([incomeTitle, incomeAmount]);
};

const deleteEditHandler = (event) => { 
  const targetBtn = event.target;
  const targetListItem = event.target.closest("li");
  if (targetBtn.id === "delete") {    
    ENTRY_LIST.splice(targetListItem.id, 1);    
    updateUI();
  } else if (targetBtn.id === "edit") {
    const targetEntry = ENTRY_LIST[targetListItem.id];
    console.log(targetEntry);
    if (targetEntry.type === "income") {
      incomeTitle.value = targetEntry.title;
      incomeAmount.value = targetEntry.amount;
    } else {
      expenseTitle.value = targetEntry.title;
      expenseAmount.value = targetEntry.amount;
    }
    ENTRY_LIST.splice(targetListItem.id, 1);  
  }
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

// EVENT LISTENERS FOR DELETING AND EDITING

expenseList.addEventListener("click", deleteEditHandler);

incomeList.addEventListener("click", deleteEditHandler);

allList.addEventListener("click", deleteEditHandler);
