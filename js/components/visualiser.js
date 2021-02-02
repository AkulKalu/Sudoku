import {visualiserControls} from '../eventHandlers/modes.js';


export function visualiser() {
    const el = document.createElement('div');
    el.innerHTML =` <div class=${classNames.WRAP_CTRL_INPUT} >
                        <label class=${classNames.LABEL} id=${ids.VIS_SPEED_LAB} for="speed">Speed: 6</label>
                        <input class=${classNames.VIS_SPEED_SL} type="range" id=${ids.VIS_SPEED_SLIDER} name="volume" min="1" max="10">
                    </div>
                    <div class=${classNames.SET_MOBILE}>
                    <button id=${ids.VIS_RUN_BTN} class=${classNames.BTN_NORMAL}>RUN</button>
                    <button id=${ids.VIS_GEN_BTN} class=${classNames.BTN_NORMAL}>GENERATE</button>
                    <div>`

    el.querySelector('input').oninput = e => {
        document.getElementById(ids.VIS_SPEED_LAB).textContent = `Speed: ${e.target.value}`
    }

    el.onclick = visualiserControls;
    el.classList.add(classNames.WIDGET);
    return el;
}