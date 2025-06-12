const form = document.getElementById("login-div");
const todo = document.getElementById("todo-div");
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");

const loggedIn = false;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const res = await fetch("https://3000-Hikko218.github.dev/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: form.username.value,
      password: form.password.value,
    }),
  });

  const data = await res.json();

  if (data.success) {
    alert("Login successful!");
    // ✅ Nach erfolgreichem Login:
    form.style.display = "none";
    todo.style.display = "block";

    loggedIn = true;

  } else {
    alert("Login failed");
  }
});

// Logout button

logoutBtn.addEventListener("click", () => {
  if (loggedIn) {
    loggedIn = false;
    form.style.display = "block";
    todo.style.display = "none";
  }
});
