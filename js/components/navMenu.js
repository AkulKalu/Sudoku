import { nav } from '../eventHandlers/navMenu.js';

export function navMenu(withBackdrop) {
    const menu = document.createElement('div');
    const backdrop = document.createElement('div');
    menu.innerHTML =`<span id=${ids.MENU_NEW_BTN} class="nav-btn">PUZZLES</span>
                    <span id=${ids.MENU_VISUALISER_BTN} class="nav-btn">BACKTRACKING VISUALISER</span>
                    <span id=${ids.MENU_INSTRUCTIONS_BTN} class="nav-btn">INSTRUCTIONS</span> `

    menu.id = ids.MAIN_MENU;
    menu.className = "flex-col-c menu";

    backdrop.className = "pos-fix flex-col-c backdrop menu-backdrop";
    backdrop.id = ids.BACKDROP;
    backdrop.onclick = nav;
    backdrop.appendChild(menu);
    return withBackdrop ? backdrop : menu;
}
