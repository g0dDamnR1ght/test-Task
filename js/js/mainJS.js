let form = document.querySelector('.form'); 
const descriptionInp = document.querySelector('.inp_description'); 
const taskInput = document.querySelector('.inp_text'); 
const showPopup = document.querySelector('.showPopup'); 


showPopup.addEventListener('click', getForm); 


const createPopUp = ` <form class="form">
  <div class="form-group d-flex flex-column fr">
     <label for="description_card">description of your card</label>
     <input type="text" class="d-flex justify-content-center align-self-center inp_description"  id="description_card" placeholder=" About your card...">
  </div>

  <div class="form-group d-flex flex-column fr">
     <label for="nameTXT">your task</label>
     <input type="text" class="d-flex justify-content-center align-self-center inp_text" id="nameTXT" placeholder=" Task...">
  </div>
  <div class="btn btn-lg d-flex ">
        <button type="submit" class="card_add"><i class="fas fa-plus-circle"></i></button>
  </div>
</form>`

function getForm() {
	console.log('hello')
}