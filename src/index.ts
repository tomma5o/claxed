import {
  createElement,
  cloneElement,
  isValidElement,
  type ComponentClass,
  type ComponentType,
  type FunctionComponent,
  type ReactElement,
  type ReactNode,
} from 'react';
import {
  is,
  cleanClassOutput,
  extractClasses,
  type TemplateKey,
} from './utils';

import tagList, { type ClaxedTag } from './tagList';

export type ClaxedTarget =
  | ClaxedTag
  | ComponentType<Record<string, unknown>>
  | null
  | undefined;

type ClaxedProps = {
  children?: ReactNode;
  className?: string;
  [key: string]: unknown;
};

type TemplateTag = (
  strings: TemplateStringsArray,
  ...keys: TemplateKey[]
) => FunctionComponent<ClaxedProps>;

function factory(tag: ClaxedTarget): TemplateTag {
  return function parseTemplateString(
    strings: TemplateStringsArray,
    ...keys: TemplateKey[]
  ) {
    const ClaxedComponent: FunctionComponent<ClaxedProps> = ({
      children,
      className,
      ...props
    }) => {
      const extractedClasses = extractClasses(strings, keys, props);
      const mergedClasses = cleanClassOutput(
        `${className ?? ''} ${extractedClasses}`
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
        const componentTag = tag as ComponentType<ClaxedProps>;
        let returnedComponent: ReactElement;
        try {
          returnedComponent = (componentTag as FunctionComponent<ClaxedProps>)({
            ...props,
          }) as ReactElement;
        } catch {
          returnedComponent =
            new (componentTag as unknown as ComponentClass<ClaxedProps>)({
              ...props,
            }).render() as ReactElement;
        }

        if (!isValidElement(returnedComponent)) return null;

        // TODO: better naming for className
        const { className: returnedClassName, ...restProps } =
          returnedComponent.props as ClaxedProps;
        return cloneElement(
          returnedComponent,
          {
            ...props,
            className: `${mergedClasses} ${returnedClassName ?? ''}`,
          } as Partial<ClaxedProps>,
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
      value: is.string(tag) ? tag : tag?.displayName,
      writable: false,
    });

    return ClaxedComponent;
  };
}

export type Claxed = ((tag: ClaxedTarget) => TemplateTag) &
  Record<ClaxedTag, TemplateTag>;

const claxed = factory as Claxed;

tagList.forEach((el) => {
  claxed[el] = factory(el);
});

export default claxed;
