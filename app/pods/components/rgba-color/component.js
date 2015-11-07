import Ember from 'ember';

export default Ember.Component.extend({
  color: null,
  red: Ember.computed.readOnly('color.r'),
  green: Ember.computed.readOnly('color.g'),
  blue: Ember.computed.readOnly('color.b'),

  alpha: Ember.computed('color.a', function() {
    return this.get('color.a') / 255.0;
  }),

  className: ['Rgba-color'],

  invertedColor: Ember.computed('red', 'green', 'blue', function() {
    return {
      r: 255 - this.get('red'),
      g: 255 - this.get('green'),
      b: 255 - this.get('blue')
    };
  }),

  lightness: Ember.computed('red', 'green', 'blue', function() {
    const red = this.get('red') / 255.0;
    const green = this.get('green') / 255.0;
    const blue = this.get('blue') / 255.0;

    return (0.2126 * (red*red)) +
           (0.7152 * (green*green)) +
           (0.0722 * (blue*blue));
  }),

  useBlackText: Ember.computed('lightness', function() {
    return this.get('lightness') > 0.5;
  })
});
