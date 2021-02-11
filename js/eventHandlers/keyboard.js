import {puzzleSolved} from '../game/winScript.js';
import {avalibleInput, stepp, clearBoard} from '../game/functions.js';

export function numPad(e) {
    if(board.focused) {
        if('123456789'.search(e.key) !== -1 ) {
            if(document.getElementById(ids.INPUT_NUM + e.key).classList.contains('marked')) {
                board.removeNumber(+e.key)
            }else{
                if(board.addNumber(+e.key)) {
                    puzzleSolved();
                }
            }  
        }
    }
    avalibleInput();
}

export function mainControls(e) {
    if(board.focused) {
        switch (e.key) {
            case 'c':
                board.clearFocused();
                avalibleInput();    
                break;
            case 'Backspace':
                if(board.noteMode) {
                    board.removeNote();
                    board.removeFromLocal(e.key);
                    }
                break;
            case 'n':
                board.noteModeHandle();
                break;
            case 'u':
                stepp('undo');
                break;
            case 'r':
                stepp('redo');
                break;
            case 'h':
                board.hint();
                break;
            case 's':
                clearInterval(timer);
                clearBoard(true);
                board.printBoard(board.solution);
                break;
            case 'n':
                clearInterval(timer);
                clearBoard(true);
                board.reset();
                timer = counter();
                break;
        }
    }
    avalibleInput();
}

export function navigateBoard(e) {
    if(e.key.includes('Arrow')) {
        e.preventDefault();
        const stear = direction => {
            let idr = board.focusedRow[0].row;
            let idc = board.focusedCol[0].col;
          
            switch (direction) {
                case 'Left':
                    idc > 0 ? idc -= 1:idc;
                    break;
                case 'Right':
                    idc < 8 ? idc += 1:idc;
                    break;
                case 'Up':
                    idr > 0 ? idr -= 1:idr;
                    break;
                case 'Down':
                    idr < 8 ? idr += 1:idr;
                    break;
            }
            return ids.CELL + idr + idc;
        }
        if(!board.pointer) {
            // if no focused cell, focuse to the middle
           board.focus(document.getElementById(ids.CELL+'44'), true);
        }else {
            board.focus(document.getElementById(stear(e.key.slice(5))), true);
        } 
    }
    avalibleInput();
}