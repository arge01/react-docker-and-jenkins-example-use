function IntoToArray<MODEL>(leng: number): Array<MODEL> {
  const arr: any = [];
  for (let len = 0; len < leng; len++) {
    arr[len] = len;
  }
  return arr || [];
}

export default IntoToArray;