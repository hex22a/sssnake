export const getRandomInteger = max => Math.floor(Math.random() * Math.floor(max));

export default function getRandomIn(min, max) {
  const cMin = Math.ceil(min);
  const fMax = Math.floor(max);
  return getRandomInteger(fMax - cMin + 1) + min;
}
