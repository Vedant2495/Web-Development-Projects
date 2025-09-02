document.addEventListener("DOMContentLoaded",()=>{

    let expenseName = document.getElementById("expense-name");
    let expensePrice = document.getElementById("expense-price");
    let addBtn = document.getElementById("add-btn");

    let expenses = JSON.parse(localStorage.getItem("expense-details")) || [];
    // let expenses = [];
    let expenseList = document.getElementById("expense-list");

    let expenseAmount = document.getElementById("expense-amount");
    let totalAmount = JSON.parse(localStorage.getItem("total-expense")) || 0;
   
    if(totalAmount){
        expenseAmount.innerHTML = `$${totalAmount}`;
    }

    if(expenses){
        expenses.forEach((expense)=>{
            let div = document.createElement("div");
            div.setAttribute("class","expense");
            div.innerHTML = `
                <span>${expense.name}</span>
                <span>$${expense.price}</span>
                <button id=${expense.id}>Remove</button>
            `;

            expenseList.appendChild(div);
        })
    }


    expenseList.addEventListener("click",(e)=>{
        if(e.target.tagName == "BUTTON"){
            // let childExpense = document.getElementById(e.target.id);
            const idToRemove = parseInt(e.target.id);
            expenses = expenses.filter(e=> e.id != idToRemove);
            addLocalStorage(expenses);
            expenseList.removeChild(e.target.parentElement);

            totalAmount = 0;
            expenses.forEach(exp => {
                totalAmount += parseInt(exp.price);
            });

            // Save and update UI
            addTotalAmountLocalStorage(totalAmount);
            expenseAmount.innerHTML = `$${totalAmount}`;
            }
    })
    // console.log(expenses);

    addBtn.addEventListener("click",()=>{
        let name = expenseName.value.trim();
        let price = expensePrice.value.trim();
        console.log(name+" "+price);
        addExpense(name,price);
    })

    function addExpense(expense_name,expense_price){
        let obj = {
            id : Date.now(),
            name: expense_name,
            price: expense_price,
        }

        console.log(obj);

        // pusing obj in array
        expenses.push(obj);

        // pass array ot local storage for update
        addLocalStorage(expenses);
        renderData(obj.id,expense_name,expense_price)
        
    }

    function renderData(expense_id,expense_name,expense_price){
        // Creating element of expense
        let div = document.createElement("div");
        div.setAttribute("class","expense");
        div.innerHTML = `
            <span>${expense_name}</span>
            <span>$${expense_price}</span>
            <button id=${expense_id}>Remove</button>
        `;

        expenseList.appendChild(div);

        totalAmount = 0;
        expenses.forEach((expense)=>{
            totalAmount += parseInt(expense.price);
        })

        addTotalAmountLocalStorage(totalAmount);
        expenseAmount.innerHTML = `$${totalAmount}`;

        expenseName.value = "";
        expensePrice.value = "";
    }

    function addLocalStorage(expenses){
        localStorage.setItem("expense-details",JSON.stringify(expenses));
    }

    function addTotalAmountLocalStorage(totalAmount){
        localStorage.setItem("total-expense",totalAmount);
    }
});