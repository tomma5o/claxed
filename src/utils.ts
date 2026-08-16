import type { ReactNode } from 'react';

export const is = {
  isOfType(type: string, value: unknown): boolean {
    return typeof value === type;
  },

  undefined(value: unknown): value is undefined {
    return this.isOfType('undefined', value);
  },

  string(value: unknown): value is string {
    return this.isOfType('string', value);
  },

  function_(value: unknown): value is (...args: unknown[]) => unknown {
    return this.isOfType('function', value);
  },

  null_(value: unknown): value is null {
    return value === null;
  },

  nullOrUndefined(value: unknown): value is null | undefined {
    return this.undefined(value) || this.null_(value);
  },
};

function removeSpacesNewline(string: string): string {
  return string.replace(/\n|\s{2,}/g, ' ');
}

function stripFalsyValues(string: string): string {
  return string.replace(/undefined|false|null|NaN/g, '');
}

export function cleanClassOutput(string: string): string {
  return stripFalsyValues(removeSpacesNewline(string));
}

export type TemplateKey =
  | string
  | ((props: Record<string, unknown>) => ReactNode);

export function extractClasses(
  strings: TemplateStringsArray,
  keys: TemplateKey[],
  props: Record<string, unknown>
): string {
  return strings.reduce((acc, el, i) => {
    const expression = keys[i];

    switch (typeof expression) {
      case 'string':
        return `${acc}${el}${expression}`;

      case 'function': {
        const variantClasses = expression(props);
        return `${acc}${el}${variantClasses}`;
      }

      default:
        return `${acc}${el}`.replace(/\s+/g, ' ');
    }
  }, '');
}
