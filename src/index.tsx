import { createElement, ReactChildren } from 'react';
import tagList from './tagList';

type TTemplateStringList = string[];
type TTemplateExpressionList = (string | ((props: any) => string))[];

type TComp = {
  children: ReactChildren;
  className: string;
  props: any[];
};

function extractClasses(
  strings: TTemplateStringList,
  keys: TTemplateExpressionList,
  props: any
) {
  return strings.reduce((acc, el, i) => {
    const expression = keys[i];

    switch (typeof expression) {
      case 'string':
        return `${acc}${el}${expression}`;

      case 'function':
        const variantClasses = expression(props);
        return `${acc}${el}${variantClasses}`;

      default:
        return `${acc}${el}`;
    }
  }, '');
}

function factory(tag: string) {
  return function parseTemplateString(
    strings: string[],
    ...keys: TTemplateExpressionList
  ) {
    const comp = ({ children, className, ...props }: TComp) => {
      const extractedClasses = extractClasses(strings, keys, props);
      const mergedClasses = `${className || ''} ${extractedClasses}`.trim();

      return createElement(
        tag,
        { className: mergedClasses, ...props },
        children
      );
    };
    Object.defineProperty(comp, 'name', { value: tag, writable: false });

    return comp;
  };
}
type TTypeList = typeof tagList[number];
type TClaxed = {
  [key in TTypeList]: any;
};
const claxed = tagList.reduce((acc, el) => ({ ...acc, [el]: factory(el) }), {});

export default claxed as TClaxed;
