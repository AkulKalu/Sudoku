import {userButton} from '../eventHandlers/userInfo.js';

export function userDisplay() {
    const el = document.createElement('div');
    let userInfo =' <span>Guest</span>';
    if(storage().activeUser) {
        userInfo =  `<span >RANK: ${storage().activeUser.overalStats.level} </span>
                    <span> XP: ${storage().activeUser.overalStats.xpPoints}</span>`
    }
     
    el.innerHTML =` <img id=${ids.USER_LOGO} src="content/ninja.svg" alt="user">
                    <div class=${classNames.BTNS_USER}>
                        ${userInfo}
                    </div>`

    el.id = ids.USER_MENU
    el.classList.add(classNames.USER_MENU);
    el.onclick =  userButton;

    let delay = 0.1;
    for (let i = 0; i < el.lastChild.children.length; i++) {
        el.lastChild.children[i].style.animation = 'fade-in 1.2s cubic-bezier(0.390, 0.575, 0.565, 1.000) both';
        el.lastChild.children[i].style.animationDelay = `${delay}s`;
        delay += 0.1;
    }
    return el;
}