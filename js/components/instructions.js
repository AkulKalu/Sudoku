

export function instructions() {
    const el = document.createElement('div');
    el.innerHTML =` <div class="instructions pos-fix">
                        <button class="hov-yell" id=${ids.INS_CLOSE} type="button">X</button>
                        <h1>Help and Game Instructions</h1>
                        <p>
                        The classic Sudoku game involves a grid of 81 squares. The grid is divided into nine blocks, each containing nine squares.
                        </p>
                        <p>
                        The rules of the game are simple: each of the nine blocks has to contain all the numbers 1-9 within its squares. Each number can only appear once in a row, column or box.
                        </p>
                        <p>
                        The difficulty lies in that each vertical nine-square column, or horizontal nine-square line across, within the larger square, must also contain the numbers 1-9, without repetition or omission.
                        </p>
                        <p>
                        Every puzzle has just one correct solution.
                        </p>
                        <div>
                            <h2>Keyboard controls</h2>
                            <p>↑ → ↓ ← - arrow keys to navigate the board </p>
                            <p>U - undo move</p>
                            <p>R - redo move</p>
                            <p>N - note mode</p>
                            <p>Backspase - clear note</p>
                            <p>C - clear cell</p>
                        </div>
                    </div>`

    el.id = ids.INSTRUCTIONS;
    return el;
}