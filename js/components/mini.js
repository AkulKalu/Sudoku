export function timerEl() {
    const el = document.createElement('div');
    el.innerHTML =` <span id=${ids.HOURS}>00</span>
                    <span>:</span>
                    <span id=${ids.MINUTES}>00</span>
                    <span>:</span>
                    <span id=${ids.SECONDS}>00</span>`
    el.id = ids.TIMER;
    el.classList.add(classNames.TIMER);
    return el;
}

export function spinner() {
    const el = document.createElement('div');
    el.innerHTML =` <div class=${classNames.SPINNER} >
                        <img style="width:40px"  src="content/blocks.svg" alt="Spinner"></img>
                    </div>`
    el.id = ids.SPINNER;
    el.hidden = true;
    return el;
    
}