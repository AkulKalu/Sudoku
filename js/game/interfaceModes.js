import {timerEl} from '../components/mini.js';
import {numpad} from '../components/numpad.js';
import {gameControls} from '../components/gameControls.js';
import {sudokuBuilder} from '../components/sudokuBuilder.js';
import {generator} from '../components/generator.js';
import {visualiser} from '../components/visualiser.js';
import {loginScreen} from '../components/loginScreen.js';
import {layout} from '../components/layout.js';
import {generateSudoku, clearBoard, counter} from './functions.js';

import * as key from '../eventHandlers/keyboard.js';

export function playMode(generate = true) {
    clearInterval(timer);
    let buttons = new DocumentFragment();
    let timerCont = document.getElementById('clock');

    buttons.appendChild(numpad());
    buttons.appendChild(gameControls());
    timerCont.appendChild(timerEl())
    controls.innerHTML = '';
    controls.appendChild(buttons);

    if(generate) {
        generateSudoku();
    }
    clearBoard();

    board.reset();
    document.onkeydown = (e) => {
        key.navigateBoard(e);
        key.numPad(e);
        key.mainControls(e);
    }
    timer = counter();
}

export function setMode() {
    clearInterval(timer);
    const buttons = new DocumentFragment();
    buttons.appendChild(numpad());
    buttons.appendChild(sudokuBuilder());
    controls.innerHTML = '';
    controls.appendChild(buttons);
    clearBoard();

    document.onkeydown = (e) => {
        key.navigateBoard(e);
        key.numPad(e);
      
    }
}

export function generateMode() {
    clearInterval(timer);
    clearBoard();
    controls.innerHTML = '';
    controls.appendChild(generator());
}

export function visualiserMode() {
    clearInterval(timer);
    clearBoard();
    controls.innerHTML = '';
    controls.appendChild(visualiser());
}
export function authenticationMode() {
    document.body.appendChild(loginScreen())
}

export function startApp(load = true) {

    // check if login is from in game
    if(state.loginScreen) {
        state.loginScreen = false;
        selectEl(ids.LOGIN_SCREEN).remove();
    }

    if(load) {
        document.body.prepend(layout());
        controls = document.getElementById(ids.CONTROLS_WRAP);
    }

    // 

    const save = storage().activeUser ? storage().activeUser.save : null;
    // if there is a save dont generate sudoku
    if(save) {
        board.solution = save.solution;
        board.mint = save.board;
        playMode(false);
        board.errors = save.errors;
        board.moves = save.moves;
    }else {
        playMode(save ? false : true);
    }
}

if(state.loginScreen) {
    authenticationMode();
}else {
    startApp();
}
