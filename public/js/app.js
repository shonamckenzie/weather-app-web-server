console.log('Client side Javascript file is loaded');

document.addEventListener('DOMContentLoaded', () => {
  const weatherForm = document.querySelector('form')
  weatherForm.addEventListener('submit', handleNewWeatherFormSubmit);
}) 

const handleNewWeatherFormSubmit = (event) => {
  event.preventDefault()

  const search = document.querySelector('input')
  const location = search.value
  const messageOne = document.querySelector('#message-1')
  const messageTwo = document.querySelector('#message-2')

  messageOne.textContent = 'Loading...'
  messageTwo.textContent = ''
  
  fetch(`http://localhost:3000/weather?address=${location}`)
  .then((res) => {
    res.json()
      .then((data) => {
          if (data.error) {
            messageOne.textContent = data.error      
          }else {
            messageOne.textContent = data.location   
            messageTwo.textContent = data.forecast        
          }     
      })
  })
}