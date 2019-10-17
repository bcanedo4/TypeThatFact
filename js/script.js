const app = document.getElementById('root');

const factContainer = document.createElement('div')
factContainer.setAttribute('class', 'fact__container');

app.appendChild(factContainer);

// fetch random fact
fetch(`https://uselessfacts.jsph.pl/random.json?language=en`)
  .then(response => {
    return response.json()
  })
  .then(data => {
    const h1 = document.createElement('h1');
    h1.textContent = data.text;

    factContainer.appendChild(h1);
  })
  .catch(err => {
    console.log(err);
  })