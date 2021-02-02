import {puzzleSolved} from '../game/winScript.js';
import {avalibleInput, stepp, clearBoard, counter} from '../game/functions.js';

export function numpadControl(e) {
    if(board.focused) {
        if(e.target.id.startsWith(ids.INPUT_NUM)) {
            const num = +e.target.textContent;
            if(e.target.classList.contains(classNames.ADDED)) {
                board.removeNumber(num);
            }else{
                // add number and check if solved
                if(board.addNumber(num)) {
                    puzzleSolved();
                }
            }
        }
        avalibleInput();
    }
}
export function boardControls(e) {
    if(board.focused) {
        switch (e.target.id) {
            case ids.NOTE_BTN:
                board.noteModeHandle();
                break;
            case ids.CLEAR_BTN:
                board.clearFocused();
                break;
            case ids.HINT_BTN:
                board.hint();
                break;
            case ids.UNDO_BTN:
                stepp('undo');
                break;
            case ids.REDO_BTN:
                stepp('redo');
                break;
            case ids.RESET_BTN:
                clearBoard(true);
                clearInterval(timer);
                board.reset();
                timer = counter();
                break;
            case ids.SOLUTION_BTN:
                clearInterval(timer);
                clearBoard(true);
                board.printBoard(board.solution);
        }
        avalibleInput();
    }
}

export function cellRightClick(e) {
    e.preventDefault();
    if(board.focused && e.target === board.focused.cell){
        board.noteModeHandle();
    }
    return false;
}
export function cellLeftClick(e) {
    board.noteModeHandle(false); 
    if(e.target.id.startsWith(ids.CELL)){       
        board.focus(e.target);
        avalibleInput();
    }
}