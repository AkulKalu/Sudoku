import {spinner} from './mini.js';
import {authentication} from '../eventHandlers/loginForm.js';

export function loginForm(guestBtn=false) {
    const el = document.createElement('div');
    el.innerHTML =`
                    <form class=${classNames.LOG_FORM}>
                        <p id=${ids.FORM_ERROR}></p>
                        <div id=${ids.FORM_INPUTS} class="FormInputWrap">
                            ${spinner().outerHTML}
                            <input id=${ids.FORM_EMAIL} class=${classNames.FORM_INPUT} placeholder="Your Email" type="email">
                            <input id=${ids.FORM_PASS} class=${classNames.FORM_INPUT} placeholder="Password" type="password">
                        </div>
                        <div class=${classNames.FORM_BTN_WRAP}>
                            <button id=${ids.FORM_LOGIN_BTN} class=${classNames.FORM_BTN} type="button">LOGIN</button>
                            <button id=${ids.FORM_SIGNUP_BTN} class=${classNames.FORM_BTN} type="button">SIGNUP</button>
                            ${guestBtn ? `<button id=${ids.FORM_GUEST_BTN} class=${classNames.FORM_BTN} type="button">GUEST</button>`: ''}
                        </div>
                    </form>
                    `
    el.querySelector(`[id="${ids.FORM_EMAIL}"]`).oninput = event => inputValidation(event, event.target.value.match(/.+@.+\..+/));
    el.querySelector(`[id="${ids.FORM_PASS}"`).oninput = event => inputValidation(event, event.target.value.length > 5);
    el.querySelector('.' + classNames.FORM_BTN_WRAP).onclick =  authentication;
    el.id = ids.FORM;
    return el;
}

function inputValidation(event , rule) {
    if(rule) {
        event.target.classList.toggle(classNames.INPUT_INVALID, false);
        event.target.classList.toggle(classNames.INPUT_VALID, true);
    }else {
        if(event.target.value) {
            event.target.classList.toggle(classNames.INPUT_INVALID, true);
        }else {
            event.target.classList.toggle(classNames.INPUT_INVALID, false);
            event.target.classList.toggle(classNames.INPUT_VALID, false);
        } 
    }
}