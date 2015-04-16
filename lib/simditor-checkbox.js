(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simditor-checkbox', ["jquery","simditor"], function (a0,b1) {
      return (root['SimditorCheckbox'] = factory(a0,b1));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simditor"));
  } else {
    root['SimditorCheckbox'] = factory(jQuery,Simditor);
  }
}(this, function ($, Simditor) {

var SimditorCheckbox,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

SimditorCheckbox = (function(superClass) {
  extend(SimditorCheckbox, superClass);

  SimditorCheckbox.prototype.name = 'checkbox';

  SimditorCheckbox.prototype.icon = 'checkbox';

  SimditorCheckbox.prototype.htmlTag = 'input';

  SimditorCheckbox.prototype.disableTag = 'pre, table';

  function SimditorCheckbox() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    SimditorCheckbox.__super__.constructor.apply(this, args);
    $.extend(this.editor.formatter._allowedAttributes, {
      input: ['type', 'checked']
    });
  }

  SimditorCheckbox.prototype._init = function() {
    SimditorCheckbox.__super__._init.call(this);
    return this.editor.body.on('click', 'input[type=checkbox]', (function(_this) {
      return function(e) {
        var $checkbox;
        $checkbox = $(e.currentTarget);
        return $checkbox.attr('checked', !$checkbox.attr('checked'));
      };
    })(this)).on('keydown', (function(_this) {
      return function(e) {
        if (e.which !== 13) {
          return;
        }
        return _this.editor.one('valuechanged', function() {
          var node;
          node = _this.editor.util.closestBlockEl()[0].previousSibling.firstChild;
          if (node.type === 'checkbox') {
            return _this._insert();
          }
        });
      };
    })(this));
  };

  SimditorCheckbox.prototype.command = function() {
    return this._insert();
  };

  SimditorCheckbox.prototype._insert = function() {
    var checkbox;
    checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    return this.editor.selection.insertNode(checkbox);
  };

  return SimditorCheckbox;

})(Simditor.Button);

Simditor.Toolbar.addButton(SimditorCheckbox);

return SimditorCheckbox;

}));
