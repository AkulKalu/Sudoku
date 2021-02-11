import {generateSudokuControls} from '../eventHandlers/modes.js';

export function generator() {
    const el = document.createElement('div');
    el.innerHTML =` <div class="widget">
                        <div class="flex-c">
                            <label  for="limit">Known cells:</label>
                            <input class="gen-limit" id=${ids.GEN_LIMITER} type="text">
                        </div>
                    </div>
                    <div class="flex-col-c widget">
                        <button type="button" id=${ids.GEN_RUN_BTN} class="btn">GENERATE</button>
                        <button disabled type="button" id=${ids.GEN_PLAY_BTN} class="btn"  >PLAY</button>
                    </div>`
 
    el.onclick = generateSudokuControls;
    return el;
}