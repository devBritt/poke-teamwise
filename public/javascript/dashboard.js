// DOM elements for event listeners
const memberTiles = Array.from(document.querySelectorAll('.member-tile'));

// on member tile click
async function membersEventHandler(event) {
    event.preventDefault();
    
    // get game id
    let gameId;
    if (document.querySelector('#team-selector').selectedOptions[0].value === '') {
        gameId = document.querySelector('#team-selector').children[1].ariaValueMax;
    } else {
        gameId = document.querySelector('#team-selector').selectedOptions[0].value;
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

// helper functions
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
    detailsSection.children[1].children[0].innerHTML = formatName(memberDetails.name);
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

// replace member tyle types
function updatePokemonCardTypes(memberTypes, elementToUpdate) {
    let innerHTMLString = '';
    
    // replace elementToUpdate with new innerHTML
    memberTypes.forEach(type => {
        innerHTMLString = innerHTMLString + `<span class="pokemon-type cell auto">${capitalize(type)}</span>`;
    });

    elementToUpdate.innerHTML = innerHTMLString;
}

// display pokemon details
function updatePokemonCard(pokemon) {
    // update name
    console.log(pokemon);
    document.querySelector('#card-name').innerHTML = formatName(pokemon.name);

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
        pEl.innerHTML = formatName(evolution_chain[i].name);

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

// remove formatting from Pokemon names
function removeFormatting(text) {
    return text.split(' ').join('-').toLowerCase();
}

// capitalize first letter of words
function capitalize(text) {
    return text.substring(0, 1).toUpperCase() + text.substring(1);
}

// format Pokemon names
function formatName(text) {
    const splitText = text.split('-');
    let newString = [];

    splitText.forEach(string => {
        newString.push(capitalize(string));
    });

    return newString.join(' ');
}

// event listeners
// create event listener for each member tile
for (let i = 0; i < memberTiles.length; i++) {
    memberTiles[i].children[0].addEventListener('click', membersEventHandler);
}
