const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3339;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Load the slang dictionary from JSON file
const slangDictionary = JSON.parse(fs.readFileSync('slang_dictionary.json', 'utf8'));

// Function to translate a sentence
function translateSentence(sentence) {
  const words = sentence.split(' ');
  const translatedWords = words.map(word => {
    const standardWord = slangDictionary[word];
    return standardWord || word;
  });
  return translatedWords.join(' ');
}

// Define a route to handle translation requests
app.post('/translate', (req, res) => {
  const sentence = req.body.sentence;

  const translatedSentence = translateSentence(sentence);

  res.json({ translatedSentence });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});