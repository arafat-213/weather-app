console.log('Client side js is loaded');

// Get the form which user enters the location to search for weather
const weatherForm = document.querySelector('form')

// Gets the input compoment for city
const search = document.querySelector('input')

// Gets the first paragraph from output messages
const messageOne = document.querySelector('#message-1')


// Gets the second paragraph from output messages
const messageTwo = document.querySelector('#message-2')


// Adds an event listener to form to listen for submit event
weatherForm.addEventListener('submit', (event) => {
    // Won't let browser refresh entire page on submit event
    event.preventDefault();

    const city = search.value

    // Shows Loading... just before our result is fetched
    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    // Calls the passed URL and gets the result in json format
    fetch('http://localhost:3000/weather?city=' + city).then((response) => {
        response.json().then((data) => {
            if (data.error)
                messageOne.textContent = data.error
            else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })

})