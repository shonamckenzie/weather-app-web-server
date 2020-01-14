console.log('Client side Javascript file is loaded');

document.addEventListener('DOMContentLoaded', () => {
  const weatherForm = document.querySelector('form')
  weatherForm.addEventListener('submit', handleNewWeatherFormSubmit);
}) 

const handleNewWeatherFormSubmit = (event) => {
  event.preventDefault()

  const search = document.querySelector('input')
  const location = search.value

  fetch(`http://localhost:3000/weather?address=${location}`)
  .then((res) => {
    res.json()
      .then((data) => {
          if (data.error) {
            console.log(data.error)           
          }else {
            console.log(data.location);   
            console.log(data.forecast);
            
          }     
      })
  })
}