let form = document.querySelector('.form'); 
const descriptionInp = document.querySelector('.inp_description'); 
const taskInput = document.querySelector('.inp_text'); 
const addCard =  document.querySelector('.card_add');
const cardGroup = document.querySelector('.card-deck'); 
 
let cardList = [
  {
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
    task: "Quisquam animi nemo consectetur nihil excepturi fugiat omnis!",
    id: Math.random(), 
    isEdit: false
  },
  {
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`,
    task: "Quisquam animi nemo consectetur nihil excepturi fugiat omnis!", 
    id: Math.random(), 
    isEdit: false
  },
  {
    description: `Lorem ipsum dolor sit amet, consectetur adipisicing elit.`, 
    task: "Quisquam animi nemo consectetur nihil excepturi fugiat omnis!", 
    id: Math.random(), 
    isEdit: false
  },
]; 

// ===========localStorage function============
const toLS = (item, key) => localStorage.setItem(key, JSON.stringify(item)); 

// ============================================

addCard.addEventListener('click', submitForm); 

function submitForm(e) {

  if(!descriptionInp.value || !taskInput.value){
    e.preventDefault()
    return false
  } else {
    e.preventDefault(); 
    createCard(descriptionInp.value, taskInput.value); 
    descriptionInp.value = ""; 
    taskInput.value = ""; 
    // toLS('arr', cardList)
  }
}

function createCard (description, task) {
  let card = {
    description, 
    task, 
    id: Math.random(), 
    isEdit: false
  }

  cardList.push(card); 
  console.log(cardList)
  toLS(cardList, "arr" )

  let div = document.createElement('div'); 
  div.setAttribute('class', 'col-3 mb-4 main'); 
  div.innerHTML = getTamplate(card); 
  cardGroup.appendChild(div)
  getButton(div)
  getEditButton(div)
}

function renderCards() {
  let get = localStorage.getItem("arr"); 
  let data = JSON.parse(get)

  cardList = data
  
if(!data || data === null){
   emptyTemplate() 
}else {
  data.map( c => {
  let div = document.createElement('div'); 
  div.setAttribute('class', 'col-3 mb-4  main'); 
  div.innerHTML = getTamplate(c); 
  cardGroup.appendChild(div); 
  getButton(div)
 getEditButton(div)
    })
  }
}

function getTamplate(card) {
  const cardTemplate = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title" id="card-title">${card.task}</h5>
          <p class="card-text" id="card-text">${card.description}</p>
          <button class="delete_Task" data-id="${card.id}"><i class="fas fa-minus-circle fa-2x"></i></button>
          <button class="edit_Task" data-edit="${card.isEdit}"> <i class="fas fa-edit fa-2x"></i></button>
        </div>
      </div> ` 

  return cardTemplate
}

function emptyTemplate() {
  const cardTemplate = `
         <div class="card">
          <div class="card-body">
            <h3 class="card-title" id="card-title">У Вас еще нет дел!</h3>
          </div>
        </div> 
  `
  return cardTemplate
}

function getButton(card) {
  let btnsDel = document.querySelectorAll(".delete_Task"); 
  btnsDel = Array.from(btnsDel); 

  btnsDel.forEach( b => b.addEventListener('click', deleteCard))
}

function getEditButton(card) {
   let changeBtn = document.querySelectorAll(".edit_Task"); 
   changeBtn = Array.from(changeBtn); 
   changeBtn.forEach( b => b.addEventListener('click', changeHandler))
}

function deleteCard(event) {
 const b = event.target; 
 if(b.hasAttribute("data-id")){
  let id = b.closest('.delete_Task').dataset; 
   cardList = cardList.filter(c => c.id !== +id.id)
  b.closest('.main').remove()
  toLS(cardList, "arr")
 }else {
   let id = b.parentNode.dataset; 
   cardList = cardList.filter(c => c.id !== +id.id)
  b.closest('.main').remove()
  toLS(cardList, "arr")
 }
 
}

// поставить дизєйбл кнопке

function changeHandler(event){
let closest = event.target.closest('.card-body');
let cardTitle = closest.querySelector('.card-title'); 
let cardDescription = closest.querySelector('.card-text');


  changeTask(event, closest, cardTitle); 
  changeTask(event, closest, cardDescription)
  
}

function changeTask(event, closest, title){
  let txt = title.childNodes[0].nodeValue;
  let btnEdit = closest.querySelector('.edit_Task'); 
  let input = document.createElement('input'); 
  input.setAttribute('type', 'text');
  input.setAttribute('class', 'input'); 
  input.setAttribute('value', `${txt}`);
  btnEdit.setAttribute('disabled', 'disabled')
  closest.appendChild(input)

  input.addEventListener('input', () => title.innerHTML = input.value)
  input.addEventListener('focus', () => input.value = "")
  input.addEventListener('change', () => {
      title.innerHTML = input.value
      input.remove(); 
      btnEdit.removeAttribute('disabled')
  }) 
}

renderCards(); 