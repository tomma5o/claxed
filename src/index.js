import { createElement, cloneElement } from 'react';
import { is } from './utils';

import tagList from './tagList';

function extractClasses(strings, keys, props) {
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
function factory(tag) {
  return function parseTemplateString(strings, ...keys) {
    const GeneratedComponent = ({ children, className, ...props }) => {
      const extractedClasses = extractClasses(strings, keys, props);
      const mergedClasses = `${className ?? ''} ${extractedClasses}`.replace(
        /\s+/g,
        ' '
      );

      if (is.string(tag)) {
        return createElement(
          tag,
          { className: mergedClasses, ...props },
          children
        );
      }

      if (is.class_(tag)) {
        const returnedComponent = new tag({ ...props }).render();
        const { className, ...restProps } = returnedComponent?.props;

        return cloneElement(
          returnedComponent,
          {
            ...restProps,
            className: `${extractedClasses} ${className}`,
          },
          children
        );
      }

      if (is.function_(tag)) {
        const returnedComponent = tag({ ...props });
        const { className, ...restProps } = returnedComponent?.props;

        console.log(returnedComponent);
        return cloneElement(
          returnedComponent,
          {
            ...restProps,
            className: `${extractedClasses} ${className}`,
          },
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

tagList.forEach((el) => {
  factory[el] = factory(el);
});

export default factory;
