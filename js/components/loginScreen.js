import {loginForm} from './loginForm.js';

export function loginScreen() {
    const el = document.createElement('div');
    el.innerHTML =` 
                    <div class=${classNames.LOG_TITLE}>
                        <span class=${[classNames.LOG_TITLE_LETTER, classNames.LOG_TITLE_LARGE].join(' ')}>S</span>
                        <span class=${classNames.LOG_TITLE_LETTER}>U</span>
                        <span class=${classNames.LOG_TITLE_LETTER}>D</span>
                        <span class=${classNames.LOG_TITLE_LETTER}>O</span>
                        <span class=${classNames.LOG_TITLE_LETTER}>K</span>
                        <span class=${[classNames.LOG_TITLE_LETTER, classNames.LOG_TITLE_LARGE].join(' ')}>U</span>
                    </div>
                    `
    el.appendChild(loginForm(true));
    chainAnimationDelays(el.querySelectorAll('span'), 0.4);
    el.classList.add(classNames.LOG_SCREEN);
    el.id = ids.LOGIN_SCREEN;
    return el;
}