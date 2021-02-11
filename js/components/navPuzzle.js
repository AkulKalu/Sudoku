

export function navPuzzle() {
    const menu = document.createElement('div');
    menu.innerHTML =` <span id=${ids.MENU_RANDOM_BTN} class="nav-btn" >RANDOM</span>
                    <span id=${ids.MENU_SETSUDOKU_BTN}  class="nav-btn">MAKE ONE</span>
                    <span id=${ids.MENU_GENERATE_BTN}  class="nav-btn">GENERATE</span>
                    <span id=${ids.MENU_BACK_BTN}  class="nav-btn" >BACK</span> `

    menu.className = "flex-col-c menu";
    menu.id = ids.PUZZLES_MENU;
  
    return menu;
}