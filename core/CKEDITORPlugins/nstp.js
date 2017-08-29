CKEDITOR.plugins.add('remove-extra-nbsp', {
  afterInit(editor) {
    const dataProcessor = editor.dataProcessor;
    const htmlFilter = dataProcessor && dataProcessor.htmlFilter;

    if (htmlFilter) {
      htmlFilter.addRules({
        text(text) {
          // Using variable replace since JS does not support negative
          // lookbehind.
          // Only nbsp entities that are neither preceded or followed by
          // whitespace or an opening/closing HTML tag are replaced.
          //
          // Examples:
          // - "&nbsp;"                 -> UNCHANGED
          // - "AAA&nbsp;BBB"           -> "AAA BBB"
          // - "AAA&nbsp;&nbsp;BBB"     -> "AAA &nbsp;BBB"
          // - "AAA &nbsp; &nbsp; BBB"  -> UNCHANGED
          // - "<em>&nbsp;</em>"        -> UNCHANGED
          if (text !== '&nbsp;') {
            text.replace(/(\s)?&nbsp;(?!\s)/gi, ($0, $1) => {
              return $1 ? $0 : ' ';
            });
          }
          return text;
        },
      }, {
        applyToAll: true,
        excludeNestedEditable: true,
      });
    }
  },
});
