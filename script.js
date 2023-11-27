const addBox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const closeIcon = document.querySelector("header i");
const addButton = document.querySelector("form button");
const titleTag = document.querySelector('form input');
const descTag = document.querySelector('form textarea');

//getting local storage notes if exist and parsing them to js object Or passing empty array
const notes = JSON.parse(localStorage.getItem("notes") || '[]');

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
});

closeIcon.addEventListener('click', () => {
  popupBox.classList.remove("show");
  titleTag.value = '';
  descTag.value = ''
});

function showNotes() {
  document.querySelectorAll(".note").forEach(note => note.remove());
  notes.forEach(note => {
    let liTag = `<li class="note"> 
                    <div class="details">
                      <p>${note.title}</p>
                      <span>${note.description}</span>
                    </div>
                    <div class="bottom-content">
                      <span>${note.date}</span>
                      <div class="settings">
                        <i class="uil uil-ellipsis-h"></i>
                        <ul class="menu">
                          <li><i class="uil uil-pen"></i>Edit</li>
                          <li><i class="uil uil-trash"></i>Delete</li>
                        </ul>
                      </div>
                    </div>
                  </li>`;
    addBox.insertAdjacentHTML('afterend', liTag);
  });
}

showNotes();

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

    notes.push(noteInfo);
    //save notes to localStorage
    localStorage.setItem("notes", JSON.stringify(notes));
    
    closeIcon.click()
    showNotes()
  }
})