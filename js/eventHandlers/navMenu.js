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
            menuSwitch();
            visualiserMode();
            board.reset();
            break;
        case ids.MENU_INSTRUCTIONS_BTN:
            document.body.appendChild(instructions());
            break;
        case ids.MENU_RANDOM_BTN:
            clearSave();
            playMode();
            menuSwitch();
            break;
        case ids.MENU_SETSUDOKU_BTN:
            menuSwitch();
            setMode();
            board.reset(cloneBoard(board.emptyTemplate));
            break;
        case ids.MENU_GENERATE_BTN:
            menuSwitch();
            generateMode();
            break;
        case ids.MENU_BACK_BTN:
            replace(ids.PUZZLES_MENU, navMenu(false));
            break;
        case ids.MENU_MOB:
            menuSwitch();
    }
}