async function updateTeamHandler(event) {
  event.preventDefault();

  const id = document.querySelector('#team-selector').selectedOptions[0].value
  console.log(id)

  const response = await fetch(`/api/team/${id}`, {
      method: "put",
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
  .querySelector("#update-btn")
  .addEventListener("click", updateTeamHandler);
