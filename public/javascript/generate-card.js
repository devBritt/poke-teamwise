async function generateCardHandler(event) {
    event.preventDefault();

    const details = documnet.querySelector("#details-btn").value(); 
    console.log(details);

}

document.querySelector("#details-btn").addEventListener("submit", generateCardHandler);

