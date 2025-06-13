// Get necessary HTML elements
const form = document.getElementById("login-form");
const todo = document.getElementById("todo-div");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginDiv = document.getElementById("login-div");
const regBtn = document.getElementById("reg-btn");

let loggedIn = false;                     // Track the login state


// Handle register/login
form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const formData = new FormData(e.target);   // Get form input values
  const action   = e.submitter?.value;       // Get which button was clicked: "login" or "register"
  const username = formData.get("username");
  const password = formData.get("password");

  form.reset();         // Clear form fields

  // Choose URL based on action
  const url = action === "login"
    ? "http://localhost:3000/login"
    : "http://localhost:3000/api/register";

    // Send POST request to backend
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })    //Send data as JSON
  });

  const data = await res.json();                    // Parse JSON response from backend

  if (data.success) {
    alert(`${action} successful!`);
    loggedIn = true;
    // Show login again and hide todo section
    loginDiv.style.display = "none";
    todo.style.display = "block";
  } else {
    alert(`${action} failed: ${data.message}`);
  }
});


// Handle logout
logoutBtn.addEventListener("click", () => {
  if (loggedIn) {
    loggedIn = false;
    // Show login again and hide todo section
    loginDiv.style.display = "";
    todo.style.display = "none";
  }
});
