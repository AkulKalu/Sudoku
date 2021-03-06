import {visualiserControls} from '../eventHandlers/modes.js';


export function visualiser() {
    const el = document.createElement('div');
    el.innerHTML =` <div class="flex-c" >
                        <label  id=${ids.VIS_SPEED_LAB} for="speed">Speed: 6</label>
                        <input class="slider" type="range" id=${ids.VIS_SPEED_SLIDER} name="volume" min="1" max="10">
                    </div>
                    <div class="flex-col-c widget ">
                    <button id=${ids.VIS_RUN_BTN} class="btn">RUN</button>
                    <button id=${ids.VIS_GEN_BTN} class="btn">GENERATE</button>
                    <div>`

    el.querySelector('input').oninput = e => {
        document.getElementById(ids.VIS_SPEED_LAB).textContent = `Speed: ${e.target.value}`
    }
    el.className = "vis-ctrl";
    el.onclick = visualiserControls;
    return el;
}