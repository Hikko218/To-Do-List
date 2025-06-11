const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const inputrow = document.getElementById ("input_row");
const delBtn = document.createElement ("button");
const sortBtn = document.createElement ("button");
const rstBtn = document.createElement ("button");
const fltBtn = document.createElement ("button");
const dmBtn = document.getElementById("dark-mode");

// add button function

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

  if (list.children.length > 0 && list.children.length <= 1) {   // add delete, reset, filter button
    delBtn.id = "del-btn";
    delBtn.className = "button"
    delBtn.textContent = "Delete";
    inputrow.appendChild(delBtn);

    rstBtn.id = "rst-btn";
    rstBtn.textContent = "Reset";
    rstBtn.className = "button"
    inputrow.insertBefore(rstBtn, input);

    fltBtn.id = "flt-btn";
    fltBtn.textContent = "Filter";
    fltBtn.className = "button"
    inputrow.insertBefore(fltBtn, input);
   }

  if (list.children.length > 1 && list.children.length <= 2) {          //add sort button
    sortBtn.id = "sort-btn";
    sortBtn.className = "button"
    sortBtn.textContent = "Sort";
    inputrow.appendChild(sortBtn);
   }
});

// input + enter function

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addBtn.click();
});

  // delete button function

delBtn.addEventListener("click", () => {
 const tasks = list.querySelectorAll("li");
 tasks.forEach(task => {
  const checkbox = task.querySelector("input[type='checkbox']");
  if (checkbox && checkbox.checked) {
    task.remove();
  }
  }); 

  if (list.children.length === 0) {         //if no list item / delete sort/delete button
    delBtn.remove();
    if (sortBtn) sortBtn.remove();
    if (rstBtn) rstBtn.remove();
    if (fltBtn) fltBtn.remove();
  }
});

  // sort button function

  sortBtn.addEventListener("click", () => {
    const items = Array.from(list.querySelectorAll("li"));

    items.sort ((a, b) => {
      const textA = a.firstChild.textContent.toLowerCase();
      const textB = b.firstChild.textContent.toLowerCase();
      return textA.localeCompare(textB);
    });

    list.innerHTML = "";
    items.forEach(item => list.appendChild(item));
});

  // reset button function

  rstBtn.addEventListener("click", () => {
    const items = list.querySelectorAll("li");
    items.forEach (item => item.remove());
    rstBtn.remove();
    fltBtn.remove();
    delBtn.remove();
    sortBtn.remove();
  });

   // filter button function

  let filtered = false;

  fltBtn.addEventListener("click", () => {
    const tasks = list.querySelectorAll("li");
    tasks.forEach(task => {
    const checkbox = task.querySelector("input[type='checkbox']");
    if (checkbox && checkbox.checked) {
    task.style.display = filtered ? "list-item" : "none" ;
    }
    });
    fltBtn.textContent = filtered ? "Filter" : "Show All"
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
