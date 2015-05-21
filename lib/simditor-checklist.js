(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('simditor-checklist', ["jquery","simditor"], function (a0,b1) {
      return (root['ChecklistButton'] = factory(a0,b1));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("jquery"),require("simditor"));
  } else {
    root['ChecklistButton'] = factory(jQuery,Simditor);
  }
}(this, function ($, Simditor) {

var ChecklistButton,
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty,
  slice = [].slice;

ChecklistButton = (function(superClass) {
  extend(ChecklistButton, superClass);

  ChecklistButton.prototype.type = 'ul.simditor-checklist';

  ChecklistButton.prototype.name = 'checklist';

  ChecklistButton.prototype.icon = 'checklist';

  ChecklistButton.prototype.htmlTag = 'li';

  ChecklistButton.prototype.disableTag = 'pre, table';

  function ChecklistButton() {
    var args;
    args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
    ChecklistButton.__super__.constructor.apply(this, args);
    if ('input' && $.inArray('input', this.editor.formatter._allowedTags) < 0) {
      this.editor.formatter._allowedTags.push('input');
    }
    $.extend(this.editor.formatter._allowedAttributes, {
      input: ['type', 'checked']
    });
  }

  ChecklistButton.prototype._init = function() {
    ChecklistButton.__super__._init.call(this);
    this.editor.on('decorate', (function(_this) {
      return function(e, $el) {
        return $el.find('ul > li input[type=checkbox]').each(function(i, checkbox) {
          return _this._decorate($(checkbox));
        });
      };
    })(this));
    this.editor.on('undecorate', (function(_this) {
      return function(e, $el) {
        return $el.find('.simditor-checklist > li').each(function(i, node) {
          return _this._undecorate($(node));
        });
      };
    })(this));
    return this.editor.body.on('click', '.simditor-checklist > li', (function(_this) {
      return function(e) {
        var $node, range;
        e.preventDefault();
        e.stopPropagation();
        $node = $(e.currentTarget);
        range = document.createRange();
        _this.editor.selection.save();
        range.setStart($node[0], 0);
        range.setEnd($node[0], _this.editor.util.getNodeLength($node[0]));
        _this.editor.selection.selectRange(range);
        document.execCommand('strikethrough');
        $node.attr('checked', !$node.attr('checked'));
        _this.editor.selection.restore();
        return _this.editor.trigger('valuechanged');
      };
    })(this));
  };

  ChecklistButton.prototype.status = function($node) {
    if ($node != null) {
      this.setDisabled($node.is(this.disableTag));
    }
    if (this.disabled) {
      return true;
    }
    if ($node == null) {
      return this.active;
    }
    if (!$node.closest('ul, ol').hasClass('simditor-checklist')) {
      this.setActive(false);
      return true;
    } else {
      this.setActive(true);
      this.editor.toolbar.findButton('ul').setDisabled(true);
      this.editor.toolbar.findButton('ul').setActive(false);
      this.editor.toolbar.findButton('ol').setDisabled(true);
      this.editor.toolbar.findButton('ol').setActive(false);
      return false;
    }
  };

  ChecklistButton.prototype.command = function(param) {
    var $contents, $endBlock, $furthestEnd, $furthestStart, $parent, $startBlock, endLevel, endNode, getListLevel, j, len, node, range, ref, results, startLevel, startNode;
    range = this.editor.selection.getRange();
    startNode = range.startContainer;
    endNode = range.endContainer;
    $startBlock = this.editor.util.closestBlockEl(startNode);
    $endBlock = this.editor.util.closestBlockEl(endNode);
    this.editor.selection.save();
    range.setStartBefore($startBlock[0]);
    range.setEndAfter($endBlock[0]);
    if ($startBlock.is('li') && $endBlock.is('li')) {
      $furthestStart = this.editor.util.furthestNode($startBlock, 'ul, ol');
      $furthestEnd = this.editor.util.furthestNode($endBlock, 'ul, ol');
      if ($furthestStart.is($furthestEnd)) {
        getListLevel = function($li) {
          var lvl;
          lvl = 1;
          while (!$li.parent().is($furthestStart)) {
            lvl += 1;
            $li = $li.parent();
          }
          return lvl;
        };
        startLevel = getListLevel($startBlock);
        endLevel = getListLevel($endBlock);
        if (startLevel > endLevel) {
          $parent = $endBlock.parent();
        } else {
          $parent = $startBlock.parent();
        }
        range.setStartBefore($parent[0]);
        range.setEndAfter($parent[0]);
      } else {
        range.setStartBefore($furthestStart[0]);
        range.setEndAfter($furthestEnd[0]);
      }
    }
    $contents = $(range.extractContents());
    results = [];
    $contents.children().each((function(_this) {
      return function(i, el) {
        var c, converted, j, len, results1;
        converted = _this._convertEl(el);
        results1 = [];
        for (j = 0, len = converted.length; j < len; j++) {
          c = converted[j];
          if (results.length && results[results.length - 1].is(_this.type) && c.is(_this.type)) {
            results1.push(results[results.length - 1].append(c.children()));
          } else {
            results1.push(results.push(c));
          }
        }
        return results1;
      };
    })(this));
    ref = results.reverse();
    for (j = 0, len = ref.length; j < len; j++) {
      node = ref[j];
      range.insertNode(node[0]);
    }
    this.editor.selection.restore();
    return this.editor.trigger('valuechanged');
  };

  ChecklistButton.prototype._convertEl = function(el) {
    var $el, block, child, children, j, len, ref, results;
    $el = $(el);
    results = [];
    if ($el.is(this.type)) {
      $el.children('li').each((function(_this) {
        return function(i, li) {
          var $childList, $li, block;
          $li = $(li);
          $childList = $li.children('ul, ol').remove();
          block = $('<p/>').append($(li).html() || _this.editor.util.phBr);
          results.push(block);
          if ($childList.length > 0) {
            return results.push($childList);
          }
        };
      })(this));
    } else if ($el.is('ol, ul')) {
      block = $('<ul class="simditor-checklist" />').append($el.html());
      results.push(block);
    } else if ($el.is('blockquote')) {
      ref = $el.children().get();
      for (j = 0, len = ref.length; j < len; j++) {
        child = ref[j];
        children = this._convertEl(child);
      }
      $.merge(results, children);
    } else {
      block = $('<ul class="simditor-checklist"><li></li></ul>');
      block.find('li').append($el.html() || this.editor.util.phBr);
      results.push(block);
    }
    return results;
  };

  ChecklistButton.prototype._decorate = function($checkbox) {
    var $node, checked;
    checked = !!$checkbox.attr('checked');
    $node = $checkbox.closest('li');
    $checkbox.remove();
    $node.attr('checked', checked);
    return $node.closest('ul').addClass('simditor-checklist');
  };

  ChecklistButton.prototype._undecorate = function($node) {
    var $checkbox, checked;
    checked = !!$node.attr('checked');
    $checkbox = $('<input type="checkbox">').attr('checked', checked);
    return $node.attr('checked', '').prepend($checkbox);
  };

  return ChecklistButton;

})(Simditor.Button);

Simditor.Toolbar.addButton(ChecklistButton);

return ChecklistButton;

}));
