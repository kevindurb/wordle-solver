import {
  parseArgs,
  matchPatternIsValid,
  getValidCharsFromPattern,
  getDictWordsByLength,
  wordMatchesPattern,
  wordContainsValidChars,
  wordIsMissingInvalidChars,
} from './lib';

(async (argv: string[]) => {
  const { matchPattern, validCharacters, invalidCharacters } = parseArgs(argv);

  const combinedValidChars = [
    ...validCharacters,
    ...getValidCharsFromPattern(matchPattern),
  ];

  if (!matchPatternIsValid(matchPattern)) {
    throw new Error(`"${matchPattern}" is not a valid match pattern`);
  }

  console.log('--- Arguments ---');
  console.log('Match Pattern:', matchPattern);
  console.log('Valid Characters:', combinedValidChars);
  console.log('Invalid Characters:', invalidCharacters);
  console.log('-----------------');

  const allWords = await getDictWordsByLength(matchPattern.length);

  const possibleMatches = allWords.filter(
    (word) =>
      wordMatchesPattern(word, matchPattern.toUpperCase()) &&
      wordContainsValidChars(word, combinedValidChars) &&
      wordIsMissingInvalidChars(word, invalidCharacters),
  );

  console.log('\nPossible Matches:');
  console.log(possibleMatches.join('\n'));
})(process.argv);
