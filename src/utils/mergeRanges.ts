export const mergeRanges = (ranges: number[]) => {
  const result: string[] = [];
  let temp = ranges[0];
  ranges.forEach((item, index) => {
    if (item + 1 !== ranges[index + 1]) {
      if (temp !== item) {
        result.push(`U+${temp.toString(16)}-${item.toString(16)}`)
      } else {
        result.push(`U+${item.toString(16)}`)
      }
      temp = ranges[index + 1]
    }
  });
  return result.join(',');
}