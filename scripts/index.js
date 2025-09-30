const init = () => {
  setBudget();
}

document.addEventListener("DOMContentLoaded", init);

function setBudget() {
  const incomeInput = document.querySelector("form#income-setup-form");
  incomeInput.addEventListener("submit", (event) => {
    event.preventDefault();
    // Assign monthly income from form input
    const monthlyIncome = document.querySelector("input#monthly-income").value;
    // Assign budget goal from form input
    const budgetGoal = document.querySelector("input#budget-goal").value;
    const startDate = document.querySelector("input#start-month").value;
    const endDate = document.querySelector("input#end-month").value;

    const budgetData = {
      MonthlyAmount: monthlyIncome,
      Budget: budgetGoal,
      startDate: startDate,
      endDate: endDate
    };

    const configurationObject = {
      method: "POST",
      headers: {
	"Content-Type": "application/json",
	"Accept": "application/json",
      },
      body: JSON.stringify(budgetData),
    };

    fetch("http://localhost:3000/income", configurationObject)
      .then((response) => response.json())
      .then((data) => console.log(data));

    incomeInput.reset();

    // Check if endDate backdates startDate
    /*
    if(startDate > endDate) {
    }else{
    }
    */

  });
}
