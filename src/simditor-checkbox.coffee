class SimditorCheckbox extends Simditor.Button

  name: 'checkbox'

  icon: 'checkbox'

  htmlTag: 'input'

  disableTag: 'pre, table'


  constructor: (args...) ->
    super args...
    $.extend @editor.formatter._allowedAttributes,
      input: ['type', 'checked', 'disabled']


  _init: ->
    super()

    @editor.on 'decorate', (e, $el) =>
      $el.find('input[type=checkbox]').each (i, checkbox) =>
        @_decorate $(checkbox)

    @editor.on 'undecorate', (e, $el) =>
      $el.find('.simditor-checkbox').each (i, checkbox) =>
        @_undecorate $(checkbox)

    @editor.body.on 'click', '.simditor-checkbox', (e) =>
      e.preventDefault()
      e.stopPropagation()
      $checkbox = $(e.currentTarget)
      checked = !$checkbox.attr('checked')
      $checkbox.attr('checked', checked)
        .attr('src', @_getPath(checked))

    @editor.body.on 'keydown', (e) =>
      return  unless e.which is 13
      @editor.one 'valuechanged', =>
        node = @editor.util.closestBlockEl()[0].previousSibling
        @_insert()  if node.nodeName is 'LI' and $(node.firstChild).hasClass('simditor-checkbox')


  command: ->
    @_insert()


  _insert: ->
    path = @_getPath(false)
    $checkbox = $("<input class='simditor-checkbox' type='image' src=#{ path }>")
    @editor.selection.insertNode $checkbox


  _decorate: ($checkbox) ->
    checked = !!$checkbox.attr('checked')
    path = @_getPath(checked)
    $node = $("<input class='simditor-checkbox' type='image' src=#{ path }>")

    $node.attr('checked', checked)
      .attr('disabled', false)
    $checkbox.replaceWith $node


  _undecorate: ($checkbox) ->
    checked = !!$checkbox.attr('checked')
    $node = $('<input type="checkbox">')

    $node.attr('checked', checked)
      .attr('disabled', true)
    $checkbox.replaceWith $node


  _getPath: (checked) ->
    opts = $.extend
      imagePath: 'images'
    , @editor.opts.checkbox || {}

    opts.imagePath.replace(/\/$/, '') + '/' + \
      (if checked then 'simditor-checked.gif' else 'simditor-unchecked.gif')


Simditor.Toolbar.addButton SimditorCheckbox

