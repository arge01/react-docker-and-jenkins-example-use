function CompareWithObject(o: object, c: any): any {
  const n: any = {...o};
  if(typeof c === "object") {
    for (const [key] of Object.entries(o)) {
      if(Object.keys(c).find((f: any) => f === key)) {
        n[key] = c[key];
      }
    }
  }

  return n;
};

export default CompareWithObject;