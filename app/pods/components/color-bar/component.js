import Ember from 'ember';

const range = function(size) {
  return Array.apply(null, new Array(size)).map(function(_, i) {return i;});
};

export default Ember.Component.extend({
  tagName: 'canvas',
  attributeBindings: ['height', 'width'],
  height: 360,
  width: 30,

  canvasContext: Ember.computed(function() {
    const canvas = this.$()[0];
    const context = canvas.getContext('2d');
    return context;
  }).volatile(),

  drawCanvas: Ember.on('didInsertElement', function() {
    const height = this.get('height');
    const width = this.get('width');
    const context = this.get('canvasContext');

    context.clearRect(0, 0, height, width);

    range(height).forEach((line) => {
      context.fillStyle = `hsl(${line},100%,50%)`;
      context.fillRect(0, line, width, 1);
    });
  }),

  mouseMove: function(event) {
    let mouseX, mouseY;

    if (event.offsetX) {
      mouseX = event.offsetX;
      mouseY = event.offsetY;
    }
    else {
      mouseX = event.layerX;
      mouseY = event.layerY;
    }

    const context = this.get('canvasContext');
    const data = context.getImageData(mouseX, mouseY, 1, 1).data;

    this.attrs['on-change-color']({
      r: data[0],
      g: data[1],
      b: data[2],
      a: data[3]
    });
  },

});
