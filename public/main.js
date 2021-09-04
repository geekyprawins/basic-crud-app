const updateButton = document.querySelector("#update-button");
const deleteButton = document.querySelector("#delete-button");
const messageDiv = document.querySelector("#message");

updateButton.addEventListener("click", (_) => {
  // PUT request
  fetch("/quotes", {
    method: "put",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Thanos",
      quote: "Perfectly balanced, as all things should be!",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      //   console.log(response);

      window.location.reload(true);
    });
});

deleteButton.addEventListener("click", (_) => {
  fetch("/quotes", {
    method: "delete",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Thanos",
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((data) => {
      if (data === "No quote to delete") {
        messageDiv.textContent = "Thanos has been snapped already! ";
      } else {
        window.location.reload(true);
      }
    });
});
