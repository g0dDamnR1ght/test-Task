let form = document.querySelector('.form'); 
const descriptionInp = document.querySelector('.inp_description'); 
const taskInput = document.querySelector('.inp_text'); 
const addCard =  document.querySelector('.card_add');
const cardGroup = document.querySelector('.card-group'); 


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
  div.setAttribute('class', 'col mb-4'); 
  div.innerHTML = getTamplate(card); 
  cardGroup.appendChild(div)
  getButton(div)
}

function renderCards() {
 cardList.map( c => {
  let div = document.createElement('div'); 
  div.setAttribute('class', 'col mb-4'); 
  div.innerHTML = getTamplate(c); 
  cardGroup.appendChild(div); 
  getButton(div)
})
}

function getTamplate(card) {
  const cardTemplate = `
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">${card.task}</h5>
          <p class="card-text">${card.description}</p>
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

// тут костыль, его поправить нужно

function deleteCard(event) {
 const b = event.target; 
 if(b.hasAttribute("data-id")){
  let id = b.parentNode.parentNode.dataset; 
   cardList = cardList.filter(c => c.id !== +id.id)
  b.parentNode.parentNode.remove()
 }else {
   let id = b.parentNode.dataset; 
   cardList = cardList.filter(c => c.id !== +id.id)
  b.parentNode.parentNode.parentNode.remove()
 }
}

function editCard() {

}


renderCards(); 
