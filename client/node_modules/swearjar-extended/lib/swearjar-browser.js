// swearjar
const swearjar = {

  _badWords: {},

  scan(text, callback) {
    let word;
    let key;
    let match;
    const
      notMatchedText = [];
    let regex = /\w+/g;

    while ((match = regex.exec(text)) != null) {
      word = match[0];
      key = word.toLowerCase();

      if (key in this._badWords.simple && Array.isArray(this._badWords.simple[key])) {
        if (callback(word, match.index, this._badWords.simple[key], key, 'simple') === false) {
          break;
        }
      } else if (key in this._badWords.emoji && Array.isArray(this._badWords.emoji[key])) {
        if (callback(word, match.index, this._badWords.emoji[key], key, 'emoji') === false) {
          break;
        }
      } else {
        notMatchedText.push(key);
      }
    }

    const joinedText = notMatchedText.join(' ');
    for (const regexString in this._badWords.regex) {
      regex = new RegExp(regexString, 'g');
      while ((match = regex.exec(joinedText)) != null) {
        word = match[0];

        if (word) {
          if (callback(word, match.index, this._badWords.regex[regexString], regexString, 'regex') === false) {
            break;
          }
        }
      }
    }
  },

  profane(text) {
    let profane = false;

    this.scan(text, (word, index, categories) => {
      profane = true;
      return false; // Stop on first match
    });

    return profane;
  },

  scorecard(text) {
    const scorecard = {};

    this.scan(text, (word, index, categories) => {
      for (let i = 0; i < categories.length; i += 1) {
        const cat = categories[i];

        if (cat in scorecard) {
          scorecard[cat] += 1;
        } else {
          scorecard[cat] = 1;
        }
      }
    });

    return scorecard;
  },

  words(text) {
    const words = {};

    this.scan(text, (word, index, categories) => {
      words[word] = categories;
    });

    return words;
  },

  censor(text) {
    let censored = text;

    this.scan(text, (word, index, categories) => {
      censored = censored.substr(0, index)
                + word.replace(/\S/g, '*')
                + censored.substr(index + word.length);
    });

    return censored;
  },

  detailedProfane(text) {
    let censored = text;
    let profane = false;
    const words = {};
    const categoryCount = {};
    const wordCount = {};

    this.scan(text, (word, index, categories) => {
      profane = true;

      censored = censored.substr(0, index)
                + word.replace(/\S/g, '*')
                + censored.substr(index + word.length);
      words[word] = categories;
      for (let i = 0; i < categories.length; i += 1) {
        const cat = categories[i];

        if (cat in categoryCount) {
          categoryCount[cat] += 1;
        } else {
          categoryCount[cat] = 1;
        }
        if (word in wordCount) {
          wordCount[word] += 1;
        } else {
          wordCount[word] = 1;
        }
      }
    });

    return {
      censored, profane, categoryCount, wordCount, words,
    };
  },

  setBadWords(badWords) {
    this._badWords = badWords || {};
  },

  addRegex(word, categories) {
    const categoryArray = Array.isArray(categories) ? categories : [categories];
    if (word in this._badWords.regex) {
      this._badWords.regex[word] = this._badWords.regex[word].concat(categoryArray);
    } else {
      this._badWords.regex[word] = categoryArray;
    }
  },
  addSimple(word, categories) {
    const categoryArray = Array.isArray(categories) ? categories : [categories];
    if (word in this._badWords.simple) {
      this._badWords.simple[word] = this._badWords.simple[word].concat(categoryArray);
    } else {
      this._badWords.simple[word] = categoryArray;
    }
  },
  addEmoji(word, categories) {
    const categoryArray = Array.isArray(categories) ? categories : [categories];
    if (word in this._badWords.emoji) {
      this._badWords.emoji[word] = this._badWords.emoji[word].concat(categoryArray);
    } else {
      this._badWords.emoji[word] = categoryArray;
    }
  },
};

swearjar._badWords = require('./config/en_US.json');

module.exports = swearjar;
