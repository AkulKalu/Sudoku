
class Cell {

    constructor(cellElement, board = undefined) {
        this.localBoard = board;
        this.cell = cellElement;  
        this.id = cellElement.id;
        this.row = parseInt(cellElement.id[1]);
        this.col = parseInt(cellElement.id[2]);
        this.position = {row:this.row, col:this.col}
    }

    classHandler(cls, state) {
        this.cell.classList.toggle(cls, state)
    }
    clear() {
        if(this.cell.children.length > 0) {
            this.cell.innerHTML = '';
        }
    }
    updateDOMCell(number, note=false) {
        const numElemenet = createNumberElement(this.id, number, note);
        numElemenet.style.animation = "slide-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) backwards";
        this.cell.appendChild(numElemenet);
    }
    printCell(number) {
        const numElemenet = createNumberElement(this.id, number);
        this.cell.appendChild(numElemenet);
    }
    printNoteCell(notes) {
        notes.forEach(note => {
            this.cell.appendChild(createNumberElement(this.id, note, true));
        } )
    }
    isNoteCell() {
        return typeof this.localBoard[this.row][this.col] === 'object';
    }
    localValue() {
        return this.localBoard[this.row][this.col];  
    }
    numberIsValid(state) {
        this.cell.firstElementChild.classList.toggle('num-invalid', state);
    }
    static noteIsValid(id, state) {
        const note = document.getElementById(id);
        state ?  note.style.opacity = '': note.style.opacity = '0.5' ;
    } 
}  