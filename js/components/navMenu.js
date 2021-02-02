

export function navMenu(wrapped = true) {
    const el = document.createElement('div');
    const wrap = document.createElement('div');
    el.innerHTML =` <span id=${ids.MENU_NEW_BTN} class=${classNames.NAVIGATION_BTN}>PUZZLES</span>
                    <span id=${ids.MENU_VISUALISER_BTN} class=${classNames.NAVIGATION_BTN}>BACKTRACKING VISUALISER</span>
                    <span id=${ids.MENU_INSTRUCTIONS_BTN} class=${classNames.NAVIGATION_BTN}>INSTRUCTIONS</span> `

    el.id = ids.MAIN_MENU;
    let delay = 0.1;
    for (let i = 0; i < el.children.length; i++) {
        el.children[i].style.animation = `fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) ${delay}s both`
        el.children[i].onanimationend = () => {
            el.children[i].style.animation = '';
        }
        delay += 0.2;
    }
    wrap.classList.add(classNames.MAIN_MENU);
    wrap.id = ids.MAIN_MENU_WRAP;
    wrap.appendChild(el);
    return wrapped ? wrap : el;
}
