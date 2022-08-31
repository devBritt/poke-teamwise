async function deleteFormHandler(event) {
  event.preventDefault();

  const selectEl = doucment.querySelector('#team-selector')

  const response = await fetch(`/api/teams/${team_name}`, {
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
    alaert(response.statusText);
  }
}

document
  .querySelector("#team-form")
  .addEventListener("click", deleteFormHandler);
