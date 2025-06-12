const form = document.getElementById("login-form");

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
    // z.B. To-Do-Seite anzeigen oder Token speichern
  } else {
    alert("Login failed");
  }
});
