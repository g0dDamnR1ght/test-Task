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

  let div = document.createElement('div'); 
  div.setAttribute('class', 'col mb-4 main'); 
  div.innerHTML = getTamplate(card); 
  cardGroup.appendChild(div)
  getButton(div)
  getEditButton(div)
}

function renderCards() {
 cardList.map( c => {
  let div = document.createElement('div'); 
  div.setAttribute('class', 'col-3 mb-4 align-self-center'); 
  div.innerHTML = getTamplate(c); 
  cardGroup.appendChild(div); 
  getButton(div)
 getEditButton(div)
})
}

function getTamplate(card) {
  const cardTemplate = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title" id="card-title">${card.task}</h5>
          <p class="card-text" id="card-text">${card.description}</p>
          <button class="delete_Task" data-id="${card.id}"><i class="fas fa-minus-circle fa-2x"></i></button>
          <button class="edit_Task" data-edit="${card.isEdit}"><i class="fas fa-edit fa-2x"></i></button>
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

// тут костыль, его поправить нужно

function deleteCard(event) {
 const b = event.target; 
 if(b.hasAttribute("data-id")){
  let id = b.parentNode.parentNode.dataset; 
   cardList = cardList.filter(c => c.id !== +id.id)
  b.parentNode.parentNode.parentNode.remove()
 }else {
   let id = b.parentNode.dataset; 
   cardList = cardList.filter(c => c.id !== +id.id)
  b.parentNode.parentNode.parentNode.parentNode.remove()
 }
}

function changeHandler(){
  changeTask(event); 
  changeDecription(event); 
}

function changeTask(event){
let closest = event.target.closest('.card-body'); 
let txt = closest.querySelector('.card-title').childNodes[0].nodeValue;

  let input = document.createElement('input'); 
  input.setAttribute('type', 'text'); 
  input.setAttribute('value', `${txt}`);
  closest.appendChild(input)

  input.addEventListener('input', () => closest.querySelector('.card-title').innerHTML = input.value)
  input.addEventListener('focus', () => input.value = "")
  input.addEventListener('change', () => {
      closest.querySelector('.card-title').innerHTML = input.value
    input.remove(); 
  })
  
}

 function changeDecription(event) {
  let closest = event.target.closest('.card-body'); 
  let txt = closest.querySelector('.card-text').childNodes[0].nodeValue; 

  let input = document.createElement('input'); 
  input.setAttribute('type', 'text'); 
  input.setAttribute('value', `${txt}`)
  closest.appendChild(input)
  
  input.addEventListener('input', () => closest.querySelector('.card-text').innerHTML = input.value)
  input.addEventListener('focus', () => input.value = "")
  input.addEventListener('change', () => {
    closest.querySelector('.card-text').innerHTML = input.value
    input.remove(); 
  })
}


renderCards(); 
