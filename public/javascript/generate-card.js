async function generateCardHandler(event) {
    event.preventDefault();

    // const details = documnet.querySelector("#details-btn").value(); 

    // const response = await fetch(`/api/pokemon/${id}`, {
    //     method: 'post',
    // });
    
    // if(response.ok) {
    //     documnet.location.replace("/dashboard");
    // } else {
    //     alert(response.statusText);
    // }
}

document.querySelector("#details-btn").addEventListener("click", generateCardHandler);

