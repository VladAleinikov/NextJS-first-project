export const useConvertToTime = (num: number): string => {
  return num >= 60
    ? useConvertToTime(Math.trunc(num / 60)) +
        ":" +
        (num % 60 < 10 ? `0${num % 60}` : num % 60)
    : num.toString();
};
