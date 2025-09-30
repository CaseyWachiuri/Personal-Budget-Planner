const init = () => {
  addExpense();
  budgetSummary();
}

document.addEventListener("DOMContentLoaded", init);

async function budgetSummary() {
    let income = 0;
    let totalExpenses = 0;

    totalExpenses = await fetch("http://localhost:3000/expenses")
      .then(r => r.json())
      .then(data => {
	data.forEach((data) => {
	  totalExpenses += parseInt(data.Expense, 10);
	});
	return totalExpenses;
      })

    income = await fetch("http://localhost:3000/income")
      .then(r => r.json())
      .then(data => {
	  data.forEach((data) => {
	    income = parseInt(data.MonthlyAmount, 10);
	});
	return income;
      });

    updateUI(totalExpenses, income);

    function updateUI(totalExpenses, income) {
      let balance = income - totalExpenses;
      console.log(balance);
      document.querySelector("p#total-income").textContent = income;
      document.querySelector("p#total-expense").textContent = totalExpenses;
      document.querySelector("p#balance").textContent = balance;
    }

}

// Handles adding expenses from the expenses form to the db.json file
function addExpense() {
  const expenseInput = document.querySelector("form#expense-form");
  expenseInput.addEventListener("submit", (event) => {
    event.preventDefault();
    // Amount variable assignment
    const expenseAmount = document.querySelector("input#expense-amount").value;
    // Category variable assignment
    const category = document.querySelector("select#expense-category").value;
    // Date variable assignment
    const expenseDate = document.querySelector("input#expense-date").value;

    const expenseData = {
      Expense: expenseAmount,
      Type: category,
      Date: expenseDate,
    };

    const configurationObject = {
      method: "POST",
      headers: {
	"Content-Type": "application/json",
	"Accept": "application/json",
      },
      body: JSON.stringify(expenseData),
    };

    fetch("http://localhost:3000/expenses", configurationObject)
      .then((response) => response.json())
      .then((data) => console.log(data));

    expenseInput.reset();
  });
}
