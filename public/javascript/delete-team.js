async function deleteFormHandler(event) {
  event.preventDefault();

  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];

  const response = await fetch(`/api/teams/${id}`, {
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
  .querySelector(".delete-team-btn")
  .addEventListener("click", deleteFormHandler);
