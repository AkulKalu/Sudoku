import {stats} from '../components/stats.js';
import {userDisplay} from '../components/userDisplay.js';
import {playMode, startApp} from '../game/interfaceModes.js';



export function userButton(e) {
    switch (e.target.id) {
        case ids.USER_LOGO:
            if(state.statsShown) {
                state.statsShown.close();
                
            }else {
                let statsEl = document.body.appendChild(stats());
                state.statsShown = {
                    close: () => {
                        statsEl.onanimationend = () =>{
                            statsEl.remove()
                            state.statsShown = false;
                        }   
                        statsEl.style.animation = 'slide-out-right 0.5s';
                    }
                }
            }
    }
}

export function userStats(e) {
    
    switch (e.target.id) {
        case ids.STATS_LOGOUT:
            serverSide({
                action: 'logout',
                token: storage().activeUser.token
            }, () => {
                sessionStorage.setItem('sudokuStorage',JSON.stringify({stats: null}));  
                state.statsShown.close();
                replace(ids.USER_MENU, userDisplay()); 
                playMode(true);
            }, () => null );  
            break;
        case ids.STATS_CLOSE:
            state.statsShown.close();
            break;
        case ids.STATS_SAVE:
            e.target.textContent = 'saving...'
            const save = {
                solution: board.solution,
                board: board.board,
                moves: board.moves,
                errors: board.errors,
                time: board.finalTime
            }
            storage({
                activeUser: {
                    ...storage().activeUser,
                    save: save
                }
            })
            serverSide({
                action: 'save',
                token: storage().activeUser.token,
                save: save
            }, () =>  e.target.textContent = 'SAVE GAME',
            () => null)
    }
}