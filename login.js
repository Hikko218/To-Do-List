// Get necessary HTML elements
const form = document.getElementById("login-form");
const todo = document.getElementById("todo-div");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const loginDiv = document.getElementById("login-div");

let loggedIn = false;                     // Track the login state

// Handle login form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();                             // Prevent default form submit behavior

  // Send login data to backend
  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: form.username.value,
      password: form.password.value,
    }),
  });

  const data = await res.json();

   // Check login success
  if (data.success) {
    alert("Login successful!");
    // Hide login form and show the todo section
    loginDiv.style.display = "none";
    todo.style.display = "block";

    loggedIn = true;

  } else {
    alert("Login failed");
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
