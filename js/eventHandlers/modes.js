import {validateSudoku, clearBoard, gradePuzzle, generateSudoku} from '../game/functions.js';
import {playMode} from '../game/interfaceModes.js';

export function setSudokuControls(e) {
    switch (e.target.id) {
        case ids.SET_SUDOKU_BTN:
            if(validateSudoku()) {
                board.mint = cloneBoard(board.board);
                board.solution = null;
                playMode();
            }
            break;
        case ids.VALIDATE_BTN:
            validateSudoku()
            break;
        case ids.RATE_BTN:
            gradePuzzle(cloneBoard(board.board))
            .then(grade => flashMessage(grade.difficulty));
            break;
    }
}
export function visualiserControls(e) {
    switch (e.target.id) {
        case ids.VIS_RUN_BTN:
            const solver = new SudokuSolver(cloneBoard(board.mint));
            solver.solve();
            clearBoard(true);
            board.reset();
            solver.visualise();
            break;
        case ids.VIS_GEN_BTN:
            clearBoard(true);
            generateSudoku(0, true)
    }
}
export function generateSudokuControls(e) {
    switch (e.target.id) {
        case ids.GEN_RUN_BTN:
            const limit = +document.getElementById(ids.GEN_LIMITER).value
            if(isNaN(limit)) {
                flashMessage('Enter a valid number');
            }else{
                clearBoard(true);
                generateSudoku(limit , true);
                document.getElementById(ids.GEN_PLAY_BTN).disabled = false;
            }
            break;
        case ids.GEN_PLAY_BTN:
            playMode(false);
    }
}