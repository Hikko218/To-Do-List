const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const inputrow = document.getElementById ("input_row");
const delBtn = document.getElementById ("del-btn");
const sortBtn = document.getElementById ("sort-btn");
const rstBtn = document.getElementById ("rst-btn");
const fltBtn = document.getElementById ("flt-btn");
const dmBtn = document.getElementById("dark-mode");

// load storage after website refresh

window.addEventListener("DOMContentLoaded", () => {
  loadTasksFromServer();

  if (list.children.length > 0) {
    delBtn.style.visibility = "visible";
    fltBtn.style.visibility = "visible";
    rstBtn.style.visibility = "visible";
  }
  if (list.children.length > 1) {
    sortBtn.style.visibility = "visible";
  }
});

//safe task function
async function saveTasksToServer() {
  const tasks = Array.from(list.querySelectorAll("li")).map(li => {
    const text = li.firstChild.textContent.trim();
    const done = li.querySelector("input[type='checkbox']").checked;
    return { text, done };
  });

  await fetch("http://localhost:3000/auth/todos", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token")
    },
    body: JSON.stringify({ tasks })
  });
}

//load tasks function
async function loadTasksFromServer() {
  const res = await fetch("http://localhost:3000/auth/todos", {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token")
    }
  });
  const tasks = await res.json();
}


// delete button function

function removeButtons(...buttons) {
  buttons.forEach(btn => btn?.remove());
}

// add tasks button function

addBtn.addEventListener("click", () => {                      //add task event listener
  const text = input.value.trim();                            //check valid input
  if (text === "") return;

  const li = document.createElement("li");                    //create list element
  li.textContent = text;

  const checkbox = document.createElement ("input")           //create checkbox for list item
  checkbox.type = "checkbox"
  checkbox.className = "tasks"

  checkbox.addEventListener("change" , () =>                  //event listener for line-through
  li.classList.toggle("done"));

  list.appendChild(li);                                       //add to html
  li.appendChild(checkbox);
  input.value = "";                                           //clear previous input

  if (list.children.length > 0 && list.children.length <= 1) {   // show delete, reset, filter button
    delBtn.style.visibility = "visible";
    fltBtn.style.visibility = "visible";
    rstBtn.style.visibility = "visible";
   }

  if (list.children.length > 1 && list.children.length <= 2) {          //add sort button
    sortBtn.style.visibility = "visible";
   }

   saveTasksToServer();
});

// input + enter function

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});


  // Delete Button
  delBtn.addEventListener("click", () => {
    const tasks = list.querySelectorAll("li");
    tasks.forEach(task => {
      const checkbox = task.querySelector("input[type='checkbox']");
      if (checkbox && checkbox.checked) task.remove();
    });
    if (list.children.length === 0) {
      removeButtons(delBtn, rstBtn, fltBtn, sortBtn);
    }
    saveTasksToServer();
  });

  // Sort Button
  sortBtn.addEventListener("click", () => {
    const items = Array.from(list.querySelectorAll("li"));
    items.sort((a, b) => {
      const textA = a.firstChild.textContent.toLowerCase();
      const textB = b.firstChild.textContent.toLowerCase();
      return textA.localeCompare(textB);
    });
    list.innerHTML = "";
    items.forEach(item => list.appendChild(item));
    saveTasks();
  });

  // Reset Button
  rstBtn.addEventListener("click", () => {
    list.innerHTML = "";
    removeButtons(delBtn, rstBtn, fltBtn, sortBtn);
    localStorage.removeItem("todos");
  });

  // Filter Button
  let filtered = false;
  fltBtn.addEventListener("click", () => {
    const tasks = list.querySelectorAll("li");
    tasks.forEach(task => {
      const checkbox = task.querySelector("input[type='checkbox']");
      if (checkbox && checkbox.checked) {
        task.style.display = filtered ? "list-item" : "none";
      } else {
      task.style.display = "list-item"; 
    }
    });
    fltBtn.textContent = filtered ? "Filter" : "Show All";
    filtered = !filtered;
    });


  // dark mode function

  let darkmode = false;

  dmBtn.addEventListener("click", () => {
    const body = document.querySelector("body");
    if(darkmode) {
      body.style.backgroundColor = "#009ba7";
      dmBtn.innerHTML = "dark-mode";
    } else {
      body.style.backgroundColor = "black";
      dmBtn.innerHTML = "light-mode"};
    
      darkmode = !darkmode;
    });
