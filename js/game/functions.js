import {boardEl} from '../components/board.js';

export function counter() {
    // timer function
    let time = [0, 0, 0];
    let timeInSeconds = 0;
    const hours = document.getElementById(ids.HOURS);
    const minutes = document.getElementById(ids.MINUTES);
    const seconds = document.getElementById(ids.SECONDS);

    const timer = () => {
        time[2] += 1;
        timeInSeconds += 1
        if(time[2] === 60) {
            time[1] +=1;
            time[2] = 0;
        }
        if(time[1] === 60) {
            time[0] += 1;
            time[1] = 0;
        }
        hours.textContent = time[0] < 10 ? `0${time[0]}`: time[0];
        minutes.textContent = time[1] < 10 ? `0${time[1]}`: time[1];
        seconds.textContent = time[2] < 10 ? `0${time[2]}`: time[2];
        // save most recent time
        board.finalTime = {
            formated: `${time[0]}h ${time[1]}m ${time[2]}s`,
            inSeconds: timeInSeconds,
        };
    }
    return setInterval(timer, 1000);
}

export function avalibleInput() {
    const numberButtons = document.querySelectorAll('.numpad-key');

    function buttonAdded(btn, state) {
        btn.classList.toggle('marked', state);
    }

    for (const btn of numberButtons.values()) {
        if(!board.focused) {
            buttonAdded(btn, false);
            continue;
        }  
        if(board.focused.isNoteCell()) {
            if(board.noteMode) {
                if(board.focused.localValue().includes(+btn.id[8])) {
                    buttonAdded(btn, true);
                }else {
                    buttonAdded(btn, false);
                }
            }else {
                buttonAdded(btn, false);
            }
            
        }else {
            if(board.focused.localValue() === +btn.id[8]) {
                buttonAdded(btn, true);
            }else {
                buttonAdded(btn, false);
            }
        }
    }
}

export function clearBoard(fastDispaly=false) {
    const boardWrap = document.getElementById(ids.BOARD_WRAP);
    boardWrap.innerHTML= '';
    boardWrap.appendChild(boardEl(fastDispaly));
}

export function stepp(stepp) {
    if(board.steps.length > 0) {
        clearBoard(true);
        stepp === 'undo' ?  board.undo() : board.redo();
    }
}

export async function gradePuzzle(puzzle) {
    const url = 'https://sugoku.herokuapp.com/grade';
    // mumbo jumbo required by sugoku API to read board array
    const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')
    const encodeParams = (params) => Object.keys(params).map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`).join('&');
    // 
    let data = await fetch(url, {
        method: 'POST',
        body: encodeParams({board:puzzle}),
        headers: { 'Content-Type': 'application/x-www-form-urlencoded'}
    })
    data = await data.json();
    return data    
}


export function validateSudoku() {
    // count filled cells
    let countKnown = 0;
    for (const pos of numberPositions()) {
        if(board.board[pos.row][pos.col]) {
            countKnown++;
        }
    }
    if(countKnown < 17) {
        flashMessage('At least 17 cells need to be known');
        return;
    }
    const solver = new SudokuSolver(cloneBoard(board.board));
    const boardStatus = solver.solve(true);

    switch (boardStatus) {
        case 'invalid':
            flashMessage('More than one solution');
            return false;
        default:
            flashMessage('Valid');
            return true;
    }
}

export function generateSudoku(limit=0, displaySudoku = false) {
    const generator = new SudokuGenerator();
    board.solution = cloneBoard(generator.generateBoard());
    board.mint = generator.removeNumbers(limit);
    displaySudoku ? generator.displaySudoku() : null;
    gradePuzzle(board.mint).then( grade => board.difficulty = grade.difficulty );
}
