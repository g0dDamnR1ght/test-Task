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
  const cardTemplate = ` <div class="card">
    <div class="card-header">
      ${card.task}
    </div>
    <div class="card-body">
      <blockquote class="blockquote mb-0">
        <p>${card.description}</p>
      </blockquote>
    </div>
  </div>` 

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