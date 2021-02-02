import {statsGame, statsOveral} from './statWindows.js';
import {loginForm} from './loginForm.js';
import {userStats} from '../eventHandlers/userInfo.js';


export function stats() {
    const el = document.createElement('div');
    const buttons = document.createElement('div');
    buttons.innerHTML =`
    <button class=${classNames.BTN_STATS}  id=${ids.STATS_LOGOUT} type="button">LOGOUT</button>
                <button class=${classNames.BTN_STATS}  id=${ids.STATS_SAVE} type="button">SAVE GAME</button>
                 `
   
    el.innerHTML =` <div>
                        <button  id=${ids.STATS_CLOSE} type="button">X</button>
                    </div>
                    <div id="statsdisplay" >
                        <span class=${classNames.STATS_TITLE}>Current Game</span>
                        <div class=${classNames.STATS_WINDOW}>
                            ${statsGame().innerHTML}
                        </div>
                        <span class=${classNames.STATS_TITLE}>Overall</span>
                    </div>
                    `

    el.id = ids.STATS
    el.classList.add(classNames.STATS);

    if(storage().activeUser) {
        el.appendChild(statsOveral());
        el.appendChild(buttons);
    }else {
        el.appendChild(loginForm());
    }
    el.onclick = userStats;
    
    return el;
}
