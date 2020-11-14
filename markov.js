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
    // TODO
    const chains = {}
    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i]
      if (!chains[word]) {
        chains[word] = []
      }
      if (i === this.words.length - 1) {
        chains[word].push(null)
      } else {
        chains[word].push(this.words[i+1])
      }
    }
    return chains
  }


  /** return random text from chains */

  makeText(numWords=100) {
    let randStart = Math.floor(Math.random() * this.words.length)
    let nextWord = this.words[randStart]
    let randText = `${nextWord}`
    return this.createFullString(numWords, nextWord, randText)
  }

  createFullString(numWords, nextWord, randText) {
    for (let i = 0; i < numWords - 1; i++) {
      let chains = this.makeChains()
      let randNext = Math.floor(Math.random() * chains[nextWord].length)
      nextWord = chains[nextWord][randNext]
      if (nextWord === null) {
        break
      }
      randText += ` ${nextWord}`
    }
    return randText
  }
}

module.exports = {
  MarkovMachine
}

// let mm = new MarkovMachine("the cat in the hat")
// console.log(mm.makeText(100))