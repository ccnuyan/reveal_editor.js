class themeService {
  constructor(editor) {
    this.editor = editor;
    this.selectedBlocks = [];
    this.themekey = 'white';
  }

  themes = {
    white: {
      css: '/reveal/css/theme/white.css',
      rotateAnchor: 'black',
      shape: {
        stroke: 'rgba(0, 0, 0, 1)',
      },
      icon: {
        fill: 'rgba(0, 0, 0, 1)',
      },
    },
    black: {
      css: '/reveal/css/theme/black.css',
      rotateAnchor: 'white',
      shape: {
        stroke: 'rgba(255, 255, 255, 1)',
      },
      icon: {
        fill: 'rgba(255, 255, 255, 1)',
      },
    },
  };

  getTheme = () => {
    return this.themes[this.themekey];
  };

  loadTheme = (theme) => {
    if (this.themes[theme]) {
      this.themekey = theme;
      document.getElementById('theme').setAttribute('href', this.themes[theme].css);
    }
  }
}

export default themeService;
