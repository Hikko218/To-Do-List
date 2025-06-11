const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const inputrow = document.getElementById ("input_row");
const inputfield = document.getElementById ("todo-input");
const delBtn = document.createElement ("button");
const sortBtn = document.createElement ("button");
const rstBtn = document.createElement ("button");
const fltBtn = document.createElement ("button");

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

  // add delete, reset, filter button

  if (list.children.length > 0 && list.children.length <= 1) { 
    delBtn.id = "del-btn";
    delBtn.textContent = "Delete";
    inputrow.appendChild(delBtn);

    rstBtn.id = "rst-btn";
    rstBtn.textContent = "Reset";
    inputrow.insertBefore(rstBtn, inputfield);

    fltBtn.id = "flt-btn";
    fltBtn.textContent = "Filter";
    inputrow.insertBefore(fltBtn, inputfield);
   }

   //add sort button

  if (list.children.length > 1 && list.children.length <= 2) { 
    sortBtn.id = "sort-btn";
    sortBtn.textContent = "Sort";
    inputrow.appendChild(sortBtn);
   }
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

  //if no list item / delete sort/delete button 

  if (list.children.length === 0) {
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