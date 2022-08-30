const startCase = require('lodash/startCase');
module.exports = {
    format_select_options: text => {
        let newText;
        let splitText = startCase(text).split(' ');

        // check for 10,000,000 volt thunderbolt
        if (text === '10-000-000-volt-thunderbolt') {
            newText = '10,000,000 Volt Thunderbolt';
        } else {
            if (splitText[splitText.length - 1] === 'Physical' || splitText[splitText.length - 1] === 'Special') {
                newText = splitText.slice(0, splitText.length - 2).join(' ') + ' - ' + splitText[splitText.length - 1];
            } else {
                newText = splitText.join(' ');
            }
        }
        
        return newText;
    },
    capitalize: text => {
        return startCase(text);
    }
}