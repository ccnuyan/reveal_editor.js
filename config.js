const relativePath = '/reveal_editor';
module.exports = {
  stylesheets: {
    reveal: `${relativePath}/reveal/css/reveal.css`,
    semantic: `${relativePath}/semantic/dist/semantic.min.css`,
    katex: '//cdn.bootcss.com/KaTeX/0.8.2/katex.min.css',
  },
  scripts: {
    head: `${relativePath}/lib/js/head.min.js`,
    html5shiv: `${relativePath}/lib/js/html5shiv.js`,
    classList: '//cdn.bootcss.com/classlist/2014.01.31/classList.min.js',
    jquery: '//cdn.bootcss.com/jquery/3.2.1/jquery.min.js',
    semantic: `${relativePath}/semantic/dist/semantic.min.js`,
    katex: '//cdn.bootcss.com/KaTeX/0.8.2/katex.min.js',
    ckeditor: `${relativePath}/ckeditor/ckeditor.js`,
    reveal: `${relativePath}/reveal/js/reveal.min.js`,
  },
};
