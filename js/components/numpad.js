import {numpadControl} from '../eventHandlers/play.js';

export function numpad() {
    const el = document.createElement('div');
    el.innerHTML =` <span class="numpad-key flex-c" id=${ids.INPUT_NUM + '1'}>1</span>
                    <span class="numpad-key flex-c" id=${ids.INPUT_NUM + '2'}>2</span>
                    <span class="numpad-key flex-c" id=${ids.INPUT_NUM + '3'}>3</span>
                    <span class="numpad-key flex-c" id=${ids.INPUT_NUM + '4'}>4</span>
                    <span class="numpad-key flex-c" id=${ids.INPUT_NUM + '5'}>5</span>
                    <span class="numpad-key flex-c" id=${ids.INPUT_NUM + '6'}>6</span>
                    <span class="numpad-key flex-c" id=${ids.INPUT_NUM + '7'}>7</span>
                    <span class="numpad-key flex-c" id=${ids.INPUT_NUM + '8'}>8</span>
                    <span class="numpad-key flex-c" id=${ids.INPUT_NUM + '9'}>9</span>`
    el.id = ids.NUMPAD;
    el.onclick =  numpadControl;
    el.className = 'numpad';
    chainAnimationDelays(el.children, 1.5, true)
    return el;
}