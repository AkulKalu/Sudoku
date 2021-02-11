class SudokuGenerator {
    constructor() {
        this.template = [
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0]
        ]
    }
    
    generateBoard() {
        // Generate a full valid sudoku board
        const solver = new SudokuSolver(this.template);
        solver.solve();
        return this.template;
    }
    removeNumbers(limit=0) {
        // Removes numbers till set limit or till the minimum possible knowns limit is reached, 
        // every sudoku is unique and has only one solution
        const positions = [...numberPositions()];
        let removedCount = 0;
        while (positions.length > 0 && removedCount !== 81 - limit) {
            // Pick a random cell to remove number from 
            const randInd = Math.floor(Math.random()*positions.length);
            const pos = positions[randInd];
            positions.splice(randInd, 1);
            // Save number in case the board turns out invalid after
            const removed = this.template[pos.row][pos.col];
            // 
            this.template[pos.row][pos.col] = 0;
            // Check if board is valid
            const solver = new SudokuSolver(cloneBoard(this.template));
            if(solver.solve(true) === 'invalid') {
                // If board is invalid rollback and pick another cell
                this.template[pos.row][pos.col] = removed;
            }else {
                removedCount++;
            }
        }
        return this.template;
    }
    displaySudoku() {
        // Display generated sudoku in DOM if required
        for (const pos of numberPositions()) {
            if(this.template[pos.row][pos.col]) {
                const cell = new Cell(document.getElementById(`c${pos.row}${pos.col}`)) 
                cell.updateDOMCell(this.template[pos.row][pos.col]);
            }
        }
    }
}