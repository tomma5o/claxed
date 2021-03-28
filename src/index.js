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

function factory(tag) {
  return function parseTemplateString(strings, ...keys) {
    const ClaxedComponent = ({ children, className, ...props }) => {
      const extractedClasses = extractClasses(strings, keys, props);
      const mergedClasses = `${className ?? ''} ${extractedClasses}`.replace(
        /\s+/g,
        ' '
      );

      if (is.nullOrUndefined(tag)) return;

      if (is.string(tag)) {
        return createElement(
          tag,
          { className: mergedClasses, ...props },
          children
        );
      }

      if (is.function_(tag)) {
        let returnedComponent;
        try {
          returnedComponent = tag({ ...props });
        } catch {
          returnedComponent = new tag({ ...props }).render();
        }
        const { className, ...restProps } = returnedComponent?.props;

        return cloneElement(
          returnedComponent,
          {
            ...restProps,
            className: `${extractedClasses} ${className}`,
          },
          restProps.children || children
        );
      }

      return undefined;
    };

    /*
        This Assigns a name to the generated functional component
        for giving a dynamic name based on the `tag` 
      */
    Object.defineProperty(ClaxedComponent, 'name', {
      value: typeof tag === 'string' ? tag : tag.displayName,
      writable: false,
    });

    return ClaxedComponent;
  };
}

tagList.forEach((el) => {
  factory[el] = factory(el);
});

export default factory;
