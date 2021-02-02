import {nav} from '../eventHandlers/navMenu.js';
import {userDisplay} from './userDisplay.js';
import {navMenu} from './navMenu.js';

export function layout() {
    const el = document.createElement('div');
    el.innerHTML = ` <header id=${ids.HEADER}>
                        <nav id=${ids.MENU_WRAP} class=${classNames.MENU_WRAP}>  
                            <button id=${ids.MENU_MOB} class=${classNames.MOB_MENU} >MENU</button>
                        </nav>
                    </header>
                    <div id=${ids.WRAP} class=${classNames.wrap}>
                    <div> 
                        <div class="board-bar">
                            <div id="user" class="board-bar-user">    
                            </div>
                            <div id="clock" class="board-bar-timer">    
                            </div>
                        </div>
                        <div class=${classNames.BOARD_WRAP} id=${ids.BOARD_WRAP}>
                        </div>        
                    </div>
                        
                        <div class=${classNames.CONTROLS} id=${ids.CONTROLS_WRAP}></div>
                    </div>`

    el.querySelector('#user').append(userDisplay());
    // el.querySelector('nav').onclick = nav;
    // el.querySelector('nav').append(navMenu());

    return el;
}