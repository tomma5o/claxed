import {
  createElement,
  cloneElement,
  FunctionComponent,
  ComponentClass,
} from 'react';
import is from '@sindresorhus/is';

import { TTemplateExpressionList, TComp, TClaxed } from './types';

import tagList from './tagList';

function extractClasses(
  strings: TemplateStringsArray,
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

// TODO: Add theme feature
function factory(tag: string | FunctionComponent<any> | ComponentClass<any>) {
  return function parseTemplateString(
    strings: TemplateStringsArray,
    ...keys: TTemplateExpressionList
  ) {
    const GeneratedComponent = ({
      children,
      className,
      ...props
    }: TComp): JSX.Element | undefined => {
      const extractedClasses = extractClasses(strings, keys, props);
      const mergedClasses = `${className ?? ''} ${extractedClasses}`.trim();

      if (is.string(tag)) {
        return createElement(
          tag,
          { className: mergedClasses, ...props },
          children
        );
      }

      if (is.class_(tag)) {
        const test = new tag({ ...props }).render();

        return cloneElement(
          //@ts-ignore
          test,
          //@ts-ignore
          { className: `${extractedClasses} ${test?.props.className}` },
          children
        );
      }

      if (is.function_(tag)) {
        const test = tag({ ...props });

        return cloneElement(
          //@ts-ignore
          test,
          { className: `${extractedClasses} ${test?.props.className}` },
          children
        );
      }

      return undefined;
    };

    if (is.nullOrUndefined(tag)) return;

    /*
        This Assigns a name to a generated functional component
        for giving a dynamic name based on the `tag` 
      */
    Object.defineProperty(GeneratedComponent, 'name', {
      value: typeof tag === 'string' ? tag : tag.displayName,
      writable: false,
    });

    return GeneratedComponent;
  };
}

// let claxed = factory;

tagList.forEach(el => {
  //@ts-ignore
  factory[el] = factory(el);
});
// Object.setPrototypeOf(
//   claxed,
//   tagList.reduce((acc, el) => ({ ...acc, [el]: factory(el) }), {})
// );

export default factory as TClaxed & (() => any);
