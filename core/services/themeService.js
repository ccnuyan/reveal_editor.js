import resourceConfig from '../../config';

class themeService {
  constructor(editor) {
    this.editor = editor;
    this.selectedBlocks = [];
    this.themekey = 'white';
  }

  themes = {
    light: {
      key: 'light',
      css: './static/reveal/css/theme/white.css',
      sectionAdd: 'black',
      rotateAnchor: 'black',
      shape: {
        stroke: 'rgba(0, 0, 0, 1)',
      },
      icon: {
        fill: 'rgba(0, 0, 0, 1)',
      },
    },
    dark: {
      key: 'dark',
      css: './static/reveal/css/theme/black.css',
      rotateAnchor: 'white',
      sectionAdd: 'white',
      shape: {
        stroke: 'rgba(255, 255, 255, 1)',
      },
      icon: {
        fill: 'rgba(255, 255, 255, 1)',
      },
    },
  };

  reveal_override = './static/reveal_override/reveal.css';

  getTheme = () => {
    return this.themes[this.themekey];
  };

  loadTheme = (theme) => {
    if (this.themes[theme]) {
      this.themekey = theme;
      document.getElementById('css_theme').setAttribute('href', this.themes[theme].css);
      document.getElementById('css_theme_override').setAttribute('href', this.reveal_override);
      this.editor.slidesDom.dataset.theme = theme;
      return theme;
    }
    this.themekey = 'light';
    document.getElementById('css_theme').setAttribute('href', this.themes.light.css);
    document.getElementById('css_theme_override').setAttribute('href', this.reveal_override);
    this.editor.slidesDom.dataset.theme = 'light';
    return 'light';
  }
}

export default themeService;
