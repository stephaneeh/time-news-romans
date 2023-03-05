console.log("Hello in editPost.js");

const editFormHandler = async (event) => {
  event.preventDefault();
  console.log("Helllo i am here....");

  const title = document.querySelector("#update-post-title").value;
  const desc = document.querySelector("#update-post-desc").value;

  if (title && desc) {
    try {
      console.log("This is title" + title);
      console.log("This is desc" + desc);

      const id = event.target.getAttribute("data-id");
      const response = await fetch(`/api/editPost/${id}`, {
        method: "PUT",
        body: JSON.stringify({
          title,
          desc,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        document.location.replace("/dashboard/");
      }
    } catch (err) {
      console.log(err);
      alert("Error updating post");
    }
  } else {
    alert("This isn't working");
  }
};

document.querySelector("#submit").addEventListener("click", editFormHandler);
