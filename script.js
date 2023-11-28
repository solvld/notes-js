const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const addButton = document.querySelector("form button");
const titleTag = document.querySelector('form input');
const descTag = document.querySelector('form textarea');
const popupTitle = document.querySelector('header p')

//getting local storage notes if exist and parsing them to js object Or passing empty array
const notes = JSON.parse(localStorage.getItem("notes") || '[]');

let isUpdate = false;
let updateId;

const months = ["January",
                "February",
                "March", 
                "April", 
                "May", 
                "June",
                "July", 
                "August", 
                "September",
                "October", 
                "November", 
                "December"]

addBox.addEventListener('click', () =>{
  popupBox.classList.add("show");

  //title input will be focused when popup opened
  titleTag.focus();
});

closeIcon.addEventListener('click', () => {
  popupBox.classList.remove("show");
  titleTag.value = '';
  descTag.value = '';
	popupTitle.innerHTML = 'Add new Note'
  addButton.innerHTML = 'Add Note'
});

function showNotes() {
  isUpdate = false;
  document.querySelectorAll(".note").forEach(note => note.remove());
  notes.forEach((note, index) => {
    let liTag = `<li class="note"> 
                    <div class="details">
                      <p>${note.title}</p>
                      <span>${note.description}</span>
                    </div>
                    <div class="bottom-content">
                      <span>${note.date}</span>
                      <div class="settings">
                        <i onClick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                          <li onClick="updateNote(${index}, '${note.title}', '${note.description}')"><i class="uil uil-pen"></i>Edit</li>
                          <li onClick="deleteNote(${index})"><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                      </div>
                    </div>
                  </li>`
    addBox.insertAdjacentHTML('afterend', liTag);
  });
}

//function for render each note
showNotes();

//function for show menu onClick settings button
function showMenu(elem) {
  elem.parentElement.classList.add('show');
  document.addEventListener('click', e => {
    if (e.target.tagName != 'I' || e.target != elem ){
      elem.parentElement.classList.remove('show')
    }
  })
};

//function for remove note onClick "delete" button
function deleteNote(noteId) {
  notes.splice(noteId, 1);
  //updating local storage
  localStorage.setItem('notes', JSON.stringify(notes));
  //updating show notes list
  showNotes();
};

//function for updating current note onClick "edit" button
function updateNote(noteId, title, description) {
  isUpdate = true;
  updateId = noteId;
  addBox.click();
  addButton.innerHTML = "Update Note";
  popupTitle.innerHTML = "Update Note";
  titleTag.value = title;
	descTag.value = description;

}

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let noteDesc = descTag.value;

  if (noteTitle || noteDesc){
    let dateObject = new Date(),
    month = months[dateObject.getMonth()],
    day = dateObject.getDate(),
    year = dateObject.getFullYear();

    let noteInfo = {
      'title': noteTitle,
      'description': noteDesc,
      'date': `${month} ${day}, ${year}`
    };

    if (!isUpdate){
      notes.push(noteInfo);
    }else {
      isUpdate = false;
      notes[updateId] = noteInfo; //update current note
    }
    
    //save notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
    
    closeIcon.click()
    showNotes()
  }
})