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
