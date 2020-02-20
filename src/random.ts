export const getRandomInteger = (max: number) => Math.floor(Math.random() * Math.floor(max));

export default function getRandomIn(min: number, max: number) {
  const cMin = Math.ceil(min);
  const fMax = Math.floor(max);
  return getRandomInteger(fMax - cMin + 1) + min;
}
