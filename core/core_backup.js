import './CKEDITORPlugins';
import './core.scss';
import _config from './config';
import _u from './util';
import Axis from './Axis';
import Transformer from './Transformer';
import SectionManipulator from './SectionManipulator';
import revealConf from './revealConf';
import Editor from './Editor';

// #wrapper > #reveal_container
// #wrapper > #reveal_editor

(() => {
  $('.reveal').wrap('<div id="reveal_container"></div>');
  $('#reveal_container').wrap('<div id="wrapper"></div>');
  $('#wrapper').append('<div id="reveal_editor"></div>');
})();

/* eslint-disable no-param-reassign, radix */
((() => {
  const _store = {};
  const getEditor = () => {
    return document.querySelector('.reveal-editor');
  };

  const getReveal = () => {
    return document.querySelector(_config.selectors.wrapper);
  };

  const getBlockContent = (block) => {
    return block.querySelector(_config.selectors.content);
  };

  // // To Preview a sl-block
  function toPreview(el) {
    el.setAttribute('draggable', false);

    const content = el.querySelector(_config.selectors.content);
    const transform = el.querySelector(_config.selectors.transform);

    // transform.style.pointerEvents = 'none';
    _u.hide(transform);

    switch (el.dataset.blockType) {
      case 'text': {
        Object.keys(CKEDITOR.instances).forEach((key) => {
          const ce_instance = CKEDITOR.instances[key];

          if (ce_instance && ce_instance.container.$ === content) {
            ce_instance.destroy();
          }
        });
        content.setAttribute('contenteditable', false);
        break;
      }
      case 'image': {
        const contentImage = content.querySelector('img');
        if (!contentImage || (contentImage && !contentImage.src)) {
          _u.hide(contentImage);
        } else {
          _u.show(contentImage);
        }
        break;
      }
      default:

    }
  }

  // // To Manipulate a sl-block
  function toManipulate(block) {
    if (block) {
      _store.currentBlock = block;
    }

    if (!_store.currentBlock) {
      // currentBlock null before toManipulate
      return;
    }
    const el = _store.currentBlock;
    el.setAttribute('draggable', true);

    const transform = el.querySelector(_config.selectors.transform);
    transform.style.display = 'block';
    // transform.style.pointerEvents = 'auto';

    switch (el.dataset.blockType) {
      case 'text':
        break;
      case 'image':
        break;
      default:
    }
  }

  // To Edit a sl-block
  function toEdit(block) {
    if (block) {
      _store.currentBlock = block;
    }
    if (!_store.currentBlock) {
      // 'currentBlock null before toEdit';
      return;
    }

    const el = _store.currentBlock;

    el.setAttribute('draggable', false);
    const content = el.querySelector(_config.selectors.content);

    switch (el.dataset.blockType) {
      case 'text': { content.setAttribute('contenteditable', 'true');
        Object.keys(CKEDITOR.instances).forEach((name) => {
          const ariaLabel = content.getAttribute('aria-label');
          if (ariaLabel && ariaLabel.split(', ')[1] === name) {
            CKEDITOR.instances[name].focus();
          }
        });
        CKEDITOR.inline(content, _config.ckeditorConfig);
        _u.clearUserSelection();
        break; }
      case 'image': { const evt = new CustomEvent('requestDisk', {
        type: 'image',
      });
        getEditor().dispatchEvent(evt);
        break; }
      default:
    }
  }

  function remove() {
    remove(_store.currentBlock);
    _store.currentBlock = null;
  }


  // Block的事件
  function linkBlockEvents(block) {
    const content = getBlockContent(block);

    let transform = block.querySelector(_config.selectors.transform);

    if (!transform) {
      transform = Transformer(block);
    }
    // linking events
    transform.addEventListener('click', (event) => {
      if (_store.mode !== 'editing') return;
      event.stopPropagation();
    });

    content.addEventListener('click', (event) => {
      if (_store.mode !== 'editing') return;
      switch (block.dataset.blockType) {
        case 'text':
          if (content.contentEditable === 'true') {
            event.stopPropagation();
          }
          break;
        default:
      }
    });

    block.addEventListener('click', (event) => {
      if (_store.mode !== 'editing') {
        return;
      }
      _store.currentBlock = block;
      toManipulate();
      _u.each(_config.selectors.block, (blk) => {
        blk !== block && toPreview(blk);
      });
      event.stopPropagation();

      const detail = {
        type: _store.currentBlock.dataset.blockType,
      };


      const cbContent = _store.currentBlock.querySelector(_config.selectors.content);
      switch (_store.currentBlock.dataset.blockType) {
        case 'text': {
          const style = getComputedStyle(cbContent);
          const textDetail = {
            // from getComputedStyle
            color: style.color || '',
            background: style.background || '',
            opacity: style.opacity || 1,

            // from style
            fontSize: cbContent.style.fontSize || '100%',

            // dataset
            selectable: _store.currentBlock.getAttribute('data-vote-selectable') || '',
          };
          detail.text = textDetail;
          break; }
        case 'image': {
          const style = getComputedStyle(cbContent);
          const imageDetail = {
            opacity: style.opacity || 1,
          };
          detail.image = imageDetail;
          break;
        }
        default: {
          break;
        }
      }

      const evt = new CustomEvent('blockClick', {
        detail,
      });
      getEditor().dispatchEvent(evt);
    });

    block.addEventListener('dblclick', () => {
      if (_store.mode !== 'editing') return;
      _store.currentBlock = block;
      toEdit();
      event.stopPropagation();
    });

    Array.prototype.forEach.call(transform.querySelectorAll('.anchor'),
      (anchor) => {
        anchor.setAttribute('draggable', true);

        anchor.addEventListener('dragstart', (event) => {
          if (_store.mode !== 'editing') return;

          _store.draggingBlock = block;
          _store.draggingAnchor = anchor;

          event.stopPropagation();

          event.dataTransfer.effectAllowed = 'move';
          event.dataTransfer.setDragImage(_u.getEmpyImage(), 0, 0);

          const blockStyle = getComputedStyle(block);

          block.setAttribute('data-drag-from', JSON.stringify({
            blockType: block.dataset.blockType,
            mode: 'resize',
            x: event.clientX,
            y: event.clientY,
            top: blockStyle.top,
            left: blockStyle.left,
            width: blockStyle.width,
            height: blockStyle.height,
            right: blockStyle.right,
            bottom: blockStyle.bottom,
          }));
          event.stopPropagation();
        });
      });

    block.addEventListener('dragstart', (event) => {
      if (_store.mode !== 'editing') return;
      _store.draggingBlock = block;
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setDragImage(_u.getEmpyImage(), 0, 0);

      const blockStyle = getComputedStyle(block);

      block.setAttribute('data-drag-from', JSON.stringify({
        blockType: block.dataset.blockType,
        mode: 'move',
        x: event.clientX,
        y: event.clientY,
        top: blockStyle.top,
        left: blockStyle.left,
        width: blockStyle.width,
        height: blockStyle.height,
        right: blockStyle.right,
        bottom: blockStyle.bottom,
      }));
      event.stopPropagation();
    });
  }

  function linkWrapperEvents() {
    const wrapper = getReveal();

    wrapper.setAttribute('draggable', true);

    wrapper.addEventListener('click', (event) => {
      _store.currentBlock = null;

      _u.each(_config.selectors.block, (block) => {
        toPreview(block);
      });
      event.stopPropagation();

      const evt = new CustomEvent('wrapperClick');
      getEditor().dispatchEvent(evt);
    });

    wrapper.addEventListener('dragstart', (event) => {
      if (_store.selectRect) {
        _store.selectRect.style.width = '0px';
        _store.selectRect.style.height = '0px';

        _u.show(_store.selectRect);
      }
      event.dataTransfer.effectAllowed = 'move';
      event.dataTransfer.setDragImage(_u.getEmpyImage(), 0, 0);

      _store.draggingBlock = wrapper;

      wrapper.setAttribute('data-drag-from', JSON.stringify({
        mode: 'drag-select',
        x: event.clientX,
        y: event.clientY,
      }));
    });

    wrapper.addEventListener('dragend', () => {
      if (_store.selectRect) {
        _u.hide(_store.selectRect);
      }
    });

    wrapper.addEventListener('dragover', (event) => {
      event.preventDefault();

      event.dataTransfer.dropEffect = 'move';
      const org = JSON.parse(_store.draggingBlock.dataset.dragFrom);
      switch (org.mode) {
        case 'move':
          _store.draggingBlock.style.left = `${(parseInt(org.left) + event.clientX) - org.x}px`;
          _store.draggingBlock.style.top = `${(parseInt(org.top) + event.clientY) - org.y}px`;
          break;
        case 'resize': {
          const absoluteResize = (bstyle, dr, offsetX, offsetY) => {
            switch (dr) {
              case 'e':
                bstyle.left = `${parseInt(org.left) + offsetX}px`;
                bstyle.width = `${parseInt(org.width) - offsetX}px`;
                break;
              case 'w':
                bstyle.width = `${parseInt(org.width) + offsetX}px`;
                bstyle.right = `${parseInt(org.right) - offsetX}px`;
                break;
              case 'n':
                bstyle.top = `${parseInt(org.top) + offsetY}px`;
                bstyle.height = `${parseInt(org.height) - offsetY}px`;
                break;
              case 's':
                bstyle.bottom = `${parseInt(org.bottom) - offsetY}px`;
                bstyle.height = `${parseInt(org.height) + offsetY}px`;
                break;
              case 'ne':
                bstyle.top = `${parseInt(org.top) + offsetY}px`;
                bstyle.height = `${parseInt(org.height) - offsetY}px`;
                bstyle.left = `${parseInt(org.left) + offsetX}px`;
                bstyle.width = `${parseInt(org.width) - offsetX}px`;
                break;
              case 'nw':
                bstyle.top = `${parseInt(org.top) + offsetY}px`;
                bstyle.height = `${parseInt(org.height) - offsetY}px`;
                bstyle.width = `${parseInt(org.width) + offsetX}px`;
                bstyle.right = `${parseInt(org.right) - offsetX}px`;
                break;
              case 'se':
                bstyle.bottom = `${parseInt(org.bottom) - offsetY}px`;
                bstyle.height = `${parseInt(org.height) + offsetY}px`;
                bstyle.left = `${parseInt(org.left) + offsetX}px`;
                bstyle.width = `${parseInt(org.width) - offsetX}px`;
                break;
              case 'sw':
                bstyle.bottom = `${parseInt(org.bottom) - offsetY}px`;
                bstyle.height = `${parseInt(org.height) + offsetY}px`;
                bstyle.width = `${parseInt(org.width) + offsetX}px`;
                bstyle.right = `${parseInt(org.right) - offsetX}px`;
                break;
              default:
            }
          };

          const relativeResize = (bstyle, dr, offsetX, offsetY, nWidth, nHeight) => {
            const deltaHeight = (offsetX * nHeight) / nWidth;
            const deltaWidth = (offsetY * nWidth) / nHeight;

            switch (dr) {
              case 'e':
                bstyle.left = `${parseInt(org.left) + offsetX}px`;
                bstyle.width = `${parseInt(org.width) - offsetX}px`;
                bstyle.top = `${parseInt(org.top) + (deltaHeight / 2)}px`;
                bstyle.height = `${parseInt(org.height) - deltaHeight}px`;
                break;
              case 'w':
                bstyle.width = `${parseInt(org.width) + offsetX}px`;
                bstyle.right = `${parseInt(org.right) - offsetX}px`;
                bstyle.top = `${parseInt(org.top) - (deltaHeight / 2)}px`;
                bstyle.height = `${parseInt(org.height) + deltaHeight}px`;
                break;
              case 'n':
                bstyle.top = `${parseInt(org.top) + offsetY}px`;
                bstyle.height = `${parseInt(org.height) - offsetY}px`;
                bstyle.left = `${parseInt(org.left) + (deltaWidth / 2)}px`;
                bstyle.width = `${parseInt(org.width) - deltaWidth}px`;
                break;
              case 's':
                bstyle.bottom = `${parseInt(org.bottom) - offsetY}px`;
                bstyle.height = `${parseInt(org.height) + offsetY}px`;
                bstyle.left = `${parseInt(org.left) - (deltaWidth / 2)}px`;
                bstyle.width = `${parseInt(org.width) + deltaWidth}px`;
                break;
              case 'ne':
                bstyle.top = `${parseInt(org.top) + offsetY}px`;
                bstyle.height = `${parseInt(org.height) - offsetY}px`;
                bstyle.left = `${parseInt(org.left) + deltaWidth}px`;
                bstyle.width = `${parseInt(org.width) - deltaWidth}px`;
                break;
              case 'nw':
                bstyle.top = `${parseInt(org.top) + offsetY}px`;
                bstyle.height = `${parseInt(org.height) - offsetY}px`;
                bstyle.width = `${parseInt(org.width) - deltaWidth}px`;
                break;
              case 'se':
                bstyle.bottom = `${parseInt(org.bottom) - offsetY}px`;
                bstyle.height = `${parseInt(org.height) + offsetY}px`;
                bstyle.left = `${parseInt(org.left) - deltaWidth}px`;
                bstyle.width = `${parseInt(org.width) + deltaWidth}px`;
                break;
              case 'sw':
                bstyle.bottom = `${parseInt(org.bottom) - offsetY}px`;
                bstyle.height = `${parseInt(org.height) + offsetY}px`;
                bstyle.width = `${parseInt(org.width) + deltaWidth}px`;
                bstyle.right = `${parseInt(org.right) - deltaWidth}px`;
                break;
              default:
            }
          };

          const offsetX = event.clientX - org.x;
          const offsetY = event.clientY - org.y;

          const dr = _store.draggingAnchor.dataset.direction.toString();
          const bstyle = _store.draggingBlock.style;

          switch (org.blockType) {
            case 'text': {
              absoluteResize(bstyle, dr, offsetX, offsetY);
              break; }
            case 'image': {
              const image = _store.draggingBlock.querySelector('.sl-block-content>img');
              if (!image) {
                absoluteResize(bstyle, dr, offsetX, offsetY);
              } else {
                const nWidth = image.dataset.naturalWidth;
                const nHeight = image.dataset.naturalHeight;
                if (nWidth && nHeight && nWidth !== 0 && nHeight !== 0) {
                  relativeResize(bstyle, dr, offsetX, offsetY, nWidth, nHeight);
                } else {
                  absoluteResize(bstyle, dr, offsetX, offsetY);
                }
              }
              break; }
            default:
          }

          break; }
        case 'drag-select': {
          const offsetX = event.clientX - org.x;
          const offsetY = event.clientY - org.y;

          const slides = document.querySelector('.slides');

          if (!_store.selectRect) {
            const rect = _u.create('div', 'editing-ui', _config.styles.dragSelectRect);
            _store.selectRect = rect;
            slides.appendChild(rect);
          }

          const offset = _u.offset(slides);
          const rect = _store.selectRect;

          rect.style.left = `${(offsetX >= 0 ? org.x : event.clientX) - offset.left}px`;
          rect.style.top = `${(offsetY >= 0 ? org.y : event.clientY) - offset.top}px`;
          rect.style.width = `${Math.abs(offsetX)}px`;
          rect.style.height = `${Math.abs(offsetY)}px`;

          const rectStyle = getComputedStyle(rect);

          _u.each(_config.selectors.block, (block) => {
            const blockStyle = getComputedStyle(block);

            if (
              parseInt(rectStyle.left) < parseInt(blockStyle.left) &&
              parseInt(rectStyle.top) < parseInt(blockStyle.top) &&
              parseInt(rectStyle.left) + parseInt(rectStyle.width) > parseInt(blockStyle.left) + parseInt(blockStyle.width) &&
              parseInt(rectStyle.top) + parseInt(rectStyle.height) > parseInt(blockStyle.top) + parseInt(blockStyle.height)
            ) {
              toManipulate(block);
            } else {
              toPreview(block);
            }
          });
          break; }
        default:
      }
    });
  }

  function getAxis() {
    return getReveal().querySelector('.axis');
  }

  function createBlock(type, content) {
    const slide = window.Reveal.getCurrentSlide();
    const blockDiv = _u.create('div', 'sl-block', _config.styles[`${type}Block`]);

    blockDiv.setAttribute('data-block-type', type);
    blockDiv.appendChild(content);

    slide.appendChild(blockDiv);
    linkBlockEvents(blockDiv);

    return blockDiv;
  }

  function switchToEditMode() {
    const wrapper = getReveal();
    _store.mode = 'editing';
    wrapper.setAttribute('draggable', true);
    const evt = new CustomEvent('onEnterEditMode');
    getEditor().dispatchEvent(evt);
  }

  function switchToPreviewMode() {
    const wrapper = getReveal();
    _store.mode = 'overviewing';
    wrapper.setAttribute('draggable', false);
    const evt = new CustomEvent('onEnterPreviewMode');
    getEditor().dispatchEvent(evt);
  }

  function addText(content) {
    if (!content) {
      content = _u.create('div', _config.classnames.content);
      const paragraph = _u.create('p');
      paragraph.textContent = '输入内容';
      content.appendChild(paragraph);
    }
    const textBlock = createBlock('text', content);
    _store.currentBlock = textBlock;
    toManipulate();
    toEdit();
  }

  function addImage(content) {
    if (!content) {
      content = _u.create('div', _config.classnames.content, _config.styles.imageContent);
    }
    const imageblock = createBlock('image', content);
    _store.currentBlock = imageblock;
  }

  function duplicate() {
    const slide = window.Reveal.getCurrentSlide();
    const cloneBlock = _u.clone(_store.currentBlock);

    cloneBlock.setAttribute('data-id', '');

    cloneBlock.style.left = 0;
    cloneBlock.style.top = 0;

    slide.appendChild(cloneBlock);

    toPreview(_store.currentBlock);
    _store.currentBlock = cloneBlock;

    linkBlockEvents(cloneBlock);
  }

  function changeContentDepth(direction) {
    const content = _store.currentBlock.querySelector(_config.selectors.content);
    let max = 0;
    let min = 255;

    _u.each(_config.selectors.content, (el) => {
      if (el !== content && max < parseInt(el.style.zIndex)) {
        max = parseInt(el.style.zIndex);
      }
      if (el !== content && min > parseInt(el.style.zIndex)) {
        min = parseInt(el.style.zIndex);
      }
    });

    switch (direction) {
      case 'up':
        content.style.zIndex = max >= 255 ? 255 : (max + 1);
        break;
      default:
      case 'down':
        content.style.zIndex = min <= 0 ? 0 : (min - 1);
        break;
    }
  }

  function getHtml(wrapper) {
    if (!wrapper) {
      wrapper = getReveal();
    }
    const rules = {
      slides: {
        classesAllowed: ['slides'],
        attributesAllowed: ['data-id'],
      },
      section: {
        classesAllowed: [],
        attributesAllowed: ['data-id'],
      },
      block: {
        classesAllowed: ['sl-block'],
        attributesAllowed: ['data-id', 'data-block-type', 'style', 'data-vote-selectable'],
      },
    };

    const cwp = _u.clone(wrapper);
    const slides = cwp.querySelector('div.slides');

    // remove no use elements

    const removeSelectors = ['.editing-ui', '.overviewing-ui', 'div.slides>div'];

    Array.prototype.forEach.call(removeSelectors, (selector) => {
      const euis = slides.querySelectorAll(selector);
      Array.prototype.forEach.call(euis, (el) => {
        remove(el);
      });
    });


    const sections = slides.querySelectorAll('section');
    const blocks = slides.querySelectorAll('div.sl-block');

    // class cleaner

    const removeClassNotExistedInArray = (el, array) => {
      const classToRemove = [];
      Array.prototype.forEach.call(el.classList, (cn) => {
        if (array.indexOf(cn) < 0) {
          classToRemove.push(cn);
        }
      });
      classToRemove.forEach((cn) => {
        el.classList.remove(cn);
      });
    };

    removeClassNotExistedInArray(slides, rules.slides.classesAllowed);

    Array.prototype.forEach.call(sections, (el) => {
      removeClassNotExistedInArray(el, rules.section.classesAllowed);
    });

    Array.prototype.forEach.call(blocks, (el) => {
      removeClassNotExistedInArray(el, rules.block.classesAllowed);
    });

    // attribute cleaner

    const removeAttrNotExistedInArray = (el, array) => {
      const attrsToRemove = [];
      Array.prototype.forEach.call(el.attributes, (attr) => {
        if (attr.name === 'class') {
          if (el.classList.length === 0) {
            attrsToRemove.push(attr.name);
          }
        } else if (array.indexOf(attr.name) < 0) {
          attrsToRemove.push(attr.name);
        }
      });

      attrsToRemove.forEach((attr) => {
        el.removeAttribute(attr);
      });
    };

    removeAttrNotExistedInArray(slides, rules.slides.attributesAllowed);

    Array.prototype.forEach.call(sections, (el) => {
      removeAttrNotExistedInArray(el, rules.section.attributesAllowed);
    });

    Array.prototype.forEach.call(blocks, (el) => {
      removeAttrNotExistedInArray(el, rules.block.attributesAllowed);
    });

    const wrapperToStore = _u.create('div');
    wrapperToStore.appendChild(slides);

    return _u.getInnerHTML(wrapperToStore);
  }

  // this should be go right after the Reveal Setup
  function handleRevealEvents() {
    window.Reveal.addEventListener('overviewshown', () => {
      _store.mode = 'overviewing';
      getReveal().setAttribute('draggable', false);
      // _store.getAxis().style.display = 'none';

      // ps: their is no .previewing-ui
      _u.each('.editing-ui', (el) => {
        el.style.pointerEvents = 'none';
      });
      _u.each('.overviewing-ui', (el) => {
        el.style.pointerEvents = 'auto';
        el.style.display = 'block';
      });
    });
    window.eveal.addEventListener('overviewhidden', () => {
      _store.mode = 'editing';
      getReveal().setAttribute('draggable', true);
      // _store.getAxis().style.display = 'block';

      _u.each('.editing-ui', (el) => {
        el.style.pointerEvents = 'none';
      });
      _u.each('.overviewing-ui', (el) => {
        el.style.pointerEvents = 'auto';
        el.style.display = 'none';
      });
    });
  }

  function setupUI() {
    _u.each('section', (section) => {
      SectionManipulator(section);
    });

    Axis(getReveal());
  }

  // 这个方法应该具备幂等性
  function initialize(html, toEditMode) {
    const wrapper = _u.create('div', 'reveal');
    const editor = getEditor();
    _u.empty(editor);
    _u.setHTML(wrapper, html);

    editor.appendChild(wrapper);
    if (!window.Reveal) {
      throw new Error('Reveal should go first');
    }

    window.Reveal.initialize(revealConf.editingConf);
    window.Reveal.navigateTo(window.Reveal.getIndices().h, window.Reveal.getIndices().v); // 如果不紧跟这句 会出现乱码

    setupUI();
    linkWrapperEvents();

    _u.each(_config.selectors.block, (block) => {
      linkBlockEvents(block);
    });

    if (toEditMode) {
      switchToEditMode();
    } else {
      switchToPreviewMode();
    }
  }

  function setOpacity(opacity) {
    const block = _store.currentBlock;
    if (!block) return false;
    const content = block.querySelector(_config.selectors.content);
    content.style.opacity = opacity;
    return true;
  }

  function setFontScale(size) {
    const block = _store.currentBlock;
    if (!block || block.dataset.blockType !== 'text') return false;
    const content = block.querySelector(_config.selectors.content);
    content.style.fontSize = size;
    return true;
  }

  function setTextColor(color) {
    const block = _store.currentBlock;
    if (!block || block.dataset.blockType !== 'text') return false;
    const content = block.querySelector(_config.selectors.content);
    if (color) {
      content.style.color = color;
    } else {
      content.style.color = 'inherit';
    }
    return true;
  }

  function setTextBackground(color) {
    const block = _store.currentBlock;
    if (!block || block.dataset.blockType !== 'text') return false;
    const content = block.querySelector(_config.selectors.content);
    if (color) {
      content.style.background = color;
    } else {
      content.style.background = 'transparent';
    }
    return true;
  }

  function setTextAlign(algn) {
    const block = _store.currentBlock;
    if (!block || block.dataset.blockType !== 'text') return false;
    const content = block.querySelector(_config.selectors.content);
    content.style.textAlign = algn;
    return true;
  }

  function setImage(imageUrl) {
    const block = _store.currentBlock;
    if (!block || block.dataset.blockType !== 'image') return false;
    const content = block.querySelector(_config.selectors.content);
    let contentImage = content.querySelector('img');
    if (!contentImage) {
      contentImage = _u.create('img');
      content.appendChild(contentImage);
    }
    contentImage.onload = () => {
      const nWidth = contentImage.naturalWidth;
      const nHeight = contentImage.naturalHeight;

      if (nWidth === 0 || nHeight === 0) { return; }

      contentImage.setAttribute('data-natural-width', nWidth);
      contentImage.setAttribute('data-natural-height', nHeight);

      block.style.width = `${nWidth}px`;
      block.style.height = `${nHeight}px`;
      show(contentImage);
    };
    contentImage.src = imageUrl;
  }

  function setSelectable(selectable) {
    if (!selectable || (selectable !== 'single' && selectable !== 'multiple')) {
      block.remoteAttribute('data-vote-selectable');
    }
    const block = _store.currentBlock;
    if (!block || block.dataset.blockType !== 'text') return false;

    block.setAttribute('data-vote-selectable', selectable);
  }

  function addNewSection() {
    const slide = window.Reveal.getCurrentSlide();
    if (!slide) {
      debugger;
    }
    const section = _u.create('section');
    _u.setHTML(section, templates.sectionTemplates.title);
    const indicies = window.Reveal.getIndices();

    if (slide.parentNode.nodeName === 'DIV') {
      slide.parentNode.insertBefore(section, slide.nextSibling);
      const html = _u.getHtml(getReveal());
      initialize(html, true);
    } else if (slide.parentNode.nodeName === 'SECTION') {
      slide.parentNode.parentNode.insertBefore(section, slide.parentNode.nextSibling);
      const html = _u.getHtml(getReveal());
      initialize(html, true);
    }
    window.Reveal.navigateTo(indicies.h + 1, 0);
  }

  function addNewSubSection() {
    const slide = window.Reveal.getCurrentSlide();
    if (!slide) {
      // debugger;
    }
    const section = _u.create('section');
    _u.setHTML(section, templates.sectionTemplates.titleAndSubtitle);
    const indicies = window.Reveal.getIndices();

    if (slide.parentNode.nodeName === 'DIV') {
      const containerSection = _u.create('section');
      containerSection.appendChild(_u.clone(slide));
      containerSection.appendChild(section);
      slide.parentNode.insertBefore(containerSection, slide);
      remove(slide);
      const html = getHtml(getReveal());
      initialize(html, true);
    } else if (slide.parentNode.nodeName === 'SECTION') {
      slide.parentNode.insertBefore(section, slide.nextSibling);
      const html = getHtml(getReveal());
      initialize(html, true);
    }
    window.Reveal.navigateTo(indicies.h, indicies.v + 1);
  }


  function refresh() {
    initialize(getHtml(getReveal()), true);
  }

  window.re = {
    config: _config,
    getReveal,
    getAxis,
    addText,
    addImage,
    remove,
    duplicate,
    changeContentDepth,
    toManipulate,
    toEdit,
    toPreview,

    switchToEditMode,
    switchToPreviewMode,

    getHtml,
    initialize,

    setOpacity,

    setFontScale,
    setTextColor,
    setTextBackground,
    setTextAlign,
    setSelectable,

    setImage,

    addNewSection,
    addNewSubSection,
    handleRevealEvents,

    refresh,
  };
})());
