import {winDialogControls} from '../eventHandlers/winDialog.js';

export function winDialog(rank , xp) {
    const el = document.createElement('div');
    el.innerHTML =` <div class="win-dialog">
                        <div class="ranking">
                            <span>${rank}</span>
                            <span>XP+${xp}</span>
                        </div>
                        <p>SOLVED!</p>
                        <span>Stats:</span>
                        <div class="stats-window ">
                            <span class="stat">Time:</span><span class="stat">${board.finalTime.formated}</span>
                            <span class="stat">Moves:</span><span class="stat">${board.moves}</span>
                            <span class="stat">Errors:</span><span class="stat">${board.errors}</span>
                            <span class="stat">Hints used:</span><span class="stat">${3 - board.hints}</span>
                        </div>
                        <div class="widget flex-c">
                            <button class="btn" id=${ids.WIN_NEW} type="button">NEW</button>
                            <button class="btn" id=${ids.WIN_EXIT} type="button">EXIT</button
                        </div>
                    </div> `

    el.id = ids.WIN_DIALOGE;
    el.lastElementChild.onclick = winDialogControls;
    el.className = 'pos-fix flex-c backdrop'
    return el;
}