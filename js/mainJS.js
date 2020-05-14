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

const getData = () => {
  let get = localStorage.getItem("arr"); 
  let data = JSON.parse(get)
  cardList = data

   if(cardList === null) {
    cardList = []; 
  }
}

// ============================================

function submitForm(e) {
e.preventDefault()
  if(!descriptionInp.value || !taskInput.value){
    return false
  } else {
    createCard(descriptionInp.value, taskInput.value); 
    descriptionInp.value = ""; 
    taskInput.value = ""; 
  }
}

function createElem(card){
  let div = document.createElement('div'); 
  div.setAttribute('class', 'col-3 mb-4 main'); 
  div.innerHTML = getTamplate(card); 
  cardGroup.appendChild(div)
  getButton(div)
  getEditButton(div)
}

function createCard (description, task) {
  let card = {
    description, 
    task, 
    id: Math.random(), 
    isEdit: false
  } 

  cardList.push(card); 
  console.log(cardList); 
  toLS(cardList, "arr" )
  createElem(card)
}

function renderCards() {
  getData(); 
  cardList.map( c => createElem(c) )
}

function getTamplate(card) {
  const cardTemplate = `
      <div class="card">
        <div class="card-body" data-cardID=${card.id}>
          <h5 class="card-title" id="card-title">${card.task}</h5>
          <p class="card-description" id="card-text">${card.description}</p>
          <button class="delete_Task" data-id="${card.id}"><i class="fas fa-minus-circle fa-2x"></i></button>
          <button class="edit_Task" data-edit="${card.isEdit}"> <i class="fas fa-edit fa-2x"></i></button>
        </div>
      </div> ` 

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

  function changeHandler(event){
let closest = event.target.closest('.card-body');
let cardTitle = closest.querySelector('.card-title'); 
let cardDescription = closest.querySelector('.card-description');
const attr = closest.getAttribute("data-cardID"); 
const classTask = 'taskInp'; 
const classDescription = 'taskDscr';

  creareNewInput(event, closest, cardTitle, classTask); 
  creareNewInput(event, closest, cardDescription, classDescription); 

const inputTask = document.querySelector('.taskInp'); 
const inputDescription = document.querySelector('.taskDscr'); 
let btnEdit = closest.querySelector('.edit_Task'); 

inputTask.addEventListener('change', () => {
      cardTitle.innerHTML = inputTask.value; 
      changeCardTask(attr, inputTask.value) 
      inputTask.remove(); 
      btnEdit.removeAttribute('disabled')
  }, [{once: true}]) 

inputDescription.addEventListener('change', () => {
      cardDescription.innerHTML = inputDescription.value; 
      changeCardTask(attr, inputTask.value, inputDescription.value); 
      inputDescription.remove(); 
      btnEdit.removeAttribute('disabled')
  }, [{once: true}]) 

changeCardTask(attr, inputTask.value, inputDescription.value); 

}

// переделать изменение текущего инпута 

function creareNewInput(event, closest, title, className){
  let txt = title.childNodes[0].nodeValue;
  let btnEdit = closest.querySelector('.edit_Task');
  let input = document.createElement('input'); 
  input.setAttribute('type', 'text');
  input.setAttribute('class', `${className}`); 
  input.setAttribute('value', `${txt}`);
  btnEdit.setAttribute('disabled', 'disabled')
  closest.appendChild(input)

  input.addEventListener('input', () => title.innerHTML = input.value)
  input.addEventListener('focus', () => input.value = "")
}

function changeCardTask(id, task, description) {
  needCard = cardList.find(c => c.id === +id)
  needCard.task = task
  needCard.description = description

  console.log(needCard.task)
  console.log(needCard.description)
  toLS(cardList, "arr")
  return cardList
}

addCard.addEventListener('click', submitForm); 

renderCards(); 
console.log(cardList)