import _ from 'lodash';
import _u from 'util';

// const html = `
//     <div data-man="delete"  style="position:absolute;right:0;top:0;height:200px;width:200px" class="man">
//         <button style="width:200px;height:200px;font-size:100px" class="button-hollow icon-bin"></button>
//     </div>
//     <div data-man="left" style="position:absolute;left:0;top:50%;height:200px;width:200px;margin-top:-100px" class="man move-left">
//         <button style="border-radius:100px;width:200px;height:200px;font-size:100px" class="button-hollow icon-arrow-left"></button>
//     </div>
//     <div data-man="right" style="position:absolute;right:0;top:50%;height:200px;width:200px;margin-top:-100px" class="man move-right">
//         <button style="border-radius:100px;width:200px;height:200px;font-size:100px" class="button-hollow icon-arrow-right"></button>
//     </div>
//     <div data-man="up" style="position:absolute;top:0;left:50%;height:200px;width:200px;margin-left:-100px" class="man move-up">
//         <button style="border-radius:100px;width:200px;height:200px;font-size:100px" class="button-hollow icon-arrow-up"></button>
//     </div>
//     <div data-man="down" style="position:absolute;bottom:0;left:50%;height:200px;width:200px;margin-left:-100px" class="man move-down">
//         <button style="border-radius:100px;width:200px;height:200px;font-size:100px" class="button-hollow icon-arrow-down"></button>
//     </div>
// `;

const borderStyle = 'style="border-radius:100px;width:200px;height:200px;font-size:100px;border:15px;background:#777"';

const ManDelete = (manipulator) => {
  this.manipulator = manipulator;
  this.element = _u.create('div', 'man', {
    position: 'absolute',
    left: '50%',
    Top: '0%',
    height: '200px',
    width: '200px',
    marginLeft: '-100px',
  });
  _u.setHTML(this.element,
        `<button ${borderStyle} class="button-hollow icon-bin"></button>`);
  this.element.addEventListener('click', () => {
    switch (this.manipulator.sectionType) {
      case 'onlysection':
        break;
      default:
        _u.remove(this.manipulator.section);
        break;
    }
    window.RevealEditor.refresh();
  });
  this.manipulator.element.appendChild(this.element);
};

const ManSubDelete = (manipulator) => {
  this.manipulator = manipulator;
  this.element = _u.create('div', 'man', {
    position: 'absolute',
    right: 0,
    top: 0,
    height: '200px',
    width: '200px',
  });
  _u.setHTML(this.element,
        `<button ${borderStyle} class="button-hollow icon-bin"></button>`);
  this.element.addEventListener('click', () => {
    switch (this.manipulator.sectionType) {
      case 'onlysubsection':
        break;
      case 'onlysection':
      case 'firstsection':
      case 'lastsection':
      case 'section':
        _u.remove(this.manipulator.section.firstChild);
        break;
      default:
        _u.remove(this.manipulator.section);
        break;
    }
    window.RevealEditor.refresh();
  });
  this.manipulator.element.appendChild(this.element);
};

const ManMoveLeft = (manipulator) => {
  this.manipulator = manipulator;
  this.element = _u.create('div', 'man', {
    position: 'absolute',
    left: 0,
    bottom: '50%',
    height: '200px',
    width: '200px',
    marginBottom: '-100px',
  });
  _u.setHTML(this.element,
        `<button ${borderStyle} class="button-hollow icon-arrow-left"></button>`);
  this.element.addEventListener('click', () => {
    console.log('man left click');
  });
  this.manipulator.element.appendChild(this.element);
};

const ManMoveRight = (manipulator) => {
  this.manipulator = manipulator;
  this.element = _u.create('div', 'man', {
    position: 'absolute',
    right: 0,
    bottom: '50%',
    height: '200px',
    width: '200px',
    marginBottom: '-100px',
  });
  _u.setHTML(this.element,
        `<button ${borderStyle} class="button-hollow icon-arrow-right"></button>`);
  this.element.addEventListener('click', () => {
    console.log('man right click');
  });
  this.manipulator.element.appendChild(this.element);
};

const ManMoveUp = (manipulator) => {
  this.manipulator = manipulator;
  this.element = _u.create('div', 'man', {
    position: 'absolute',
    left: '50%',
    top: 0,
    height: '200px',
    width: '200px',
    marginLeft: '-100px',
  });
  _u.setHTML(this.element,
        `<button ${borderStyle} class="button-hollow icon-arrow-up"></button>`);
  this.element.addEventListener('click', () => {
    console.log('man up click');
  });
  this.manipulator.element.appendChild(this.element);
};

const ManMoveDown = (manipulator) => {
  this.manipulator = manipulator;
  this.element = _u.create('div', 'man', {
    position: 'absolute',
    left: '50%',
    bottom: 0,
    height: '200px',
    width: '200px',
    marginLeft: '-100px',
  });
  _u.setHTML(this.element,
        `<button ${borderStyle} class="button-hollow icon-arrow-down"></button>`);
  this.element.addEventListener('click', () => {
    console.log('man down click');
  });
  this.manipulator.element.appendChild(this.element);
};

function SectionManipulator(parentSection) {
  if (!parentSection) {
    throw new Error('parentSection is required');
  }
  this.section = parentSection;

  if (this.section.parentNode.nodeName === 'DIV') {
    this.element = _u.create('div', ['overviewing-ui', 'manipulator', 'dead-center'], {
      zIndex: 255,
      width: '90%',
      height: '90%',
    });

    const childNodes = _.filter(this.section.parentNode.childNodes, (node) => {
      return node.nodeName === 'SECTION';
    });
    if (this.section.isSameNode(childNodes[0]) && this.section.isSameNode(childNodes[childNodes.length - 1])) {
      this.sectionType = 'onlysection';
    } else if (this.section.isSameNode(childNodes[0])) {
      this.sectionType = 'firstsection';
      ManMoveRight(this);
      ManDelete(this);
    } else if (this.section.isSameNode(childNodes[childNodes.length - 1])) {
      this.sectionType = 'lastsection';
      ManMoveLeft(this);
      ManDelete(this);
    } else {
      this.sectionType = 'section';
      ManMoveLeft(this);
      ManMoveRight(this);
      ManDelete(this);
    }

        // first sub section's man located at it's parent
    const nodes = _.filter(this.section.childNodes, (node) => {
      return node.nodeName === 'SECTION';
    });
    if (nodes.length > 1) {
      ManSubDelete(this);
      ManMoveDown(this);
    }
  } else if (this.section.parentNode.nodeName === 'SECTION') {
    this.element = _u.create('div', ['overviewing-ui', 'manipulator', 'dead-center'], {
      zIndex: 255,
      width: '90%',
      height: '90%',
    });

    const childNodes = _.filter(this.section.parentNode.childNodes, (node) => {
      return node.nodeName === 'SECTION';
    });
    if (this.section.isSameNode(childNodes[0]) && this.section.isSameNode(childNodes[childNodes.length - 1])) {
            // only sub section's man located at it's parent
      this.sectionType = 'onlysubsection';
    } else if (this.section.isSameNode(childNodes[0])) {
            // first sub section's man located at it's parent
      this.sectionType = 'firstsubsection';
    } else if (this.section.isSameNode(childNodes[childNodes.length - 1])) {
      this.sectionType = 'lastsubsection';
      ManMoveUp(this);
      ManSubDelete(this);
    } else {
      this.sectionType = 'subsection';
      ManMoveUp(this);
      ManMoveDown(this);
      ManSubDelete(this);
    }
  }

  this.section.appendChild(this.element);

  Reveal.addEventListener('overviewshown', () => {
    _u.show(this.element);
  });
  Reveal.addEventListener('overviewhidden', () => {
    _u.hide(this.element);
  });
  if (Reveal.isOverview()) {
    _u.show(this.element);
  } else {
    _u.hide(this.element);
  }
}

export default SectionManipulator;
