class SudokuSolver {

    constructor(puzzle) {
        this.board = puzzle;
        this.solutionCount = 0;
        this.solutions= [];
        this.visualiserMap = [];
    }
   
    solve(validate = false) {
        // If validate true, check if sudoku has only one solution and is solvable
        let row = undefined;
        let col = undefined;
        let numbers = [1,2,3,4,5,6,7,8,9];

        for (const pos of numberPositions(0, this.board)) {
            // Loop through all the empty cells in given sudoku
            const candidates = [];
            for (let num = 1; num < 10; num++) {
                // Find all posible numbers for this cell, that dont make the board invalid in current state
                if (!this.board[pos.row].includes(num) && !this.column(pos.col).includes(num) && !this.box(pos.row, pos.col).numbers.includes(num)){
                    candidates.push(num);
                }      
            }      

            if(candidates.length <= numbers.length) { 
                // Here we check if this cell has fewer candidate numbers then the previous,
                // we always pick the one with least to avoid unnecessary recursions later if possible                  
                row = pos.row
                col = pos.col
                numbers = [...candidates];
            } 
        }
      
        if(row === undefined) {
            // Check if sudoku is filled
            if(validate) {
                // If we are validating save the solution and continue looking for more untill all posible combinations are exhausted
                // or a second solution is found making sudoku invalid
                this.solutions.push(cloneBoard(this.board))
                this.solutionCount++;
                if(this.solutionCount > 1) {
                    return 'invalid'
                }
                return false;
            }
            return this.board;  
        }

        while(numbers.length > 0) {
            // Pick a random candidate to increase chances of a shorter running time
            const randInd = Math.floor(Math.random()*numbers.length);
            this.board[row][col] = numbers[randInd];
            // Save action for later visualisation if needed
            this.visualiserMap.push({
                cell: `c${row}${col}`,
                value: numbers[randInd]
            })

            numbers.splice(randInd, 1);
            // Recurse
            const next = this.solve(validate);
            if(next){
                // If solved or invalid break out of recursion and return result
                return next;
            }
            this.board[row][col] = 0;
            // If candidate turns out invalid or we are validating backtrack
            this.visualiserMap.push({
                cell: `c${row}${col}`,
                value: 0
            })
            
        }

        return false;  
    }
     visualise() {
        const speed = +document.getElementById(ids.VIS_SPEED_SLIDER).value
        let setSpeed = stepCount => {
            return 10*(11 - speed)*(stepCount+1)
        };
        for (let i = 0; i < this.visualiserMap.length; i++) {
            const step =  this.visualiserMap[i]
            const cell = document.getElementById(step.cell);
            if(step.value) {
                const num = document.createElement('span');
                num.classList.add(classNames.NUMBER, classNames.VISUALISE);
                num.textContent = step.value;
                setTimeout(()=> {
                    cell.innerHTML = '';
                    cell.appendChild(num);
                }, setSpeed(i));
                
            }else{
                setTimeout(()=> {
                    cell.innerHTML = '';
                }, setSpeed(i)); 
            }
        }
    }
  
    column(number) {
        // Sudoku column selector
        let column = [];
        this.board.forEach( row => {
            column.push(row[number]);
        })
        return column;
    }

    box(row, col) {
        //Sudoku box selector
        const spans = [[0, 3], [3, 6], [6,9]];
        let box = new Object;
        spans.forEach(span => {
            if(row >= span[0] && row < span[1]) {
                box.rows = span;
            }
            if(col >= span[0] && col < span[1]) {
                box.cols = span;
            }
        })
        box.numbers = [];
        this.board.slice(box.rows[0], box.rows[1]).forEach(row => {
            box.numbers.push(...row.slice(box.cols[0], box.cols[1]));
        })
        return box;
    } 
}