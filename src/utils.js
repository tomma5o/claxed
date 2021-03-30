export const is = {
  isOfType(type, value) {
    return typeof value === type;
  },

  undefined(value) {
    return this.isOfType('undefined', value);
  },

  string(value) {
    return this.isOfType('string', value);
  },

  function_(value) {
    return this.isOfType('function', value);
  },

  null_(value) {
    return value === null;
  },

  nullOrUndefined(value) {
    return this.isOfType('undefined', value) && this.null_;
  },
};

function removeSpacesNewline(string) {
  return string.replace(/\n|\s{2,}/g, ' ');
}

function stripFalsyValues(string) {
  return string.replace(/undefined|false|null|NaN/g, '');
}

export function cleanClassOutput(string) {
  return stripFalsyValues(removeSpacesNewline(string));
}

export function extractClasses(strings, keys, props) {
  return strings.reduce((acc, el, i) => {
    const expression = keys[i];

    switch (typeof expression) {
      case 'string':
        return `${acc}${el}${expression}`;

      case 'function':
        const variantClasses = expression(props);
        return `${acc}${el}${variantClasses}`;

      default:
        return `${acc}${el}`.replace(/\s+/g, ' ');
    }
  }, '');
}
