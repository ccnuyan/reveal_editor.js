class StoreService {
  constructor() {
    this.selectedBlocks = [];
  }

  setCurrentSection(section) {
    this.currentSection = section;
    this.selectedBlocks = [];
  }

  selectBlock = (block) => {
    this.selectedBlocks = [block];
  }

  selectBlocks = (blockArr) => {
    this.selectedBlocks = blockArr;
  }

  set = (block) => {
    this.blocks = [block];
  }

  removeSelectedBlocks = () => {
    this.selectedBlocks.forEach((block) => {
      block.remove();
    });

    this.blocks = [];
  }
}

export default StoreService;
