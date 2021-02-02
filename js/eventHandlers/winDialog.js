import {playMode} from '../game/interfaceModes.js';

export function winDialogControls(event) {
    const dialog = document.getElementById(ids.WIN_DIALOGE);
    switch (event.target.id) {
        case ids.WIN_NEW:
            dialog.classList.add('Puffout');
            dialog.onanimationend = () => {
                dialog.remove();
                playMode();                    
            }
            break;
        case ids.WIN_EXIT:
            sessionStorage.setItem('sudokuStorage',JSON.stringify({stats: null}));
            location.reload();
    }
    
}