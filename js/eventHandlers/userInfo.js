import {stats} from '../components/stats.js';



export function userButton(e) {
    switch (e.target.id) {
        case ids.USER_LOGO:
           state.statsShown = true;
           document.body.appendChild(stats());
    }
}

export function userStats(e) {
    const statsWindow = document.getElementById(ids.STATS);
    switch (e.target.id) {
        case ids.STATS_LOGOUT:
            serverSide({
                action: 'logout',
                token: storage().activeUser.token
            }, () => {
                sessionStorage.setItem('sudokuStorage',JSON.stringify({stats: null}));    
                replace(ids.STATS, stats());
            }, () => null );  
            break;
        case ids.STATS_CLOSE:
            state.statsShown = false;
            statsWindow.style.transform = 'translateX(-100%)';
            statsWindow.ontransitionend = () => statsWindow.remove()
            break;
        case ids.STATS_SAVE:
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
            }, () => null,
            () => null)
    }
}