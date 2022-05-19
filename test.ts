import assert from 'assert';
import {
  matchPatternIsValid,
  getValidCharsFromPattern,
  wordMatchesPattern,
  wordContainsValidChars,
  wordIsMissingInvalidChars,
} from './lib';

const test = (message: string, test: () => void) => {
  try {
    test();
    console.log(`[PASS] ${message}`);
  } catch (error) {
    console.error(`[FAIL] ${message}`);
    console.error(error);
  }
};

test('wordIsMissingInvalidChars', () => {
  assert(wordIsMissingInvalidChars('klaus', ['z']));
});

test('wordMatchesPattern', () => {
  assert(wordMatchesPattern('klaus', '*l**s'));
});

test('wordContainsValidChars', () => {
  assert(wordContainsValidChars('klaus', ['k', 'l', 's']));
});

test('matchPatternIsValid', () => {
  assert(matchPatternIsValid('**K**'));
});

test('getValidCharsFromPattern', () => {
  assert(getValidCharsFromPattern('**K**').length === 1);
  assert(getValidCharsFromPattern('**K**')[0] === 'K');
});
