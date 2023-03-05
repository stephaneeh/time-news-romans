const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector("#post-name").value.trim();
  const description = document.querySelector("#post-desc").value.trim();

  if (title && description) {
    const response = await fetch(`/dashboard`, {
      method: "POST",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to create new post");
    }
  }
};

const updateButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const title = document.querySelector('input[name="post-title"]').value;
    const post_content = document.querySelector('input[name="post-content"]')
      .value;
    const id = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];

    const response = await fetch(`/dashboard/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        title,
        post_content,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert(response.statusText);
    }
  }
};

const delButtonHandler = async (event) => {
  if (event.target.hasAttribute("data-id")) {
    const id = event.target.getAttribute("data-id");
    console.log(id);
    const response = await fetch(`/dashboard/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      document.location.replace("/dashboard");
    } else {
      alert("Failed to delete post");
    }
  }
};

document
  .querySelector(".new-post-form")
  .addEventListener("submit", newFormHandler);

document.querySelectorAll("#update-btn").forEach((item) => {
  item.addEventListener("click", updateButtonHandler);
});

document.querySelectorAll("#delete-btn").forEach((item) => {
  item.addEventListener("click", delButtonHandler);
});
