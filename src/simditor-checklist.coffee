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

      @editor.selection.selectRange range
      document.execCommand 'strikethrough'
      $node.attr 'checked', !$node.attr('checked')

      @editor.selection.restore()
      @editor.trigger 'valuechanged'


  status: ($node) ->
    @setDisabled $node.is(@disableTag) if $node?
    return true if @disabled
    return @active unless $node?

    if !$node.closest('ul, ol').hasClass('simditor-checklist')
      @setActive false
      return true
    else
      @setActive true
      @editor.toolbar.findButton('ul').setDisabled(true)
      @editor.toolbar.findButton('ul').setActive(false)
      @editor.toolbar.findButton('ol').setDisabled(true)
      @editor.toolbar.findButton('ol').setActive(false)
      return false


  command: (param) ->
    range = @editor.selection.getRange()
    startNode = range.startContainer
    endNode = range.endContainer
    $startBlock = @editor.util.closestBlockEl(startNode)
    $endBlock = @editor.util.closestBlockEl(endNode)

    @editor.selection.save()

    range.setStartBefore $startBlock[0]
    range.setEndAfter $endBlock[0]

    if $startBlock.is('li') and $endBlock.is('li')
      $furthestStart = @editor.util.furthestNode $startBlock, 'ul, ol'
      $furthestEnd = @editor.util.furthestNode $endBlock, 'ul, ol'
      if $furthestStart.is $furthestEnd
        getListLevel = ($li) ->
          lvl = 1
          while !$li.parent().is $furthestStart
            lvl += 1
            $li = $li.parent()
          return lvl

        startLevel = getListLevel $startBlock
        endLevel = getListLevel $endBlock

        if startLevel > endLevel
          $parent = $endBlock.parent()
        else
          $parent = $startBlock.parent()

        range.setStartBefore $parent[0]
        range.setEndAfter $parent[0]
      else
        range.setStartBefore $furthestStart[0]
        range.setEndAfter $furthestEnd[0]

    $contents = $(range.extractContents())

    results = []
    $contents.children().each (i, el) =>
      converted = @_convertEl el
      for c in converted
        if results.length and results[results.length - 1].is(@type) and c.is(@type)
          results[results.length - 1].append(c.children())
        else
          results.push(c)

    range.insertNode node[0] for node in results.reverse()
    @editor.selection.restore()
    @editor.trigger 'valuechanged'


  _convertEl: (el) ->
    $el = $(el)
    results = []

    if $el.is @type
      $el.children('li').each (i, li) =>
        $li = $(li)
        $childList = $li.children('ul, ol').remove()
        block = $('<p/>').append($(li).html() || @editor.util.phBr)
        results.push block
        results.push $childList if $childList.length > 0
    else if $el.is 'ol, ul'
      block = $('<ul class="simditor-checklist" />').append($el.html())
      results.push(block)
    else if $el.is 'blockquote'
      children = @_convertEl child for child in $el.children().get()
      $.merge results, children
    else
      block = $('<ul class="simditor-checklist"><li></li></ul>')
      block.find('li').append($el.html() || @editor.util.phBr)
      results.push(block)

    results


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
