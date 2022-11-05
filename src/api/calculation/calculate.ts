export default function calculator(input: string) {
  if (!input) {
    return null;
  }
  const str = input.replace(/[^-()\d/*+.]/g, ' ');

  return eval(str);
}
