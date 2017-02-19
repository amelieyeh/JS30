> This is a JavaScript practice with [JavaScript30](https://javascript30.com/) by [Wes Bos](https://github.com/wesbos) without any frameworks, no compilers, no boilerplate, and no libraries.

# 20 - Native Speech Recognition

![](images/20_00.png)

view demo [here](https://amelieyeh.github.io/JS30/20-Speech%20Detection/index.html)

### The `SpeechRecognition`

```
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
```
- [`window.SpeechRecognition`](https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition) is a `Web Speech API`.

- `recognition.interimResults = true;` makes sure that results are available while we are speaking

```
let p = document.createElement('p');
const words = document.querySelector('.words');
words.appendChild(p);
```
- use `document.createElement` to create a paragraph and `append` it to the `.words` div

### Add transcripts

```
recognition.addEventListener('result', e => {
  const transcript = Array.from(e.results)
    .map(result => result[0])
    .map(result => result.transcript)
    .join('');

    const poopScript = transcript.replace(/poop|poo|shit|dump/gi, '💩');
    p.textContent = poopScript;

    if (e.results[0].isFinal) {
      p = document.createElement('p');
      words.appendChild(p);
    }
});

recognition.addEventListener('end', recognition.start);

recognition.start();
```

- add an `eventListener` on `result` event of SpeechRecognition, in the event we will get `e.results` and assign to the `transcript` variable.

- `e.results` is a list **NOT** an array

- each `0th` element of the list is the text data we need, so we have to `map` transcript on `result[0]`

- return `transcript` and `join` everything so that it forms a single string.

- this only works for one paragraph so we need to set `recognition.addEventListener('end', recognition.start)` again

- to avoid the `<p>` get replaced in the DOM, we need to run `createElement` and `appendChild` inside the `result` event again so that it creates a new paragraph instead.

