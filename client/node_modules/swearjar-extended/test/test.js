const assert = require('assert');
const swearjar = require('../lib/swearjar-node');

describe('swearjar.profane', () => {
  it('should should detect bad words', () => {
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('fuck you john doe'), true);
  });

  it('should detect uppercase bad words', () => {
    assert.equal(swearjar.profane('FUCK you john doe'), true);
  });

  it('should detect mixedcase bad words', () => {
    assert.equal(swearjar.profane('FuCk you john doe'), true);
  });
});

describe('swearjar.addRegex', () => {
  it('should should detect bad words', () => {
    swearjar.addRegex('addedword?\\b', ['detected']);
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('addedword you john doe'), true);
  });

  it('should should detect bad words, word exist', () => {
    swearjar.addRegex('hard ons?\\b', ['detected']);
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('hard ons you john doe'), true);
    assert.deepEqual(swearjar.words('hard ons you john doe'), {
      'hard ons': [
        'sexual',
        'detected',
      ],
    });
  });

  it('should should detect bad words, categories string', () => {
    swearjar.addRegex('addedword?\\b', 'detected');
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('addedword you john doe'), true);
  });

  it('should detect uppercase bad words', () => {
    swearjar.addRegex('addedword?\\b', ['detected']);
    assert.equal(swearjar.profane('ADDEDWORD you john doe'), true);
  });

  it('should detect mixedcase bad words', () => {
    swearjar.addRegex('addedword?\\b', ['detected']);
    assert.equal(swearjar.profane('addeDworD you john doe'), true);
  });
});

describe('swearjar.addSimple', () => {
  it('should should detect bad words', () => {
    swearjar.addSimple('addedword', ['detected']);
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('addedword you john doe'), true);
  });

  it('should should detect bad words, word exist', () => {
    swearjar.addSimple('anus', ['detected']);
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('anus you john doe'), true);
    assert.deepEqual(swearjar.words('anus you john doe'), {
      anus: [
        'sexual',
        'detected',
      ],
    });
  });

  it('should should detect bad words, categories string', () => {
    swearjar.addSimple('addedword', 'detected');
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('addedword you john doe'), true);
  });

  it('should detect uppercase bad words', () => {
    swearjar.addSimple('addedword', ['detected']);
    assert.equal(swearjar.profane('ADDEDWORD you john doe'), true);
  });

  it('should detect mixedcase bad words', () => {
    swearjar.addSimple('addedword', ['detected']);
    assert.equal(swearjar.profane('addeDworD you john doe'), true);
  });
});

describe('swearjar.addEmoji', () => {
  it('should should detect bad words', () => {
    swearjar.addEmoji('1f596', ['detected']);
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('1f596 you john doe'), true);
  });

  it('should should detect bad words, word exist', () => {
    swearjar.addEmoji('1f595', ['detected']);
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('1f596 you john doe'), true);
    assert.deepEqual(swearjar.words('1f595 you john doe'), {
      '1f595': [
        'insult',
        'detected',
      ],
    });
  });

  it('should should detect bad words, categories string', () => {
    swearjar.addEmoji('1f596', 'detected');
    assert.equal(swearjar.profane('i love you john doe'), false);
    assert.equal(swearjar.profane('1f596 you john doe'), true);
  });

  it('should detect uppercase bad words', () => {
    swearjar.addEmoji('1f596', ['detected']);
    assert.equal(swearjar.profane('1F596 you john doe'), true);
  });

  it('should detect mixedcase bad words', () => {
    swearjar.addEmoji('1f596', ['detected']);
    assert.equal(swearjar.profane('1F596 you john doe'), true);
  });
});

describe('swearjar.censor', () => {
  it('should remove bad words', () => {
    assert.equal(swearjar.censor('fuck you john doe bitch'), '**** you john doe *****');
  });

  it('should handle edgecases', () => {
    assert.equal(swearjar.censor("Assasin's Creed Ass"), "Assasin's Creed ***");
    assert.equal(swearjar.censor("Assasin's Creed\nAss"), "Assasin's Creed\n***");
  });
});

describe('swearjar.scorecard', () => {
  it('should count bad words and categorize them', () => {
    assert.deepEqual(swearjar.scorecard('fuck you john doe'), {
      sexual: 1,
    });

    assert.deepEqual(swearjar.scorecard('fuck you john doe bitch fuck'), {
      sexual: 2,
      insult: 1,
    });
  });
});

describe('swearjar.words', () => {
  it('should return bad words and their categories', () => {
    assert.deepEqual(swearjar.words('fuck you john doe'), { fuck: ['sexual'] });

    assert.deepEqual(swearjar.words('fuck you john doe bitch fuck'), { fuck: ['sexual'], bitch: ['insult'] });
  });
});

describe('swearjar.detailedProfane', () => {
  it('should count bad words and categorize them and censor the text', () => {
    assert.deepEqual(swearjar.detailedProfane('fuck you john doe'), {
      categoryCount: {
        sexual: 1,
      },
      censored: '**** you john doe',
      profane: true,
      wordCount: {
        fuck: 1,
      },
      words: {
        fuck: [
          'sexual',
        ],
      },
    });

    assert.deepEqual(swearjar.detailedProfane('fuck you john doe bitch fuck'), {
      categoryCount: {
        insult: 1,
        sexual: 2,
      },
      censored: '**** you john doe ***** ****',
      profane: true,
      wordCount: {
        bitch: 1,
        fuck: 2,
      },
      words: {
        bitch: [
          'insult',
        ],
        fuck: [
          'sexual',
        ],
      },
    });
  });
});

describe('should handle object properties', () => {
  it('should not return "should" as profane', () => {
    Object.defineProperty(Object.prototype, 'should', {
      set() {
      },
      get() {
        return this;
      },
      configurable: true,
    });

    assert.equal(swearjar.profane('this should not be profane'), false);
  });
});
