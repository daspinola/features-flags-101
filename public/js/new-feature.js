document.addEventListener('DOMContentLoaded', init, false);

async function init() {
  const body = document.querySelector('body')
  const spanWelcomeText = document.getElementById('span-welcome-text')
  const showNewButton = await fetch('/feature-flag/random-background-color-button')
    .then(response => response.json())

  if (showNewButton.isEnabled) {
    const newButton = document.createElement('button')

    newButton.id = 'button-switch-background-color'
    newButton.innerHTML = 'Background Color'
    newButton.addEventListener('click', () => {
      body.style.backgroundColor = getRandomColor()
    })

    spanWelcomeText.innerHTML = 'My awesome website has a new button!!!'

    body.appendChild(newButton)
  
    // Taken from the useful reply in: https://stackoverflow.com/questions/1484506/random-color-generator
    function getRandomColor() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]
      }
      return color
    }
  }
}
