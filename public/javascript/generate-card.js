async function generateCardHandler(event) {
    event.preventDefault();

    // get selected pokemon name
    const selectEl = document.querySelector('#pokemon-selector');
    const pokemonName = selectEl.selectedOptions[0].value
    //request pokemon details from pokemon API
    const response = await fetch(`/api/pokemon/${pokemonName}`, {
        method: 'post',
        body: JSON.stringify({
            dexId: 30
        }),
        headers: {
            "Content-Type": "application/json",
        }
    });
    const pokemonDetails = await response.json();
    console.log(pokemonDetails); 

    //use pokemon details to generate card
    

}

document.querySelector("#member-form").addEventListener("submit", generateCardHandler);


