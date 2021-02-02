import {generateSudokuControls} from '../eventHandlers/modes.js';

export function generator(onClick) {
    const el = document.createElement('div');
    el.innerHTML =` <div class=${classNames.WRAP_CTRL_INPUT}>
                        <label class=${classNames.LABEL} for="limit">Known cells:</label>
                        <input class=${classNames.GEN_LIMITER} id=${ids.GEN_LIMITER} type="text">
                    </div>
                    <div class=${classNames.SET_MOBILE}>
                    <button type="button" id=${ids.GEN_RUN_BTN} class=${classNames.BTN_NORMAL} style="animation-delay:0.1s;">GENERATE</button>
                    <button disabled type="button" id=${ids.GEN_PLAY_BTN} class=${classNames.BTN_NORMAL} style="animation-delay:0.2s;" >PLAY</button>
                    </div>`
    el.classList.add(classNames.WIDGET);
    el.onclick = generateSudokuControls;
    return el;
}