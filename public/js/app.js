console.log('Client side javascript file is loaded!')
// select values from the index hbs file and assign them to variables
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
// there are diff p so assign them ids and access ids
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// what happens on submission...
weatherForm.addEventListener('submit', (e) => {
    // default form behaviour is to reload page and clear data immediately after search. avoid the default behaviour
    e.preventDefault()
// search is defined above as the input
    const location = search.value
// default values for messages after the submit button is clicked
    messageOne.textContent = 'Loading...'
    // setting this to something which is empty helps clear the page of the second line of previous search
    messageTwo.textContent = ''

// fetch the data from all codes into the browser.
// use fetch('http://localhost:3000/weather?address=' + location) instead if not yet deployed
// the new fetch below works for whatever port is working
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                messageTwo.textContent = data.forecast
            }
        })
    })
})