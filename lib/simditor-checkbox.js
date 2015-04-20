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
      input: ['type', 'checked', 'disabled']
    });
  }

  SimditorCheckbox.prototype._init = function() {
    SimditorCheckbox.__super__._init.call(this);
    this.editor.on('decorate', (function(_this) {
      return function(e, $el) {
        return $el.find('input[type=checkbox]').each(function(i, checkbox) {
          return _this._decorate($(checkbox));
        });
      };
    })(this));
    this.editor.on('undecorate', (function(_this) {
      return function(e, $el) {
        return $el.find('.simditor-checkbox').each(function(i, checkbox) {
          return _this._undecorate($(checkbox));
        });
      };
    })(this));
    this.editor.body.on('click', '.simditor-checkbox', (function(_this) {
      return function(e) {
        var $checkbox, checked;
        e.preventDefault();
        e.stopPropagation();
        $checkbox = $(e.currentTarget);
        checked = !$checkbox.attr('checked');
        return $checkbox.attr('checked', checked).attr('src', _this._getPath(checked));
      };
    })(this));
    return this.editor.body.on('keydown', (function(_this) {
      return function(e) {
        if (e.which !== 13) {
          return;
        }
        return _this.editor.one('valuechanged', function() {
          var node;
          node = _this.editor.util.closestBlockEl()[0].previousSibling;
          if (node.nodeName === 'LI' && $(node.firstChild).hasClass('simditor-checkbox')) {
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
    var $checkbox, path;
    path = this._getPath(false);
    $checkbox = $("<input class='simditor-checkbox' type='image' src=" + path + ">");
    return this.editor.selection.insertNode($checkbox);
  };

  SimditorCheckbox.prototype._decorate = function($checkbox) {
    var $node, checked, path;
    checked = !!$checkbox.attr('checked');
    path = this._getPath(checked);
    $node = $("<input class='simditor-checkbox' type='image' src=" + path + ">");
    $node.attr('checked', checked).attr('disabled', false);
    return $checkbox.replaceWith($node);
  };

  SimditorCheckbox.prototype._undecorate = function($checkbox) {
    var $node, checked;
    checked = !!$checkbox.attr('checked');
    $node = $('<input type="checkbox">');
    $node.attr('checked', checked).attr('disabled', true);
    return $checkbox.replaceWith($node);
  };

  SimditorCheckbox.prototype._getPath = function(checked) {
    var opts;
    opts = $.extend({
      imagePath: 'images'
    }, this.editor.opts.checkbox || {});
    return opts.imagePath.replace(/\/$/, '') + '/' + (checked ? 'simditor-checked.gif' : 'simditor-unchecked.gif');
  };

  return SimditorCheckbox;

})(Simditor.Button);

Simditor.Toolbar.addButton(SimditorCheckbox);

return SimditorCheckbox;

}));
