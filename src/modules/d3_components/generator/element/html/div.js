define(function (require) {
  var base = require('d3_components').layout.base;

  /**
   * Returns a configurable function that sets attributes on
   * data objects to create a layout for chart(s).
   * Available layouts => 'rows', 'columns', 'grid'
   */

  return function div() {
    var cssClass = 'chart';
    var type = 'rows';
    var size = [500, 500];

    function generator(selection) {
      selection.each(function (data) {
        // Appends divs based on the data array
        var layout = base().type(type).size(size);

        var div = d3.select(this).selectAll('div')
          .data(layout(data));

        // Exit
        div.exit().remove();

        // Enter
        div.enter().append('div');

        // Update
        div
          .attr('class', cssClass)
          .style('position', 'absolute')
          .style('left', function (d) { return d.dx + 'px'; })
          .style('top', function (d) { return d.dy + 'px'; })
          .style('width', function (d) { return d.width + 'px'; })
          .style('height', function (d) { return d.height + 'px'; });
      });
    }

    // Sets css class on div(s)
    generator.class = function (_) {
      if (!arguments.length) return cssClass;
      cssClass = _;
      return generator;
    };

    // Layout types => 'rows', 'columns', 'grid'
    generator.layout = function (_) {
      if (!arguments.length) return type;
      type = _;
      return generator;
    };

    // Parent element size, [width, height]
    generator.size = function (_) {
      if (!arguments.length) return size;
      size = _;
      return generator;
    };

    return generator;
  };
});