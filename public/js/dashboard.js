const form = document.getElementById("newPostForm");
const button = document.getElementById("createButton");
form.style.display = "none";

const formEventListener = (event) => {
  event.preventDefault();
  form.style.display = "block";
  button.style.display = "none";
};

button.addEventListener("click", formEventListener);
