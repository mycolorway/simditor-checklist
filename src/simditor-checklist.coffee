class ChecklistButton extends Simditor.Button

  type: 'ul.simditor-checklist'

  name: 'checklist'

  icon: 'checklist'

  htmlTag: 'li'

  disableTag: 'pre, table'


  constructor: (args...) ->
    super args...
    if 'input' && $.inArray('input', @editor.formatter._allowedTags) < 0
      @editor.formatter._allowedTags.push 'input'
    $.extend @editor.formatter._allowedAttributes,
      input: ['type', 'checked']


  _init: ->
    super()

    @editor.on 'decorate', (e, $el) =>
      $el.find('ul > li input[type=checkbox]').each (i, checkbox) =>
        @_decorate $(checkbox)

    @editor.on 'undecorate', (e, $el) =>
      $el.find('.simditor-checklist > li').each (i, node) =>
        @_undecorate $(node)

    @editor.body.on 'click', '.simditor-checklist > li', (e) =>
      e.preventDefault()
      e.stopPropagation()
      $node = $(e.currentTarget)
      range = document.createRange()

      @editor.selection.save()
      range.setStart $node[0], 0
      range.setEnd $node[0], @editor.util.getNodeLength($node[0])

      @editor.selection.range range
      document.execCommand 'strikethrough'
      $node.attr 'checked', !$node.attr('checked')

      @editor.selection.restore()
      @editor.trigger 'valuechanged'

    @editor.keystroke.add '13', 'li', (e, $node) =>
      setTimeout =>
        $li = @editor.selection.blockNodes().last().next()
        if $li.length
          $li[0].removeAttribute('checked')
          document.execCommand('strikethrough')  if document.queryCommandState('strikethrough')
      , 0


  _status: ->
    super()
    $node = @editor.selection.rootNodes()

    if $node.is '.simditor-checklist'
      @editor.toolbar.findButton('ul').setActive(false)
      @editor.toolbar.findButton('ol').setActive(false)
      @editor.toolbar.findButton('ul').setDisabled(true)
      @editor.toolbar.findButton('ol').setDisabled(true)
    else
      @editor.toolbar.findButton('checklist').setActive(false)


  command: (param) ->
    $rootNodes = @editor.selection.blockNodes()
    @editor.selection.save()

    $list = null
    $rootNodes.each (i, node) =>
      $node = $ node
      return if $node.is('blockquote, li') or $node.is(@disableTag) or !$.contains(document, node)

      if $node.is '.simditor-checklist'
        $node.children('li').each (i, li) =>
          $li = $(li)
          $childList = $li.children('ul, ol').insertAfter($node)
          $('<p/>').append($(li).html() || @editor.util.phBr)
            .insertBefore($node)
        $node.remove()
      else if $node.is 'ul, ol'
        $('<ul class="simditor-checklist" />').append($node.contents())
          .replaceAll($node)
      else if $list and $node.prev().is($list)
        $('<li/>').append($node.html() || @editor.util.phBr)
          .appendTo($list)
        $node.remove()
      else
        $list = $('<ul class="simditor-checklist"><li></li></ul>')
        $list.find('li').append($node.html() || @editor.util.phBr)
        $list.replaceAll($node)

    @editor.selection.restore()
    @editor.trigger 'valuechanged'


  _decorate: ($checkbox) ->
    checked = !!$checkbox.attr('checked')
    $node = $checkbox.closest('li')

    $checkbox.remove()
    $node.attr('checked', checked)
    $node.closest('ul').addClass('simditor-checklist')


  _undecorate: ($node) ->
    checked = !!$node.attr('checked')
    $checkbox = $('<input type="checkbox">').attr('checked', checked)

    $node.attr('checked', '')
      .prepend $checkbox


Simditor.Toolbar.addButton ChecklistButton
