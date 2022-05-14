import { useCallback } from 'react';

/*
  hook for working with BEM

  Examples:

  const bem = useBem('ComponentBlockName')

  className={bem()}  -> className={'ComponentBlockName'}

  bem('elementName')  -> 'ComponentBlockName__elementName'

  bem('elementName', {redModifier: true }) -> ' ComponentBlockName__elementName  ComponentBlockName__elementName_redModifier'

  bem('elementName', ['greenModifier']) -> ' ComponentBlockName__elementName  ComponentBlockName__elementName_greenModifier'
*/

type BemElement = string;
type BemModifiers = { [key: string]: boolean } | string[];

export const useBem = (
  block: string,
): ((element?: BemElement, modifiers?: BemModifiers) => string) => {
  return useCallback(
    (element?: BemElement, modifiers?: BemModifiers): string => {
      if (element === undefined) {
        return block;
      }

      const elementName = `${block}__${element}`;

      if (modifiers === undefined) {
        return elementName;
      }

      const modifierName = (Array.isArray(modifiers)
        ? modifiers
        : Object.keys(modifiers).filter(modifier => modifiers[modifier])
      )
        .map(modifier => `${elementName}_${modifier}`)
        .join(' ');

      return [elementName, modifierName].join(' ');
    },
    [block],
  );
};
