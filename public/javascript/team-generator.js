// event handlers
async function formEventHandler(event) {
    event.preventDefault();

    // get game, type, move input from elements
    const gameId = document.querySelector('#game-select').selectedOptions[0].value;
    const type = document.querySelector('#type-select').selectedOptions[0].value;
    const move = document.querySelector('#move-select').selectedOptions[0].value;

    // get filtered results
    const pokemonList = await getPokemonList(gameId, type, move);

    // get n random pokemon from list
    // TODO: update 6 to be based on unlocked pokemon count
    const randomPicks = getRandomPokemon(pokemonList, 6);
    
    // update member tiles
    getTeamDetails(randomPicks, gameId);
}

async function saveTeamEventHandler(event) {
    event.preventDefault();

    // get game
    let gameId;
    if (document.querySelector('#game-select').selectedOptions[0].value === '') {
        gameId = 30;
    } else {
        gameId = document.querySelector('#game-select').selectedOptions[0].value;
    }
    // get team name
    const teamName = document.querySelector('#team-name').value;
    // get team members
    const members = getMembers();
    
    // save team
    const teamId = await saveTeam(teamName, gameId);
    
    // save members
    for (let i = 0; i < members.length; i++) {
        await saveMember(members[i], teamId);
    }
}

// async function rosterEventHandler(event) {
//     event.preventDefault();

//     // check event target member-lock or member-tile click
//     if (event.target.classList.includes('lock-icon')) {
//         console.log('lock icon clicked');
//     } else if (event.target.classList.includes('member-tile')) {
//         console.log('member tile clicked');
//     }
// }

// get member details
async function getDetails(pokemon, gameId) {
    const response = await fetch(`/api/pokemon/${pokemon}`, {
        method: 'POST',
        body: JSON.stringify({
            dexId: gameId
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    return response.json();
}
// display pokemon details
async function updatePokemonCard(pokemon, element) {
    // TODO: display selected pokemon details
}
// retrieve pokemon list
async function getPokemonList(game, type, move) {
    const response = await fetch('/api/pokemon', {
        method: 'POST',
        body: JSON.stringify({
            dexId: game,
            type: type,
            move: move
        }),
        headers: { 'Content-Type': 'application/json'}
    });

    return response.json();
}
// save team to DB
async function saveTeam(teamName, gameId) {
    // use teamName and gameId to save team to db
    const response = await fetch('/api/team', {
        method: 'POST',
        body: JSON.stringify({
            teamName,
            gameId
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
        console.log(`${teamName} saved successfully`);
        const teamData = await response.json();
        return teamData.id;
    } else {
        console.log(response.statusText);
    }
}
// save member to DB
async function saveMember(memberName, teamId) {
    console.log(memberName, teamId);

    // use teamName and gameId to save team to db
    const response = await fetch('/api/member', {
        method: 'POST',
        body: JSON.stringify({
            memberName,
            teamId
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    
    if (response.ok) {
        console.log(`${memberName} saved successfully`);
    } else {
        console.log(response.statusText);
    }
}

// helper functions
// pick random pokemon
function getRandomPokemon(pokemonList, num) {
    const randomPicks = [];
    const pokeArr = Array.from(pokemonList);

    for (let i = 0; i < num; i++) {
        // get random index number
        const randomIndex = Math.floor(Math.random() * (pokeArr.length - 1));

        // add pokemon at random index to randomPicks array
        randomPicks.push(pokeArr[randomIndex]);

        // remove used pokemon from array
        pokeArr.splice(randomIndex, 1);
    }

    return randomPicks;
}
// retreive current team members
function getMembers() {
    const membersArr = Array.from(document.querySelectorAll('.member-name'));
    const formattedArr = [];

    membersArr.forEach(name => {
        formattedArr.push(removeFormatting(name.innerHTML));
    });

    return formattedArr;
}
// add details to member tiles
async function getTeamDetails(newTeamArr, gameId) {
    const membersDetails = [];
    // get member name html element
    const currentMemberNames = Array.from(document.querySelectorAll('.member-name'));

    for (let i = 0; i < newTeamArr.length; i++) {
        let inUse = false;
        const newMember = newTeamArr[i];
        
        for (let j = 0; j < currentMemberNames.length; j++) {
            if (newMember === currentMemberNames[j].innerHTML.toLowerCase()) {
                inUse = true;
            }
        }

        if (!inUse) {
            const response = await getDetails(newMember, gameId);
            
            membersDetails.push(response);
        }
    }
    
    // update member tiles using membersDetails
    membersDetails.forEach((member, index) => {
        updateMemberTile(member, index + 1);
    });
}
// replace member tile details
function updateMemberTile(memberDetails, memberNum) {
    // get element to be updated
    const artSection = document.querySelector(`#member-${memberNum}`).children[0];
    const detailsSection = document.querySelector(`#member-${memberNum}`).children[1];
    
    // use details from memberDetails to update sprite, dex number, name, and types
    // update sprite url
    artSection.children[0].src = memberDetails.art.sprite;
    // update dex number
    detailsSection.children[0].children[0].innerHTML = '#' + memberDetails.dexNum;
    // update name
    detailsSection.children[1].children[0].innerHTML = formatPokemonName(memberDetails.name);
    // update types
    updateTypes(memberDetails.types, detailsSection);
}
// replace member tile types
function updateTypes(memberTypes, elementToUpdate) {
    let innerHTMLString = '';
    
    // replace elementToUpdate with new innerHTML
    memberTypes.forEach(type => {
        innerHTMLString = innerHTMLString + `<span class="type cell auto">${capitalize(type)}</span>`;
    });

    elementToUpdate.children[2].innerHTML = innerHTMLString;
}
// remove formatting from Pokemon names
function removeFormatting(text) {
    return text.split(' ').join('-').toLowerCase();
}
// capitalize first letter of words
function capitalize(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}
// format Pokemon names
function formatPokemonName(text) {
    const splitText = text.split('-');
    let newString = [];

    splitText.forEach(string => {
        newString.push(capitalize(string));
    });

    return newString.join(' ');
}
// lock/unlock member
function toggleMemberLock(element) {

}

document.querySelector('#generator-form').addEventListener('submit', formEventHandler);
document.querySelector('#save-team-form').addEventListener('submit', saveTeamEventHandler);