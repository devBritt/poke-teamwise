async function deleteFormHandler(event) {
  event.preventDefault();

  // const selectEl = document.querySelector('#team-selector')

  const id = document.querySelector("#team-selector").selectedOptions[0].value;

  const response = await fetch(`/api/team/${id}`, {
    method: "delete",
    body: JSON.stringify({
      team_id: id,
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

document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteFormHandler);
