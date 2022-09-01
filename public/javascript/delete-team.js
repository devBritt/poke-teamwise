async function deleteFormHandler(event) {
  event.preventDefault();

  // const selectEl = document.querySelector('#team-selector')
  
  const id = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  // console.log(id)

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
    alert(response.statusText);
  }

}


document
  .querySelector("#delete-btn")
  .addEventListener("click", deleteFormHandler);
