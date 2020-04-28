const totalBalance = document.querySelector('.total__balance'),
      totalMoneyIncome = document.querySelector('.total__money-income'),
      totalMoneyExpenses = document.querySelector('.total__money-expenses'),
      historyList = document.querySelector('.history__list'),
      form = document.querySelector('#form'),
      operationName = document.querySelector('.operation__name'),
      operationAmount = document.querySelector('.operation__amount'),
      operationType = document.querySelector('.operation__type');

const generateId = () => `id${Math.random(Math.random()*1e8).toString(16)}`

let dataBaseOperation = JSON.parse(localStorage.getItem('calc')) || [];


const renderOperation = (operation) => {

  const className = operation.type === 'expense' ? 'history__item-minus' : 'history__item-plus';
  
  const listItem = document.createElement('li');

  listItem.classList.add('history__item');
  listItem.classList.add(className);

  listItem.innerHTML = `${operation.description}
    <span class="history__money">${operation.amount}   грн.</span>
    <button class="history_delete" data-id="${operation.id}">x</button>
  `;

  historyList.append(listItem);

};

const updateBalance = () => {
  const resultIncome = dataBaseOperation
  .filter((item) => item.type === 'income')
  .reduce((result, item) => result + item.amount, 0);

  const resultExpences = dataBaseOperation
  .filter((item) => item.type === 'expense')
  .reduce((result, item) => result + item.amount, 0);
  
  totalMoneyIncome.textContent = resultIncome + ' грн.';
  totalMoneyExpenses.textContent = resultExpences + ' грн.';
  totalBalance.textContent = (resultIncome - resultExpences) + ' грн.';
};

const addOperation = (event) => {
  event.preventDefault();

  const operationNameValue = operationName.value,
        operationAmountValue = operationAmount.value,
        operationTypeValue = operationType.value;

  operationName.style.borderColor = '';
  operationAmount.style.borderColor = '';

  if (operationNameValue && operationAmountValue) {
    const operation = {
      id: generateId(),
      description: operationNameValue,
      amount: +operationAmountValue,
      type: operationTypeValue,
    };

    dataBaseOperation.push(operation);
    init();

  } else {
    if (!operationNameValue) operationName.style.borderColor = 'red';
    if (!operationAmountValue) operationAmount.style.borderColor = 'red';
  }
  operationName.value = '';
  operationAmount.value = '';

};

const deleteOperation = (event) => {
  if (event.target.classList.contains('history_delete')) {
    dataBaseOperation = dataBaseOperation
      .filter(operation => operation.id !== event.target.dataset.id);
    init();
  }
};

const init = () => {
  historyList.textContent = '';
  dataBaseOperation.forEach(renderOperation);
  updateBalance();
  localStorage.setItem('calc', JSON.stringify(dataBaseOperation));
};

form.addEventListener('submit', addOperation);

historyList.addEventListener('click', deleteOperation);

init();