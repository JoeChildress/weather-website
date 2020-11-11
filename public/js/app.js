const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const msg1 = document.querySelector('#message-1');
const msg2 = document.querySelector('#message-2');

msg1.textContent = "";
msg2.textContent = "";

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const location = search.value;

    if (location) {
        msg1.textContent = `Loading weather information for ${location}...`
        msg2.textContent = "";

        fetch(`/weather?address=${location}`).then((response) => {
            
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = "Error: " + data.error;
                    msg2.textContent = ""
                    console.log("Error: ", data.error);
                } else {
                    msg1.textContent = data.location;
                    msg2.textContent = data.forecast;
                }
            })
        });
    } else {
        msg1.textContent = "Error: Please enter a location."
    }
})