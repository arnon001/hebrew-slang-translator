const inputText = document.getElementById('input-text');
const outputText = document.getElementById('output-text');

inputText.addEventListener('input', () => {
  const sentence = inputText.value;

  fetch('/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ sentence })
  })
  .then(response => response.json())
  .then(data => {
    outputText.value = data.translatedSentence;
  })
  .catch(error => {
    console.error('Error:', error);
  });
});