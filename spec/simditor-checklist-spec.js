(function() {
  var destroySimditor, generateSimditor;

  describe('simditor-checklist', function() {
    var editor, simditor;
    editor = null;
    return simditor = null;
  });

  generateSimditor = function() {
    var $textarea, content, simditor;
    content = '<p>Simditor 是团队协作工具 <a href="http://tower.im">Tower</a> 使用的富文本编辑器。</p>\n<p>相比传统的编辑器它的特点是：</p>\n<ul>\n  <li>功能精简，加载快速</li>\n  <li>输出格式化的标准 HTML</li>\n  <li>每一个功能都有非常优秀的使用体验</li>\n</ul>\n<p>兼容的浏览器：IE10+、Chrome、Firefox、Safari。</p>';
    $textarea = $('<textarea id="editor"></textarea>').val(content).appendTo('body');
    return simditor = new Simditor({
      textarea: $textarea,
      toolbar: ['checklist', 'title', 'bold', 'italic', 'underline']
    });
  };

  destroySimditor = function() {
    var $textarea, editor;
    $textarea = $('#editor');
    editor = $textarea.data('simditor');
    if (editor != null) {
      editor.destroy();
    }
    return $textarea.remove();
  };

  beforeEach(function() {
    var editor;
    return editor = generateSimditor();
  });

  afterEach(function() {
    var editor, simditor;
    destroySimditor();
    editor = null;
    return simditor = null;
  });

  it('should render button in simditor', function() {
    var $simditor;
    $simditor = $('.simditor');
    expect($simditor).toExist();
    return expect($simditor.find('.simditor-toolbar ul li a.toolbar-item-checklist')).toExist();
  });

  it('should insert a checklist when click the button', function() {
    var $body, $btn, $simditor, simditor;
    $simditor = $('.simditor');
    $body = $simditor.find('.simditor-body');
    simditor = $simditor.data('simditor');
    $btn = $simditor.find('a.toolbar-item-checklist');
    simditor.focus();
    $btn.trigger('mousedown');
    return expect($body.find('.simditor-checklist li')).toExist();
  });

}).call(this);
