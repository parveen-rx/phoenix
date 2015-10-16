define(function (require) {
  var d3 = require('d3');

  /**
   * Adds event listeners to DOM elements
   */

  return function events() {
    var listeners = {};
    var processor = function (e) { return e; };
    var element;

    function control(selection) {
      selection.each(function () {
        if (!element) {
          element = d3.select(this);
        }

        d3.entries(listeners).forEach(function (e) {
          // Stop listening for event types that have
          // an empty listeners array or that is set to null
          if (!e.value || !e.value.length) {
            return element.on(e.key, null);
          }

          element.on(e.key, function () {
            d3.event.stopPropagation(); // => event.stopPropagation()

            e.value.forEach(function (listener) {
              listener.call(this, processor(d3.event));
            });
          });
        });
      });
    }

    // Public API
    control.listeners = function (_) {
      if (!arguments.length) return listeners;
      listeners = typeof _ === 'object' ? _ : listeners;
      return control;
    };

    control.processor = function (_) {
      if (!arguments.length) return processor;
      processor = typeof _ === 'function' ? _ : processor;
      return control;
    };

    return control;
  };
});