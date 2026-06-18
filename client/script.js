console.log("script loaded");

document.addEventListener("DOMContentLoaded", () => {
  fetch("http://127.0.0.1:5555/events")
    .then(res => res.json())
    .then(events => {
      events.forEach(renderEvent);
    });
});

document.querySelector("form").addEventListener("submit", (e) => {
  e.preventDefault();

  const titleInput = document.querySelector("#title");
  const title = titleInput.value;

  if (!title) return;

  fetch("http://127.0.0.1:5555/events", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title })
  })
    .then(res => res.json())
    .then(event => {
      renderEvent(event);
      titleInput.value = "";
    });
});

function renderEvent(event) {
  const li = document.createElement("li");
  li.textContent = event.title;
  document.querySelector("#event-list").appendChild(li);
}
