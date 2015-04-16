class SimditorCheckbox extends Simditor.Button

  name: 'checkbox'

  icon: 'checkbox'

  htmlTag: 'input'

  disableTag: 'pre, table'

  constructor: (args...) ->
    super args...
    $.extend @editor.formatter._allowedAttributes,
      input: ['type', 'checked']


  _init: ->
    super()

    @editor.body.on 'click', 'input[type=checkbox]', (e) =>
      $checkbox = $(e.currentTarget)
      $checkbox.attr 'checked', !$checkbox.attr('checked')

    .on 'keydown', (e) =>
      return  unless e.which is 13
      @editor.one 'valuechanged', =>
        node = @editor.util.closestBlockEl()[0].previousSibling.firstChild
        @_insert()  if node.type is 'checkbox'


  command: ->
    @_insert()


  _insert: ->
    checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    @editor.selection.insertNode checkbox


Simditor.Toolbar.addButton SimditorCheckbox

