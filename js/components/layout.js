import {menuSwitch} from '../eventHandlers/navMenu.js';



export function layout() {
    const el = document.createElement('div');
    el.innerHTML = `
                    <img class="menu-sw f-yellow" src="content/menu.svg" id=${ids.MENU_MOB} ></img>
                    <div id=${ids.WRAP} class="flex-col-c wrap">
                        <div> 
                            <div class="board-bar">
                                <div id=${ids.USER_DISPLAY} class="board-bar-user">    
                                </div>
                                <div id=${ids.BOARD_CLOCK} class="board-bar-timer">    
                                </div>
                            </div>
                            <div class="board-wrap" id=${ids.BOARD_WRAP}>
                            </div>        
                        </div>
                            
                        <div class="controls" id=${ids.CONTROLS_WRAP}></div>
                    </div>`

   
    el.querySelector(`#${ids.MENU_MOB}`).onclick = menuSwitch;

    return el;
}