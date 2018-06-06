
export const colorS = ['red', 'green', 'blue', 'yellow'];
const MAX_X = 10;
const MAX_Y = 10;


export class Block {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.color = colorS[Math.floor(Math.random() * colorS.length)];
  }
}

export class BlockGrid {
  constructor() {
    this.grid = [];
    for (let x = 0; x < MAX_X; x++) {
      let col = [];
      for (let y = 0; y < MAX_Y; y++) {
        col.push(new Block(x, y));
      }
      this.grid.push(col);
    }
    return this;
  }

  render(el = document.querySelector('#gridEl')) {
    for (let x = 0; x < MAX_X; x++) {
      let id = 'col_' + x;
      let colEl = document.createElement('div');
      colEl.className = 'col';
      colEl.id = id;
      el.appendChild(colEl);
      for (let y = MAX_Y - 1; y >= 0; y--) {
        let block = this.grid[x][y],
          id = `block_${x}x${y}`,
          blockEl = document.createElement('div');
        blockEl.id = id;
        blockEl.className = 'block';
        blockEl.style.background = block.color;
        blockEl.addEventListener('click', evt => this.blockClicked(evt, block));
        colEl.appendChild(blockEl);
      }
    }
    return this;
  }

  blockClicked(e, block) {
    const blocks = [];
    this.locate(block, blocks);
    if (!blocks.length) return

    this.refillBoard(blocks);
    BlockGrid.startOver();
    this.render();
  }

  locate(block, blocks) {
    if (blocks.includes(block) || !BlockGrid.isValidBlock(block)) return false;
    blocks.push(block);

    [ this.getBlock(block.x - 1, block.y),
      this.getBlock(block.x, block.y + 1),
      this.getBlock(block.x + 1, block.y),
      this.getBlock(block.x, block.y - 1),
    ].forEach(adjacentBlock => {
      if (adjacentBlock && BlockGrid.isEqualBlock(block, adjacentBlock)) {
        this.locate(adjacentBlock, blocks);
      }
    });
    return true;
  }

  refillBoard(blocks) {
    if (!blocks.length) return;
    
    blocks.forEach(block => {
      BlockGrid.clearBlock(block);

      const col = this.grid[block.x];
      this.grid[block.x] = [
        ...col.slice(0, block.y),
        ...col.slice(block.y + 1),
        block,
      ];

      this.grid[block.x].forEach((movedBlock, index) => {
        if (movedBlock) {
          movedBlock.y = index;
        }
      });
    });
  }

  getBlock(x, y) {
    if (!this.grid[x] || !this.grid[x][y]) return undefined;
    return this.grid[x][y];
  }





  
  static startOver() {
    document.querySelector('#gridEl').innerHTML = '';
  }

  static isEqualBlock(left, right) {
    return left && right && left.color === right.color;
  }

  static isValidBlock(block) {
    if (!block) return false;
    return colorS.indexOf(block.color) > -1;
  }

  static clearBlock(block) {
    if (block)  block.color = 'transparent';
  }

}

window.addEventListener('DOMContentLoaded', () => new BlockGrid().render());
