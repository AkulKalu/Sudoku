import {cellLeftClick} from '../eventHandlers/play.js';


export function boardEl(fastDispaly) { 
    const cells = [];
    const boxes = [];
    const board = document.createElement('div');

    for (const position of numberPositions()) {
        cells.push(createCellElement(position))
    }
  
    for (let i = 1; i < 10; i++) {
        boxes.push(createBoxElement(i));
    }
    
    let count = 0;
    let boxInd = 1;

    for (const cell of cells) {
        if (count % 3 === 0 && count !== 0) {
            if (count % 27 === 0) {
                boxInd++;
            }else if (count % 9 === 0) {
                boxInd -= 2;
            }else {     
                boxInd++;
            }             
        }
        boxes[boxInd-1].appendChild(cell);
        count++;
    }

    board.className = 'grid-3 board';
    board.id = ids.BOARD;
   
    const delay = [0.1];
    for (let i = 0; i < 9; i++) {
        delay.push(delay[i]+0.1)
    }
    
    boxes.forEach( box => {
        if(!fastDispaly) {
            const pick = Math.floor(Math.random()*delay.length);
            box.style.animation = 'fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both';
            box.style.animationDelay = `${delay[pick]}s`;
            delay.splice(pick, 1);
        }
        board.appendChild(box);
    })
    board.onclick =  cellLeftClick;

    return board;         
} 
