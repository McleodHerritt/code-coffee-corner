const deleteEventListener = async (event) => {
  event.preventDefault();
  const postId = document.querySelector("#postId").value.trim();

  const response = await fetch(`/api/post/${postId}`, {
    method: "DELETE",

    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .getElementById("deleteButton")
  .addEventListener("click", deleteEventListener);
