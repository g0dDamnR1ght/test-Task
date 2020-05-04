let form = document.querySelector('.form'); 
const descriptionInp = document.querySelector('.inp_description'); 
const taskInput = document.querySelector('.inp_text'); 
const addCard =  document.querySelector('.card_add');
const cardGroup = document.querySelector('.card-group'); 


console.log(descriptionInp)
console.log(taskInput)
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


function createCard (description, task) {
  let card = {
    description, 
    task, 
    id: Math.random(), 
    isEdit: false
  }

  cardList.push(card); 
  console.log(cardList)

  cardGroup.insertAdjacentHTML('beforeend', getTamplate(card))
}

function renderCard() {
 cardList.map( c => cardGroup.insertAdjacentHTML('beforeend', getTamplate(c)))
}

function getTamplate(card) {
  const cardTemplate = `<div class="card w-75">
        <div class="card-body">
          <h5 class="card-title">${card.task}</h5>
          <p class="card-text">${card.description}</p>
          <button class="delete_Task"><i class="fas fa-minus-circle"></i></button>
          <button class="edit_Task"><i class="fas fa-edit"></i></button>
        </div>
      </div> ` 

  return cardTemplate
}

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

renderCard(); 

// Добавление новых тасков