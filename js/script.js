const app = document.getElementById('root');
const h1 = document.createElement('h1');
const headingContainer = document.createElement('div');
const textareaContainer = document.createElement('div');
const textarea = document.createElement('textarea');
const modal = document.getElementById('myModal');

const wpmContainer = document.getElementById('wpm__container');
const wpm = document.createElement('span');

const wordsTypedContainer = document.getElementById('words__container');
const wordsTyped = document.createElement('span');

const secondsTypingContainer = document.getElementById('seconds-typing__container');
const secondsTyping = document.createElement('span');

const tryAgainBtn = document.getElementById('try-again');
tryAgainBtn.addEventListener('click', () => {
  modal.className += ' hidden';
  modal.classList.remove('shown');

  // set textarea to be empty
  textarea.value = '';
  fetchFact();
})

let startTime = Date.now();

const fetchFact = () => {
  // fetch random fact
  fetch(`https://uselessfacts.jsph.pl/random.json?language=en`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      // add classes and data for fact and container
      headingContainer.setAttribute('class', 'heading__container')
  
      // turn ` into ', remove &nbsp;, remove whitespace at ends
      let refinedData = data.text.replace(/`/gi, `'`).replace(/&nbsp;/gi, '').trim();
      
      h1.textContent = refinedData;
      h1.setAttribute('class', 'heading-primary--sub');

      // add classes and data for textarea and container
      textareaContainer.setAttribute('class', 'textarea__container');
      textarea.setAttribute('placeholder', 'Enter the above text here.');
      textarea.setAttribute('class', 'textarea');
      textarea.setAttribute('id', 'textareaId');

      app.appendChild(headingContainer);

      // dev button to open modal, comment while not in use
      // btn.textContent = 'DEV FINISH';
      // btn.addEventListener('click', () => {
      //   finishedTyping();
      // })

      headingContainer.appendChild(h1);
      app.appendChild(textareaContainer);
      textareaContainer.appendChild(textarea);
    })
    .catch(err => {
      console.log(err);
    })
}

const compareText = (text, length) => {
  let fact = h1.innerHTML;
  let numberOfWords = fact.split(' ').length;
  let userInput = fact.substring(0, length);

  // user starts typing, begin timer
  if (userInput.length === 1) {
    startTime = Date.now();
  }

  if (userInput === text) {
    document.getElementById('textareaId').className += ' highlight-correct';
    document.getElementById('textareaId').classList.remove('highlight-wrong');

    // run finishedTyping() when user is done typing
    if (fact === userInput) {
      finishedTyping(startTime, numberOfWords);
    }
  } else {
    document.getElementById('textareaId').className += ' highlight-wrong';
    document.getElementById('textareaId').classList.remove('highlight-correct');
  }
}

const finishedTyping = (startTime, numberOfWords) => {
  let endTime = Date.now();

  // get difference of time started and ended.
  let timeDifference = endTime - startTime;
  timeDifference /= 1000;

  let seconds = Math.round(timeDifference * 100) / 100;

  let wordsPerSecond = numberOfWords / timeDifference;
  let wordsPerMinute = wordsPerSecond * 60;

  let wordsPerMinuteRounded = Math.round(wordsPerMinute);

  // show modal
  modal.className += ' shown';
  modal.classList.remove('hidden');

  wpm.textContent = wordsPerMinuteRounded;
  wpmContainer.appendChild(wpm);

  wordsTyped.textContent = numberOfWords;
  wordsTypedContainer.appendChild(wordsTyped);

  secondsTyping.textContent = seconds += ' seconds';
  secondsTypingContainer.appendChild(secondsTyping);
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

fetchFact();
