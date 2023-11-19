const signupFormHandler = async (event) => {
  event.preventDefault();
  const notification = document.getElementById("notification");

  // Retrieve form data
  const name = this.username.value;
  const password = this.password.value;
  const confirmPassword = this.confirmPassword.value;

  if (password === confirmPassword && name) {
    const response = await fetch("/api/user", {
      method: "POST",
      body: JSON.stringify({ name, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert(response.statusText);
    }
  } else {
    notification.textContent = "Passwords are not the same!";
  }
};
document
  .getElementById("signup-form")
  .addEventListener("submit", signupFormHandler);
