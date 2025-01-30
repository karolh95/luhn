import { checksum, luhn } from './luhn';

describe('Luhn', () => {
  describe('luhn', () => {
    it('should have min length of 2', () => {
      const result = luhn('1');

      expect(result).toBeFalsy();
    });

    const Valid: Array<string> = [
      '17893729974',
      '87193729974',
      '87193727994',
      '87193797294',
    ];

    it.each(Valid)('"%s" should be valid', (input) => {
      const result = luhn(input);

      expect(result).toBeTruthy();
    });

    const Invalid: Array<string> = [
      '17893729970',
      '17893729971',
      '17893729972',
      '17893729973',
    ];

    it.each(Invalid)('"%s" should be invalid', (input) => {
      const result = luhn(input);

      expect(result).toBeFalsy();
    });
  });

  describe('checksum', () => {
    type TestCase = [string, number];
    const Inputs: Array<TestCase> = [['1789372997', 4]];

    it.each(Inputs)(
      'checksum of "%s" should be equal to %d',
      (input, expected) => {
        const result = checksum(input);

        expect(result).toEqual(expected);
      },
    );
  });

  describe('Luhn - generated', () => {
    const digits = 10 ** 11;
    const Inputs: Array<string> = Array(100)
      .fill(1)
      .map(() => {
        const payload = `${Math.floor(Math.random() * digits)}`;
        return `${payload}${checksum(payload)}`;
      });

    it.each(Inputs)('"%s" should be valid', (input) => {
      const result = luhn(input);

      expect(result).toBeTruthy();
    });
  });
});
