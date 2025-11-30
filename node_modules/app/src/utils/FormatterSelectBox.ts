import { OptionType } from '@/constants/OptionType';

function FormatterSelectBox(
  data: Array<any>,
  key: string,
  value?: string | undefined,
  values?: Array<string> | undefined,
  trim?: string | undefined,
): Array<OptionType> {
  const convert = data?.map((v) => {
    if (values) {
      return {
        key: v?.[key],
        value: values?.map((d: string, k: number) => {
          if (k + 1 === values.length) {
            return v?.[d];
          } else {
            return v?.[d] + (trim ? trim : ' ');
          }
        }),
      };
    } else {
      return {
        key: v?.[key],
        value: v?.[value || 'name'],
      };
    }
  });

  return convert;
}

export default FormatterSelectBox;
