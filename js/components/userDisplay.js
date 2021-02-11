import {userButton} from '../eventHandlers/userInfo.js';

export function userDisplay() {
    const el = document.createElement('div');
    let userInfo =' <span>Guest</span>';
    if(storage().activeUser) {
        userInfo =  `<span >rank: ${storage().activeUser.overalStats.level.toLowerCase()} </span>
                    <span class="xp-display"> xp: ${storage().activeUser.overalStats.xpPoints}</span>`
    }
     
    el.innerHTML =` <img id=${ids.USER_LOGO} class="logo-btn f-yellow" src="content/ninja.svg" alt="user">
                    <div >
                        ${userInfo}
                    </div>`

    el.id = ids.USER_MENU
    el.className = "user";
    el.onclick =  userButton;

    return el;
}
