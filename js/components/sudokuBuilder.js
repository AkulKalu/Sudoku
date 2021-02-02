import {setSudokuControls} from '../eventHandlers/modes.js';

export function sudokuBuilder() {
    const el = document.createElement('div');
    el.innerHTML =` <div class=${classNames.SET_MOBILE}>
                        <span id=${ids.SET_SUDOKU_BTN} class=${classNames.BTN_NORMAL}>SET</span>
                        <span id=${ids.VALIDATE_BTN} class=${classNames.BTN_NORMAL}>VALIDATE</span>
                        <span id=${ids.RATE_BTN} class=${classNames.BTN_NORMAL}>RATE</span>
                    </div>`
    el.id = ids.SET_CONTROLS;
    el.onclick =  setSudokuControls;
    el.classList.add(classNames.WIDGET);
    chainAnimationDelays( el.children , 0.1)
    return el;
}