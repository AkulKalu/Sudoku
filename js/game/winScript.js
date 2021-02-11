import {winDialog} from '../components/winDialog.js';
import {userDisplay} from '../components/userDisplay.js';

export function puzzleSolved() {
    const stats = storage().activeUser ?  storage().activeUser.overalStats : null ;
    const levels = [{xp:1000, lvl :'Novice'}, {xp: 3000, lvl:'Casual'}, {xp:6000, lvl:'Student'}, {xp: 10000, lvl:'Expert'}];
    const diffRatings = ['easy','medium','hard'];

    clearSave();
    clearInterval(timer);
    if(stats) {
        stats.playedDiff.push(diffRatings.indexOf(board.difficulty)+ 1);
        stats.overalDifficulty = diffRatings[Math.round(stats.playedDiff.reduce((avg, diff) => {
            return avg + diff;
        }) /  stats.playedDiff.length)];
        stats.sudokusSolved += 1;
        stats.xpPoints += 100 - ((3-board.hints)*10);
        if(stats.xpPoints >= 10000) {
            stats.level = 'Master'
        }else {
            for (const level of levels) {
                if(stats.xpPoints < level.xp) {
                    stats.level = level.lvl;
                    break;
                }
            }
        }
        if(!stats.bestTime.inSeconds || board.finalTime.inSeconds < stats.bestTime.inSeconds) {
            stats.bestTime.formated = board.finalTime.formated;
        }
        if(!stats.leastMoves || board.moves < stats.leastMoves ) {
            stats.leastMoves = board.moves;
        }
        if(!board.errors) {
            stats.cleanGames += 1;
        }
        const update = {
            activeUser: {
                ...storage().activeUser,
                overalStats: stats
            }
        }
        storage(update);
        // update user database
        serverSide({
            action: 'statsUpdate',
            ...storage().activeUser,
        })
       
        // updateUser(storage.stats.authData, storage.stats);
        // 
        state.winDialog = document.body.appendChild(winDialog(stats.level, stats.xpPoints));
        // update displayed user info
        replace(ids.USER_MENU, userDisplay());
    }else {
        state.winDialog = document.body.appendChild(winDialog('LOGIN', '100'));
    } 
}