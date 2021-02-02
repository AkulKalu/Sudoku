async function serverSide(payload, onSucces=() => null, onError=() => null) {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(payload)
    }
    const response = await fetch('profiles.php', options);
    if(response.ok) {
        const data = await response.json().catch(e => console.log(e));
        if(data.error) {
            onError(data.error)
        }else {
            onSucces(data);
        }
    }else {
        onError(response.statusText);
    }
}


function *numberPositions(number = -1 , board=null) {
    // Generator for cell positions, if number is -1  return all else only cells containing the number if board is provided
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            if(number === -1) {
                yield {row:row, col:col}
            }else if (board[row][col] === number) {
                yield {row: row, col:col}
            }
        } 
    }
}

function  cloneBoard(board) {
    // Deep copy board array
    const clone = [];
    board.forEach( el => {
        if(typeof el === 'object') {
            clone.push(this.cloneBoard(el));
        }else {
            clone.push(el)}
    });
    return clone;
}

function chainAnimationDelays(elements, delaymodifier, random=false) {
    let delay = delaymodifier;
    for (let i = 0; i < elements.length; i++) {
        elements[i].style.animationDelay = random ? `${(Math.random()*delaymodifier).toFixed(1)}s` : `${delay}s`;
        elements[i].onanimationend = () => {
            elements[i].style.animation = '';
        }
        delay += delaymodifier;
    }
}
function storage (set = null) {
    if(set) {
        return sessionStorage.setItem('sudokuStorage',JSON.stringify(set));
    }else {
        return JSON.parse(sessionStorage.getItem('sudokuStorage'));
    }
    
}

function selectEl(id) {
    return document.getElementById(id);
}


function replace(elementId, withElement) {
    const el = document.getElementById(elementId);
    el.replaceWith(withElement);
}


function flashMessage(content) {
    const boardEl = document.getElementById(ids.BOARD);
    const message = document.createElement('div');
    message.classList.add(classNames.MESSAGE);
    message.textContent = content;
    boardEl.appendChild(message);
    setTimeout(()=> {
        boardEl.lastChild.remove()
    }, 3000)
}

function menuSwitch() {
    // mobile menu button switch handler
    if(window.innerWidth < 1025 )  {
        const menu =  document.getElementById(ids.MAIN_MENU_WRAP);
        if(state.mobMenuOpen) {
            mobileMenuBtn.classList.toggle('mob-menu-active', false);
            menu.style.display = '';
            state.mobMenuOpen = false;
        }else {
            menu.style.display = 'flex';
            mobileMenuBtn.classList.toggle('mob-menu-active', true);
            state.mobMenuOpen = true;
        }
    } 
}

function clearSave() {
    const save = storage().activeUser ? storage().activeUser.save : null;
    if(save) {
        storage({
            activeUser: {
                ...user,
                save: null
            }
        });
        serverSide({
            action: 'clearSave',
            token: user.token,
        }, () => null, () => null)
    }
}

function createCellElement(position) {
    const cell = document.createElement('div');
    cell.classList.add(classNames.CELL);
    cell.setAttribute('data-row', position.row);
    cell.setAttribute('data-col', position.col);
    cell.id = `c${position.row}${position.col}`;
    return cell;      
}

function createNumberElement(cellId, number, note = false) {
    const numContainer = document.createElement('span');
        numContainer.id = `n${cellId.slice(1)}${number}`;
        note ? numContainer.classList.add('note'): numContainer.classList.add(classNames.NUMBER);
        numContainer.textContent= number;
        return numContainer;
}

function createBoxElement(idNum) {
    const box = document.createElement('div');
    box.classList.add(classNames.BOX);
    box.id = `box${idNum}`;
    return box;
}

