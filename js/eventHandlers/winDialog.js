import {playMode} from '../game/interfaceModes.js';

export function winDialogControls(event) {
    switch (event.target.id) {
        case ids.WIN_NEW:
            state.winDialog.style.animation = 'fade-out 0.2s ease-out'
            state.winDialog.onanimationend = () => {
                state.winDialog.remove();
                playMode();                    
            }
            break;
        case ids.WIN_EXIT:
            sessionStorage.setItem('sudokuStorage',JSON.stringify({stats: null}));
            location.reload();
    }
    
}