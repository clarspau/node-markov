/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */


  makeChains() {
    // Initialize a Map to store the Markov chains
    let chains = new Map();

    // Iterate through the array of words
    for (let i = 0; i < this.words.length; i += 1) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      // Check if the word is already in the chains
      if (chains.has(word))
        // If yes, add the next word to its existing array
        chains.get(word).push(nextWord);
      else
        // If not, create a new entry with the current word and an array containing the next word
        chains.set(word, [nextWord]);
    }

    // Save the generated chains in the class instance
    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {

    // Pick a random key from the chains Map
    let keys = Array.from(this.chains.keys());
    let key = MarkovMachine.choice(keys);
    let out = [];

    // Generate random text from the chains Map
    while (out.length < numWords && key !== null) {
      out.push(key);
      key = MarkovMachine.choice(this.chains.get(key));
    }

    // Return the generated text
    return out.join(" ");
  }
}

module.exports = {
  MarkovMachine
};