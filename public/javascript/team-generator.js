// DOM elements for event listeners
const memberTiles = Array.from(document.querySelectorAll('.member-tile'));
const memberLocks = Array.from(document.querySelectorAll('.member-lock'));

// event handlers
// on generator form submit
async function formEventHandler(event) {
    event.preventDefault();

    // get game, type, move input from elements
    let gameId = document.querySelector('#game-select').selectedOptions[0].value;
    gameId = gameId.split(',')[0];
    const type = document.querySelector('#type-select').selectedOptions[0].value;
    const move = document.querySelector('#move-select').selectedOptions[0].value;

    // get filtered results
    const pokemonList = await getPokemonList(gameId, type, move);
    
    // get n random pokemon from list
    // TODO: update 6 to be based on unlocked pokemon count
    const randomPicks = getRandomPokemon(pokemonList, 6);
    // update member tiles
    await getTeamDetails(randomPicks, gameId);
}
// on team save submit
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
// on member tile click
async function membersEventHandler(event) {
    event.preventDefault();
    
    // get game id
    let gameId;
    if (document.querySelector('#game-select').selectedOptions[0].value === '') {
        gameId = 30;
    } else {
        gameId = document.querySelector('#game-select').selectedOptions[0].value;
    }
    
    // use event.currentTarget to get pokemon name from target tile
    const name = event.currentTarget.children[1].children[1].children[0].innerHTML;

    // get details for clicked pokemon
    const pokemonDetails = await getDetails(removeFormatting(name), gameId);
    
    // use pokemonDetails to update pokemon card
    updatePokemonCard(pokemonDetails);
    // use details to update evolution chain
    updateEvoChain(pokemonDetails.evolution_chain);
}
// on lock button click
async function locksEventHandler(event) {
    event.preventDefault();

    // TODO: implement locking feature
}

// API calls
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

    return await response.json();
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
    // console.log(await response.json());
    
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
    const typesContainer = detailsSection.children[2];
    updateTypes(memberDetails.types, typesContainer);
}
// replace member tile types
function updateTypes(memberTypes, elementToUpdate) {
    let innerHTMLString = '';
    
    // replace elementToUpdate with new innerHTML
    memberTypes.forEach(type => {
        innerHTMLString = innerHTMLString + `<span class="type cell auto">${capitalize(type)}</span>`;
    });

    elementToUpdate.innerHTML = innerHTMLString;
}
// replace member tile types
function updatePokemonCardTypes(memberTypes, elementToUpdate) {
    let innerHTMLString = '';
    
    // replace elementToUpdate with new innerHTML
    memberTypes.forEach(type => {
        innerHTMLString = innerHTMLString + `<span class="pokemon-type cell auto">${capitalize(type)}</span>`;
    });

    elementToUpdate.innerHTML = innerHTMLString;
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
// display pokemon details
function updatePokemonCard(pokemon) {
    // update name
    document.querySelector('#card-name').innerHTML = formatPokemonName(pokemon.name);

    // update card art
    const pokemonImg = document.querySelector('#official-art-card');
    pokemonImg.src = pokemon.art.official;
    pokemonImg.alt = `Official art for ${pokemon.name}`;

    // update types
    const typesContainer = document.querySelector('#pokemon-types-container');
    updatePokemonCardTypes(pokemon.types, typesContainer);

    // clear pokemon class container
    document.querySelector('.pokemon-class-container').innerHTML = '';
    // update legendary/mythical
    if (pokemon.is_legendary || pokemon.is_mythical) {
        updatePokemonClass(pokemon);
    }

    // update stats
    document.querySelector('#hp').innerHTML = pokemon.stats.hp;
    document.querySelector('#attack').innerHTML = pokemon.stats.attack;
    document.querySelector('#defense').innerHTML = pokemon.stats.defense;
    document.querySelector('#speed').innerHTML = pokemon.stats.speed;
    document.querySelector('#specAtt').innerHTML = pokemon.stats.specAtt;
    document.querySelector('#specDef').innerHTML = pokemon.stats.specDef;
}
// display Pokemon legendary/mythical status
function updatePokemonClass(pokemon) {
    const classContainer = document.querySelector('.pokemon-class-container');
    const pEl = document.createElement('p');

    if (pokemon.is_legendary) {
        pEl.id = 'legendary';
        pEl.innerHTML = 'Legendary';
    } else if (pokemon.is_mythical) {
        pEl.id = 'mythical';
        pEl.innerHTML = 'Mythical';
    }

    classContainer.appendChild(pEl);
}
// display pokemon evolution chain
function updateEvoChain(evolution_chain) {
    const evolutionsContainer = document.querySelector('#evolutions-container');
    // clear evolutions container
    evolutionsContainer.innerHTML = '';

    for (let i = 0; i < evolution_chain.length; i++) {
        // create div element for evolution container
        const divEl = document.createElement('div');
        // create img element for evolution art
        const imgEl = document.createElement('img');
        // create p element for evolution name
        const pEl = document.createElement('p');
        
        // add classes to elements
        divEl.className = 'evolution-container';
        imgEl.className = 'evo-art';
        pEl.className = 'pokemon-name';

        // add img src and alt
        imgEl.src = evolution_chain[i].art_url;
        imgEl.alt = `Official artwork for ${evolution_chain[i].name}`;

        // add innerHTML to p element
        pEl.innerHTML = formatPokemonName(evolution_chain[i].name);

        // append imgEl and pEl to divEl
        divEl.appendChild(imgEl);
        divEl.appendChild(pEl);

        // append divEl to evolutionsContainer
        evolutionsContainer.appendChild(divEl);
        
        // create span for arrow (except on last evo)
        if (i < evolution_chain.length - 1) {
            // create span element for evo arrow
            const spanEl = document.createElement('span');

            // add classes to spanEl
            spanEl.className = 'material-symbols-outlined evo-arrow';

            // add innerHTML to spanEl
            spanEl.innerHTML = 'arrow_downward';

            // append spanEl to evolutionsContainer
            evolutionsContainer.appendChild(spanEl);
        }
    };
}
// lock/unlock member
function toggleMemberLock(element) {

}

document.querySelector('#generator-form').addEventListener('submit', formEventHandler);
document.querySelector('#save-team-form').addEventListener('submit', saveTeamEventHandler);
// create event listener for each member tile
for (let i = 0; i < memberTiles.length; i++) {
    memberTiles[i].children[0].addEventListener('click', membersEventHandler);
}
// create event listener for each member lock
for (let j = 0; j < memberTiles.length; j++) {
    memberLocks[j].children[0].addEventListener('click', locksEventHandler);
}