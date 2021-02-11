import {statsGame, statsOveral} from './statWindows.js';
import {loginForm} from './loginForm.js';
import {userStats} from '../eventHandlers/userInfo.js';


export function stats() {
    const el = document.createElement('div');
    const buttons = document.createElement('div');
    buttons.innerHTML =`
    <button class="stats-btn"  id=${ids.STATS_LOGOUT} type="button">LOGOUT</button>
                <button class="stats-btn"  id=${ids.STATS_SAVE} type="button">SAVE GAME</button>
                 `
   
    el.innerHTML =` <div>
                        <button  id=${ids.STATS_CLOSE} type="button">X</button>
                    </div>
                    <div id="statsdisplay" >
                        <span class="stats-title">Current Game</span>
                        <div class="stats-window">
                            ${statsGame().innerHTML}
                        </div>
                        <span class="stats-title">Overall</span>
                    </div>
                    `

    el.id = ids.STATS
    el.className = "stats shadow-c3";
    el.style.animation = 'slide-in-right 0.2s';

    if(storage().activeUser) {
        el.appendChild(statsOveral());
        el.appendChild(buttons);
    }else {
        el.appendChild(loginForm());
    }
    el.onclick = userStats;
    
    return el;
}
