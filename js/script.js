const app = document.getElementById('root');
const h1 = document.createElement('h1');
const headingContainer = document.createElement('div');
const textareaContainer = document.createElement('div');
const textarea = document.createElement('textarea');
const modal = document.getElementById('myModal');
const count = document.createElement('p');

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
    // add classes and data for count
    count.setAttribute('class', 'character-count');

    app.appendChild(headingContainer);
    headingContainer.appendChild(h1);
    app.appendChild(textareaContainer);
    textareaContainer.appendChild(textarea);
    textarea.appendChild(count);
  })
  .catch(err => {
    console.log(err);
  })

const compareText = (text, length) => {
  let fact = h1.innerHTML;
  let factCompare = fact.substring(0, length);
  if (factCompare === text) {
    document.getElementById('textareaId').className += ' highlight-correct';
    document.getElementById('textareaId').classList.remove('highlight-wrong');

    // run finishedTyping() when user is done typing
    if (fact === factCompare) {
      finishedTyping();
    }
  } else {
    document.getElementById('textareaId').className += ' highlight-wrong';
    document.getElementById('textareaId').classList.remove('highlight-correct');
  }
}

const finishedTyping = () => {
  console.log(modal);
  modal.className += ' shown';
  modal.classList.remove('hidden');
}

// listen for textarea input
if (textarea.addEventListener) {
  // Chrome, Firefox
  textarea.addEventListener('input', () => {
    compareText(textarea.value, textarea.value.length);
  }, false);
} // IE 
else if (textarea.attachEvent) {
  compareText(textarea.value, textarea.value.length);
}
