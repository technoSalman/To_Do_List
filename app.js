"use strict";
const form =      document.getElementById("form");
const textInput = document.getElementById("textInput");
const dateInput = document.getElementById("dateInput");
const textArea =  document.getElementById("textarea");
const message  =  document.getElementById("msg");
const tasks   =   document.getElementById("tasks");
const addTask =   document.getElementById("add");
const resetData = document.getElementById("resetData");

let characterCounter = document.getElementById("char_count");
const maxNumOfChars = 1000;

const countCharacters = () => {
  let numOfEnteredChars = textArea.value.length;
  let counter = maxNumOfChars - numOfEnteredChars;
  characterCounter.textContent = counter + "/100";

  if (counter < 10) {
    characterCounter.style.color = "red";
} else if (counter < 20 && counter >= 10) {
    characterCounter.style.color = "orange";
} else {
    characterCounter.style.color = "black";
}
};

textArea.addEventListener("input", countCharacters);

let taskList = JSON.parse(localStorage.getItem("taskList")) || [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  formValidation();
});

dateInput.addEventListener("click", function(){
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    if(dd < 10){
        dd = '0' + dd;
    }
    if(mm < 10){
        mm = '0' + mm;
    }
    today = yyyy+'-'+mm+'-'+dd;
    dateInput.setAttribute("min", today)

})
//Form validation
let formValidation = (e) => {
     
  if (textInput.value === "" || dateInput.value === "" || textArea.value === "") {
    
    message.innerHTML = "Input Field Required";
    e.preventDefault();
  } else {
    message.innerHTML = "";
 
    addFormData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
  } 
  (() => {
    add.setAttribute("data-bs-dismiss", "");
  })();
  clearForm();
};


//Add new data to local Storage

let addFormData = () => {
  taskList.push({
    title: textInput.value,
    date: dateInput.value,
    description: textArea.value,
    more: true,
  });
  localStorage.setItem("taskList", JSON.stringify(taskList));
  createNewTask();
};
function lessThanFunction(x) {
  
   taskList[x].more = !taskList[x].more;  
   createNewTask()
}
// function showLessFunction() {
//   createNewTask();
// }


//Create a new task
function createNewTask() {
  tasks.innerHTML = "";
  taskList.length > 0 &&
    taskList.map((x, y) => {  //x is task(object) and y is index(number) of that task
   
      if (x.more) {
        
        var description =
          x.description.length > 40
            ? `${x.description.slice(
                0,
                40
              )}<button id=${y} class="moreBtn" onclick={lessThanFunction(this.id)}>more</button>`
            : x.description;
            }
     
      if (!x.more) {
        var description =
          x.description.length > 40
            ? ` ${x.description}<button id=${y} class="moreBtn" onclick={lessThanFunction(this.id)}>less</button>`
            : x.description.slice(0, 40);
      }

      return (tasks.innerHTML += `
    <div class="task-container" id=${y}>
    <span class="fw-bold">${x.title}</span>
    <span class="small text-secondary">${x.date}</span>
    <p class="descText">${description}
    <span class="show-more"></span>
    </p>
    <span class="options">
      <i onClick= "editTask(this)"  id=${y} data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
      <i onClick ="deleteTask(${y}); createNewTask()" id=${y} class="fas fa-trash-alt"></i>
    </span>
    </div>
`);
    });
  clearForm();
}
createNewTask();


//Delete a task

let deleteTask = (y) => {
  new swal({
    title: "Are you sure?",
    text: "Do you want to delete this task!",
    type: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085D6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      taskList.splice(y, 1);
      localStorage.setItem("taskList", JSON.stringify(taskList));
      createNewTask(taskList);
      new swal("Deleted!", "Your file has been deleted.", "success");
    } else return;
  });
};


//Edit Fnctionality
function editTask(e) {
  textInput.value = taskList[e.id].title;
  dateInput.value = taskList[e.id].date;
  textArea.value = taskList[e.id].description;
  taskList.splice(taskList[e.id], 1);
  addTask.addEventListener("onClick", function (e) {
    taskList[e.id].date = dateInput.value;
    taskList[e.id].description = textArea.value;

    localStorage.setItem("taskList", JSON.stringify(taskList));
    
  });
  
//clear Form

}
function clearForm() {
  textInput.value = "";
  dateInput.value = "";
  textArea.value = "";
}

resetData.addEventListener("click", function(){
  localStorage.clear();
  taskList = localStorage
  createNewTask();
})

function clearBtnHide(){
  if(taskList != []){
    resetData.style.display = "block";
  }
  else{
    resetData.style.display = "none";
  }
}



//Task: use scroll on cards instead of entire container
//Task: Form should not reset on invalid input submission.
//Task: Add a clear button on right top which should show up only if taskList is not empty
//Task: 1000 character limit in description show a counter that counts words 
//Task: put more button after a word.
