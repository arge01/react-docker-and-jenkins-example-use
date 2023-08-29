import { IDataTabel } from "@/services";

export const criteriaText = (operator: number) => {
  switch (operator) {
    case 1:
      return "greaterthan";

    case 2:
      return "lessthan";

    case 3:
      return "equals";

    case 4:
      return "like";

    case 5:
      return "noteq";

    case 6:
      return "in";

    default:
      return "";
  }
};

export const columnText = (key: string, columns: Array<IDataTabel<any>>) => {
  const split = key?.split(".") || [];
  if (split?.[0] && split?.[1]) {
    return columns.find((f) => f.relation?.name === split[0]);
  } else {
    return columns?.find((f) => f.dataField === key);
  }
};
