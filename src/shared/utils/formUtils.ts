import { LabeledValue } from 'antd/lib/select';

export const stringToArray = (param: string): string[] =>
  param.split(', ').map(param => param.trim());

export const arrayToString = (param: string[]): string => param.join(', ');

export const stringToOptions = (param?: string): LabeledValue[] | undefined => {
  if (!param) return;

  return stringToArray(param).map(param => ({
    label: param,
    value: param,
  }));
};

export const collectionToOptions = <T, K extends keyof T>(
  data: T[] | null,
  labelParam: K,
  valueParam: K,
) =>
  data?.map(entity => ({
    label: entity[labelParam],
    value: entity[valueParam],
  }));
