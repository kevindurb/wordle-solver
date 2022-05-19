import * as fs from 'fs/promises';

export const toCharList = (value: string) => value.split('');

export const wordContainsValidChars = (
  word: string,
  validCharactersList: string[],
) =>
  validCharactersList.reduce(
    (result, char) => result && word.includes(char),
    true,
  );

export const wordIsMissingInvalidChars = (
  word: string,
  invalidCharactersList: string[],
) =>
  invalidCharactersList.reduce(
    (result, char) => result && !word.includes(char),
    true,
  );

export const wordMatchesPattern = (word: string, pattern: string) =>
  toCharList(word).reduce(
    (result, char, index) =>
      result && (pattern[index] === '*' || pattern[index] === char),
    true,
  );

export const getDictWordsByLength = async (length: number) => {
  const file = await fs.readFile('/usr/share/dict/words', 'utf8');
  const allWords = file.split('\n');
  return allWords
    .filter((word) => word.length === length)
    .map((word) => word.toUpperCase());
};

export const parseArgs = (argv: string[]) => {
  const [matchPattern, validCharacters, invalidCharacters] = argv.slice(2);

  return {
    matchPattern: (matchPattern ?? '').toUpperCase(),
    validCharacters: toCharList((validCharacters ?? '').toUpperCase()),
    invalidCharacters: toCharList((invalidCharacters ?? '').toUpperCase()),
  };
};

export const getValidCharsFromPattern = (pattern: string) =>
  toCharList(pattern).filter((char) => char !== '*');

export const matchPatternIsValid = (pattern: string) =>
  /^[A-Z\*]+$/.test(pattern);
