const editFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#update-post-title").value;
  const desc = document.querySelector("#update-post-desc").value;

  if (title && desc) {
    try {
      const id = event.target.getAttribute("data-id");
      const response = await fetch(`/api/editPost/${id}`, {
        method: "PUT",
        body: JSON.stringify({ title, desc }),
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
