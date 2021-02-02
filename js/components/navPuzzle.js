

export function navPuzzle() {
    const el = document.createElement('div');
    el.innerHTML =` <span id=${ids.MENU_RANDOM_BTN} class=${classNames.NAVIGATION_BTN} >RANDOM</span>
                    <span id=${ids.MENU_SETSUDOKU_BTN}  class=${classNames.NAVIGATION_BTN}>MAKE ONE</span>
                    <span id=${ids.MENU_GENERATE_BTN}  class=${classNames.NAVIGATION_BTN}>GENERATE</span>
                    <span id=${ids.MENU_BACK_BTN}  class=${classNames.NAVIGATION_BTN} >BACK</span> `
    el.id = ids.PUZZLES_MENU;
    let delay = 0.1;
    for (let i = 0; i < el.children.length; i++) {
        el.children[i].style.animation = `fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) ${delay}s both`
        el.children[i].onanimationend = () => {
            el.children[i].style.animation = '';
        }
        delay += 0.2;
    }
    return el;
}