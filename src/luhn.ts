/**
 * **Luhn algorithm** is a simple check digit formula used to validate a variety of identification numbers
 * @param input
 * @returns
 */
export function luhn(input: string): boolean {
  if (input.length < 2) return false;

  const [checksum, ...payload] = parse(input);

  return getChecksum(payload) == checksum;
}

export function checksum(input: string): number {
  const payload = parse(input);

  return getChecksum(payload);
}

function getChecksum(payload: number[]): number {
  const s = payload.reduce((sum, cur, i) => {
    let digit = cur;
    if (i % 2 == 0) {
      digit += digit;
      if (digit >= 9) digit -= 9;
    }
    return sum + digit;
  }, 0);

  return (10 - (s % 10)) % 10;
}

/**
 * Maps input string into array of numbers in reverse order
 *
 * @param input
 * @returns array of numbers
 */
function parse(input: string): Array<number> {
  return input.split('').map(Number).reverse();
}
