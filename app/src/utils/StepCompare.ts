export function StepCompare(object1: object, object2: object): boolean {
  const object3: any = typeof object2 === 'object' ? object2 : {};
  if (typeof object1 === 'object') {
    for (const [key, value] of Object.entries(object1)) {
      if (value?.length) {
        return true;
      } else {
        object3[key] = value;
      }
    }

    const object1Keys = Object.keys(object1)?.sort();
    const object3Keys = Object.keys(object3)?.sort();

    return JSON.stringify(object1Keys) === JSON.stringify(object3Keys);
  } else {
    return false;
  }
}
