import { createElement, cloneElement } from 'react';
import { is, cleanClassOutput, extractClasses } from './utils';

import tagList from './tagList';

function factory(tag) {
  return function parseTemplateString(strings, ...keys) {
    const ClaxedComponent = ({ children, className, ...props }) => {
      const extractedClasses = extractClasses(strings, keys, props);
      const mergedClasses = cleanClassOutput(
        `${className} ${extractedClasses}`
      );

      if (is.nullOrUndefined(tag)) return null;

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

        // TODO: better naming for className
        const { className, ...restProps } = returnedComponent?.props;
        return cloneElement(
          returnedComponent,
          {
            ...props,
            className: `${mergedClasses} ${className}`,
          },
          restProps.children || children
        );
      }

      return null;
    };

    /*
        This Assigns a name to the generated functional component
        for giving a dynamic name based on the `tag` 
      */
    Object.defineProperty(ClaxedComponent, 'name', {
      value: is.string(tag) ? tag : tag.displayName,
      writable: false,
    });

    return ClaxedComponent;
  };
}

tagList.forEach((el) => {
  factory[el] = factory(el);
});

export default factory;
