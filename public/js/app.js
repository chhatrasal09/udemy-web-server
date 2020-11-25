console.log("Client side javascript file is loaded.")

// fetch('http://localhost:3000/weather?address=Boston').then(response => {
//     response.json().then(data => {
//         console.log(data)
//         if (data.error) {

//         } else {

//         }
//     })
// }).catch(error => {
//     console.log(error)
// })

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()
    messageOne.textContent = 'Loading...'
    fetch('http://localhost:3000/weather?address=' + search.value).then(response => {
        response.json().then(data => {
            if (data.error) {
                messageOne.textContent = data.error;
            } else {
                messageOne.textContent = data.summary
            }
        })
    }).catch(error => {
        console.log(error)
    })
})