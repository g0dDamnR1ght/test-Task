let btnShow = document.querySelector(".show_btn");
let tasks = document.querySelectorAll(".tasks");
let btnDelete = document.querySelectorAll(".delete_Task");
let btnEdit = document.querySelectorAll(".edit_Task");
let btnAdd= document.querySelector('.card_add');

let inp = document.querySelectorAll('form input');

let form = document.querySelector('form');


let taskList = [];


function addTask(description, name) {
    // console.log(description,name)
    let task = {
        description,
        name, 
        id: Date.now()
    };


    taskList.push(task);


    let row = document.querySelector('.task_list');
    let div = document.createElement("div");
    div.setAttribute("class", "col tasks ");
    div.innerHTML = `
    <div class="card d-flex justify-content-between" data-key="${task.id}">
    <div class="card_title">
        <h3>${task.description}</h3>
    </div>
    <div class="card_body">
        <p>${task.name}</p>
    </div> 
        <div class="btn-group ">
            <button class="delete_Task"><i class="fas fa-minus-circle"></i></button>
            <button class="edit_Task"><i class="fas fa-edit"></i></button>
        </div>
    </div>
`;
    row.appendChild(div);
}
let text = function(){
   for(let i = 0; i < inp.length; i++){
       return inp[i].values
    }
}

console.log(text);

form.addEventListener("submit", function (e){
    e.preventDefault();
    for(let i = 0; i < inp.length; i++){
         if(inp[i].value === ""){
             inp[i].classList.add("error");
         }
         else if(inp[i].value !== ""){
            inp[i].classList.remove("error");
         }

    }
    const inputsArr = [].slice.call(document.querySelectorAll('form input'));
    const values = inputsArr.map(item => item.value);
        addTask(...values);
 });


function arr(){
    return Array.from(tasks);
}
let arrTask = arr();

btnShow.addEventListener('click', (e) => {
    for(let i = 0; i < arrTask.length; i++ ){
        arrTask[i].classList.toggle("hide");
    }
});

for(let i=0; i < btnDelete.length; i++ ){
    btnDelete.addEventListener('click', (e) => {
        if(event.target.classList.contain('tasks')){
            deleteTask(itemKey); 
        } 
    })
}

 

function deleteTask(key){
    taskList = taskList.filter(task => task.id !== Number(key)); 
    let list = document.querySelector(`[data-key='${key}`); 
    list.remove();    
}




// по клику на кнопку - должны удаляться таски
// по клику на кнопку редактировать должен редактироваться текст
