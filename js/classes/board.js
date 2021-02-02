
class Board extends SudokuSolver { 
    constructor() {
        super();  
        this.focused = undefined;
        this.pointer = null;
        this.noteMode = false;
        this.steps = [];
        this.hints = 3;
        this.cells = document.querySelectorAll('.' + classNames.CELL);
        this.moves = 0;
        this.errors = 0;
        this.emptyTemplate = [
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


    printBoard(board = this.mint) {
        // Print board to DOM
        this.board = cloneBoard(board);
        for (const position of numberPositions()) {
            const {row, col} = position;
            const cell = new Cell(document.getElementById(`c${row}${col}`), board);
            if(cell.isNoteCell()) {
                // In case that we are printing saved sudoku or we are retracing steps
                cell.classHandler(classNames.NOTE_CELL,true);
                cell.printNoteCell(cell.localValue());
            }else if(cell.localValue() > 0) {
                if(this.mint[row][col]) {
                    cell.printCell(cell.localValue());
                }else {
                    // If are retracing steps update DOM with animation
                    cell.updateDOMCell(cell.localValue());
                }
            }
        }
    }
    reset(board = this.mint) {
        this.focused = undefined;
        this.pointer = null;
        this.noteModeHandle(false);
        this.steps = [];
        this.hints = 3;
        this.errors = 0;
        this.moves = 0;
        this.cells = document.querySelectorAll('.' + classNames.CELL);
        this.focusedCol = [];
        this.focusedRow = [];
        this.printBoard(board);
    }
    
    focus(target, fast=false) {
        this.highlight(false, fast);
        if(this.pointer === target.id)  {
            // Clear focus if clicked on a focused cell
            this.pointer = null;
            this.focused = undefined;
            this.markNumberOnBoard();
            return;
        }

        this.focused = new Cell(target, this.board);
        this.focusedRow = [];
        this.focusedCol = [];
        this.pointer = target.id
    
        for (let i = 0; i < 9; i++) { 
            // Cash all cells in row and column of focused cell
            const rowId =  `c${this.focused.row}${i}`,
                  colId = `c${i}${this.focused.col}`;

            if(rowId !== this.focused.id) {
                this.focusedRow.push(new Cell(document.getElementById(rowId)));
            }
            if(colId !== this.focused.id) {
                this.focusedCol.push(new Cell(document.getElementById(colId)));
            }
        }
        this.markNumberOnBoard();
        if(this.mint[this.focused.row][this.focused.col]) {
            // If clicked on a known number remove focuse to not allow change but highlight
            this.focused = undefined;
        } 
        this.highlight(true, fast);
        
    }

    highlight(state, fast) {
        // Highlight row, column
        if(this.focusedRow) {
            const focusedCells = [...this.focusedCol, ...this.focusedRow]; 
            for (const cell of focusedCells) {
                // If state is false turn off highlight
                cell.classHandler(classNames.HIGHLIGHT, state);
            }
            if(state) {
                let delay = 0.04;
                while (focusedCells.length > 0 ) {
                    const ind = Math.floor(Math.random() * focusedCells.length)
                    const pick = focusedCells[ind];
                    focusedCells.splice(ind, 1);
                    if(fast) {
                        // If fast turn off animation
                        pick.cell.style.animationDelay = '';
                        pick.classHandler(classNames.HIGHLIGHT, state);
                    }else{
                        pick.cell.style.animationDelay = `${delay}s`
                        pick.classHandler(classNames.HIGHLIGHT, state); 
                         }
                    delay += 0.04; 
                }
            }
           
        }       
    }
    markNumberOnBoard(number=undefined) {
        // Mark all numbers on board equal to focused cell number
      for (let i = 0; i < this.cells.length; i++) {
          const cell = new Cell(this.cells[i], this.board);
          cell.classHandler(classNames.ADDED, false)
          if(!this.focused) {
              continue;
          }
          if(number) {
            // Mark on number input
              if(this.focused.id !== cell.id && number === cell.localValue()) {
                cell.classHandler(classNames.ADDED, true);
              }
          }else{
            //  Mark on cell focus
            if(this.focused.localValue() !== 0 && this.focused.id !== cell.id && this.focused.localValue() === cell.localValue()) {
                cell.classHandler(classNames.ADDED, true);
            }
          }
          
      }
    }
    addLocal(number) {
        // Add number to local array
        const current = this.board[this.focused.row][this.focused.col]
        if(this.noteMode) {
            if(typeof current === 'object') {
                this.board[this.focused.row][this.focused.col].push(number)
            }else{
                this.board[this.focused.row][this.focused.col] = [number];
            }
        }else {
            this.board[this.focused.row][this.focused.col] = number;
            this.moves++;
        }
    }
    removeFromLocal(value=0) {
        // Remove from local array
        if(!value) {
            if(!this.focused.isNoteCell() && this.focused.localValue() !== 0) {
                this.moves++;
            }
            this.board[this.focused.row][this.focused.col] = 0;
        }else if(value === 'Backspace') { 
            this.board[this.focused.row][this.focused.col].pop();
        }else {
            const ind = this.board[this.focused.row][this.focused.col].indexOf(value);
            this.board[this.focused.row][this.focused.col].splice(ind , 1);  
        }
        
    }
    hint() {
        if(this.hints) {
            const hint = this.solution[this.focused.row][this.focused.col];
            this.hints -= 1;
            this.noteMode = false;
            this.addLocal(hint);
            this.focused.updateDOMCell(hint);
            this.focus(this.focused.cell);
        }   
    }
    addNumber(number) {
        if(this.steps.length === 0) {
            // If first move save starting board state as first stepp
            this.takeSnapshot();   
        }
        if(this.noteMode) { 
            if(!this.focused.isNoteCell() && this.focused.localValue() !== 0 ) {
                this.focused.clear();
            }
            this.focused.classHandler(classNames.NOTE_CELL, true);
        }else {
            if(this.focused.localValue() !== 0 ) {
                this.focused.clear();
            }
            this.focused.classHandler(classNames.NOTE_CELL, false); 
            this.markNumberOnBoard(number);
        }

        this.addLocal(number);
        this.focused.updateDOMCell(number, this.noteMode);
        if(this.validateBoard()) {
            // If board valid and full sudoku is solved
            return true;
        }
        this.validateNotes();
        this.takeSnapshot();
        
        
    }
    removeNumber(number) {
        document.getElementById(`n${this.focused.row}${this.focused.col}${number}`).remove()
        if(this.focused.cell.children.length === 0) {
            this.removeFromLocal()
            this.markNumberOnBoard();
            this.validateBoard();
        }else{
            this.removeFromLocal(number)
        }     
         
    }
    removeNote(noteId = 0) {
        // Special case removing note with backspace key, removes last added note
        if(!noteId) {
            this.focused.cell.lastChild.remove();
        }
    }
    clearFocused() {
        // Clear focused cell
        this.focused.clear();
        this.removeFromLocal();
        this.markNumberOnBoard();
        this.validateBoard();
        this.validateNotes();
    }
    validateBoard() {
        let valid = true;
        let full =  true;

        for (const pos of numberPositions()) {
            const value = this.board[pos.row][pos.col];
            if(value === 0) {
                full = false;
            }
            if(value !== 0 && typeof value !== 'object') {
                // Validate board, and set cell styling approprietly
                const cell = new Cell(document.getElementById(`c${pos.row}${pos.col}`));
                if(this.board[pos.row].filter(n => n===value).length > 1 ||
                    this.column(pos.col).filter(n => n===value).length > 1 ||
                    this.box(pos.row, pos.col).numbers.filter(n => n===value).length > 1){
                        valid = false;
                        if(this.focused.row === pos.row && this.focused.col === pos.col) {
                            this.errors++;     
                        }
                        cell.numberIsValid(true);
                }else {
                    cell.numberIsValid(false); 
                }
            }
        }
       
        if(full && valid) {
            // Win condition
            return true;
        }
    }
    validateNotes() {
        for (const pos of numberPositions()) {
            const value = this.board[pos.row][pos.col];
            if(typeof value === 'object') {
                value.forEach(note => {
                    if(this.board[pos.row].includes(note) ||
                        this.column(pos.col).includes(note) ||
                        this.box(pos.row,pos.col).numbers.includes(note)){ 
                            Cell.noteIsValid(`n${pos.row}${pos.col}${note}`, false);
                        }else {
                            Cell.noteIsValid(`n${pos.row}${pos.col}${note}`, true);
                        }
                })
            }
        }
    }
    noteModeHandle(state=undefined) {
        // Toggles note mode on/off
        const noteBtn = document.getElementById(ids.NOTE_BTN);
        if(state === undefined) {
            this.noteMode = !this.noteMode;
        }else{
            this.noteMode = state;
        }
        
        if(noteBtn) {
            noteBtn.parentElement.classList.toggle(classNames.NOTE_MODE_ON, this.noteMode);
        }
    }

    takeSnapshot() {
        // Save board state for step tracking
        const snapshot = {
            focusId: this.focused.id,
            mode: this.noteMode,
            board: cloneBoard(this.board),
        };
        
        if(this.stepTrack < this.steps.length - 1) {        
            this.steps=this.steps.slice(0, this.stepTrack + 1);
        }
        this.steps.push(snapshot);
        this.stepTrack = this.steps.length - 1;
       
    }

    steppControll(step) {
            this.board = cloneBoard(step.board); 
            this.pointer = null;
            this.printBoard(this.board);
            this.validateBoard();
            this.validateNotes();       
            this.focus(document.getElementById(step.focusId), true);
            this.noteModeHandle(step.mode);  
    }
    undo() { 
        if(this.stepTrack > 0) {
            this.stepTrack -= 1;
            this.steppControll(this.steps[this.stepTrack]);         
        }else {
            console.log('s');
            this.steppControll(this.steps[0]); 
        }
    }

    redo() {
        if(this.stepTrack < this.steps.length -1) {
            this.stepTrack += 1;
            this.steppControll(this.steps[this.stepTrack]);
        }else {
            this.steppControll(this.steps[this.steps.length - 1]);
        }
    }

}
















