const app = document.getElementById('root');

// fetch random fact
fetch(`https://uselessfacts.jsph.pl/random.json?language=en`)
  .then(response => {
    return response.json()
  })
  .then(data => {
    const h1 = document.createElement('h1');
    const textarea = document.createElement('textarea');

    // add classes and data for fact
    h1.textContent = data.text;
    h1.setAttribute('class', 'heading-primary--main');

    // add classes and data for textarea
    textarea.setAttribute('placeholder', 'Enter the above text here.');
    textarea.setAttribute('class', 'textarea');

    app.appendChild(h1);
    app.appendChild(textarea);
  })
  .catch(err => {
    console.log(err);
  })