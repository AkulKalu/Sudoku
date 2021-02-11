import {loginForm} from './loginForm.js';

export function loginScreen() {
    const el = document.createElement('div');
    el.innerHTML =` 
                    <div class="title">
                        <span class="title-letter title-letter-l">S</span>
                        <span class="title-letter">U</span>
                        <span class="title-letter">D</span>
                        <span class="title-letter">O</span>
                        <span class="title-letter">K</span>
                        <span class="title-letter title-letter-l">U</span>
                    </div>
                    `
    el.appendChild(loginForm(true));
    chainAnimationDelays(el.querySelectorAll('span'), 0.4);
    el.className = 'flex-col-c pos-fix shadow-c2';
    el.id = ids.LOGIN_SCREEN;
    return el;
}