const handlePostUpdate = async (event) => {
  event.preventDefault();

  console.log("postUpdate");
  const postId = document.querySelector("#postId").value.trim();
  const title = document.querySelector("#title").value.trim();
  const content = document.querySelector("#content").value.trim();

  const response = await fetch(`/api/post/${postId}`, {
    method: "PUT",
    body: JSON.stringify({
      title: title,
      content: content,
    }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.replace("/dashboard");
  } else {
    alert(response.statusText);
  }
};

document
  .getElementById("updatePostForm")
  .addEventListener("submit", handlePostUpdate);
