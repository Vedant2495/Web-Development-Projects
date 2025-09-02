document.addEventListener("DOMContentLoaded",()=>{
    let buttonAddList = document.getElementById("btnAddList");
    let input = document.getElementById("input");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(task => {
        renderTask(task);
    });

    buttonAddList.addEventListener("click",()=>{
        let inputText = input.value.trim();

        let obj = {
            id: Date.now(),
            text: inputText,
        }

        tasks.push(obj);

        addStorage();

        renderTask(obj);

        input.value = "";
        

        console.log(tasks);
    });

    function addStorage(){
        let data = JSON.stringify(tasks);
        localStorage.setItem("tasks",data);
    }

    function renderTask(task){
        console.log(task.text);

        let li = document.createElement("li");
        li.innerHTML =`<span>
                ${task.text}
                <button>Delete</button>
        </span>
        `;

        li.querySelector('button').addEventListener("click",function(e){
            e.stopPropagation();
            tasks = tasks.filter(t => t.id != task.id);
            addStorage();
        });

        document.getElementById("workList").appendChild(li);

        

    }

    
    
})