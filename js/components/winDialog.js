import {winDialogControls} from '../eventHandlers/winDialog.js';

export function winDialog(rank , xp) {
    const el = document.createElement('div');
    el.innerHTML =` <div class=${classNames.WIN_WINDOW}>
                        <div class=${classNames.WIN_RANKING}>
                            <span>${rank}</span>
                            <span>XP+${xp}</span>
                        </div>
                        <p>SOLVED!</p>
                        <span>Stats:</span>
                        <div class=${classNames.STATS_WINDOW}>
                            <span class=${classNames.STAT}>Time:</span><span class=${classNames.STAT}>${board.finalTime.formated}</span>
                            <span class=${classNames.STAT}>Moves:</span><span class=${classNames.STAT}>${board.moves}</span>
                            <span class=${classNames.STAT}>Errors:</span><span class=${classNames.STAT}>${board.errors}</span>
                            <span class=${classNames.STAT}>Hints used:</span><span class=${classNames.STAT}>${3 - board.hints}</span>
                        </div>
                        <div class=${classNames.SET_MOBILE}>
                        <button class=${classNames.WIN_BTN} id=${ids.WIN_NEW} type="button">NEW</button>
                        <button class=${classNames.WIN_BTN} id=${ids.WIN_EXIT} type="button">EXIT</button
                        </div>
                    </div> `

    el.id = ids.WIN_DIALOGE;
    el.lastElementChild.onclick =winDialogControls;
    el.classList.add(classNames.BACKDROP)
    return el;
}