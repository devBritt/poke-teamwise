
//function to fill team members drop down
function getMembersList() {
    // get member elements
    const membersEl = Array.from(document.querySelectorAll('.member-name'))
    
    //get member selector drop down
    const memberDropDown = document.querySelector('#pokemon-selector');
    
    //fill member selector drop down with member names
    memberDropDown.innerHTML = "<option value=''>Team Members</option>"

    membersEl.forEach(element => {
        //create option element
        const optionEl = document.createElement('option');

        //update option inner HTML with member name
        optionEl.innerHTML = element.innerHTML
        optionEl.value = formatName(element.innerHTML)
        
        //push option to member dropdown :) 
        memberDropDown.appendChild(optionEl); 

    })
}

function formatName(text) {
    return text.split(' ').join('-').toLowerCase();
}

getMembersList();