import {navPuzzle} from '../components/navPuzzle.js';
import {instructions} from '../components/instructions.js';
import {navMenu} from '../components/navMenu.js';
import {generateMode, playMode, visualiserMode, setMode} from '../game/interfaceModes.js';

export function nav(e) {
    switch (e.target.id) {
        case ids.MENU_NEW_BTN:
            replace(ids.MAIN_MENU, navPuzzle())
            break;
        case ids.MENU_VISUALISER_BTN:
            state.menuOpen.close()
            visualiserMode();
            board.reset();
            break;
        case ids.MENU_INSTRUCTIONS_BTN:
            replace(ids.MAIN_MENU, instructions());
            break;
        case ids.INS_CLOSE:
            replace(ids.INSTRUCTIONS, navMenu(false));
            break;
        case ids.MENU_RANDOM_BTN:
            clearSave();
            playMode();
           state.menuOpen.close()
            break;
        case ids.MENU_SETSUDOKU_BTN:
           state.menuOpen.close()
            setMode();
            board.reset(cloneBoard(board.emptyTemplate));
            break;
        case ids.MENU_GENERATE_BTN:
            state.menuOpen.close()
            generateMode();
            break;
        case ids.MENU_BACK_BTN:
            replace(ids.PUZZLES_MENU, navMenu(false));
            break;
        case ids.MENU_MOB:
           state.menuOpen.close()
    }
}

export function menuSwitch(e) {
    // mobile menu button switch handler
        if(state.menuOpen) {
            state.menuOpen.close();
            return;
        }
        const wrap = document.getElementById(ids.WRAP);

        wrap.style.opacity = 0;
        document.body.append(navMenu(true));

        state.menuOpen = {
            close : () => {
                
                let backdrop =  document.getElementById(ids.BACKDROP);
                backdrop.style.opacity = 0;
                backdrop.ontransitionend = () => {
                    wrap.style.opacity = '';
                    backdrop.remove();
                }
                state.menuOpen = false;
                } 
            } 
}