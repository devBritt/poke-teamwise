async function updateTeamHandler(event) {
  event.preventDefault();
  
  // replace dropdown with input element
  createInputEl();
  
  // switch edit button with save button
  showSaveBtn();
  hideUpdateBtn();
}

async function updateTeamNameHandler(event) {
    event.preventDefault();

    const teamId = document.querySelector('#new-team-name').class;
    const teamName = document.querySelector('#new-team-name').value;
    
    const response = await fetch(`/api/team/${teamId}`, {
        method: "put",
        body: JSON.stringify({
            team_name: teamName
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

// create input element
function createInputEl() {
    // get selected team name
    const currentName = document.querySelector('#team-selector').selectedOptions[0].innerHTML;
    const teamId = document.querySelector('#team-selector').selectedOptions[0].value
    
    // create input element
    const inputEl = document.createElement('input');

    // add attributes
    inputEl.type = 'text';
    inputEl.name = 'new-team-name';
    inputEl.class = teamId;
    inputEl.id = 'new-team-name';
    inputEl.value = currentName;

    // get label element to update
    const labelEl = document.querySelector('#team-title');

    // update label text
    labelEl.innerHTML = 'New Team Name';

    // append inputEl to labelEl
    labelEl.appendChild(inputEl);
}

function showSaveBtn() {
    const saveBtn = document.querySelector('#save-team-name-btn');

    saveBtn.className = 'cell auto button btn';
}

function hideUpdateBtn() {
    const updateBtn = document.querySelector('#update-btn');

    updateBtn.className = 'cell auto button btn hide';
}

document
.querySelector("#update-btn")
.addEventListener("click", updateTeamHandler);

document.querySelector('#save-team-name-btn').addEventListener('click', updateTeamNameHandler);

// hide save button on load
document.querySelector('#save-team-name-btn').className = 'cell auto button btn hide';
