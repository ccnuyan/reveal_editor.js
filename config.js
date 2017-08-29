let relativePath = '';
if (process.env.NODE_ENV === 'production') {
  relativePath = '/reveal_editor';
}
module.exports = {
  relativePath,
  stylesheets: {
    reveal: `${relativePath}/static/reveal/css/reveal.css`,
    semantic: `${relativePath}/static/semantic/dist/semantic.min.css`,
    katex: '//cdn.bootcss.com/KaTeX/0.8.2/katex.min.css',
  },
  scripts: {
    head: `${relativePath}/static/lib/js/head.min.js`,
    html5shiv: `${relativePath}/static/lib/js/html5shiv.js`,
    classList: '//cdn.bootcss.com/classlist/2014.01.31/classList.min.js',
    jquery: '//cdn.bootcss.com/jquery/3.2.1/jquery.min.js',
    semantic: `${relativePath}/static/semantic/dist/semantic.min.js`,
    katex: '//cdn.bootcss.com/KaTeX/0.8.2/katex.min.js',
    ckeditor: `${relativePath}/static/ckeditor/ckeditor.js`,
    reveal: `${relativePath}/static/reveal/js/reveal.min.js`,
  },
};
