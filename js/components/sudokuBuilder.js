import {setSudokuControls} from '../eventHandlers/modes.js';

export function sudokuBuilder() {
    const el = document.createElement('div');
    el.innerHTML =`     
                    <span id=${ids.SET_SUDOKU_BTN} class="btn">SET</span>
                    <span id=${ids.VALIDATE_BTN} class="btn">VALIDATE</span>
                    <span id=${ids.RATE_BTN} class="btn">RATE</span>
                   `
    el.id = ids.SET_CONTROLS;
    el.onclick =  setSudokuControls;
    el.className = "flex-col-c widget"
    chainAnimationDelays( el.children , 0.1)
    return el;
}