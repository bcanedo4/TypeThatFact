const app = document.getElementById('root');
const h1 = document.createElement('h1');
const headingContainer = document.createElement('div');
const textareaContainer = document.createElement('div');
const textarea = document.createElement('textarea');

// fetch random fact
fetch(`https://uselessfacts.jsph.pl/random.json?language=en`)
  .then(response => {
    return response.json()
  })
  .then(data => {
    

    // add classes and data for fact and container
    headingContainer.setAttribute('class', 'heading__container')
    h1.textContent = data.text;
    h1.setAttribute('class', 'heading-primary--sub');

    // add classes and data for textarea and container
    textareaContainer.setAttribute('class', 'textarea__container');
    textarea.setAttribute('placeholder', 'Enter the above text here.');
    textarea.setAttribute('class', 'textarea');
    textarea.setAttribute('id', 'textareaId');

    app.appendChild(headingContainer);
    headingContainer.appendChild(h1);
    app.appendChild(textareaContainer);
    textareaContainer.appendChild(textarea);
  })
  .catch(err => {
    console.log(err);
  })

// let textarea = document.getElementById('textarea');
if (textarea.addEventListener) {
  textarea.addEventListener('input', () => {
    // Chrome, Firefox
    console.log(textarea.value);
  }, false);
} else if (textarea.attachEvent) {
    console.log('ree', textarea);
}

console.log(textarea);