const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");
const inputrow = document.getElementById ("input_row");
const delBtn = document.createElement ("button");
const sortBtn = document.createElement ("button");

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

  // add delete button

  if (list.children.length > 0 && list.children.length <= 1) { 
    delBtn.id = "del-btn";
    delBtn.textContent = "Delete";
    inputrow.appendChild(delBtn);
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
    document.getElementById("del-btn").remove();
    if (sortBtn) sortBtn.remove();
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