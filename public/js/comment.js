console.log("In comment.js");

const newCommentHandler = async (event) => {
  event.preventDefault();
  console.log("hello - in newCommentHandler"); //used for debugging

  const comment = document.querySelector("#comment-content").value;
  const post_id = window.location.toString().split("/").pop();

  console.log(comment);
  console.log(post_id);

  if (comment && post_id) {
    console.log("Inside if, before commnet post req");
    const response = await fetch(`/api/comments`, {
      method: "POST",
      body: JSON.stringify({ comment, post_id }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert("Failed to create Comment");
    }
  } else {
    alert("Please ensure you have written a comment.");
  }
};

const delButtonHandler = async (event) => {
  try {
    const post_id = window.location.toString().split("/").pop();
    const id = event.target.getAttribute("data-id");
    console.log(id);

    const response = await fetch(`/api/comments/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    }
  } catch (err) {
    alert("Failed to delete Post");
  }
};

document.querySelector("#submit").addEventListener("click", newCommentHandler);

document.querySelectorAll("#comment-del").forEach((deleteButton) => {
  deleteButton.addEventListener("click", delButtonHandler);
});
