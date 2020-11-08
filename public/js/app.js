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
        fetch(`http://api.weatherstack.com/current?access_key=7a9429cce317426c7f66e90440902dfc&query=${location}&units=f`).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    msg1.textContent = "Error: " + data.error.code + " " + data.error.info;
                    msg2.textContent = ""
                    console.log("Error: ", data.error);
                } else {
                    const weatherIcon = document.createElement('img');
                    weatherIcon.src = data.current.weather_icons[0];
                    msg1.textContent = location + " ";
                    msg1.appendChild(weatherIcon);
                    msg2.textContent = `${data.request.query}: ${data.current.weather_descriptions[0]}, ${data.current.temperature}f`;
                }
            })
        });


    } else {
        msg1.textContent = "Error: Please enter a location."
    }
})