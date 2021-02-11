import {spinner} from './mini.js';
import {authentication} from '../eventHandlers/loginForm.js';

export function loginForm(guestBtn=false) {
    const el = document.createElement('div');
    el.className = 'form-wrap'
    el.innerHTML =`
                    <form class="form">
                        <p id=${ids.FORM_ERROR}></p>
                        <div id=${ids.FORM_INPUTS} class="flex-col-c form-group">
                            ${spinner().outerHTML}
                            <input id=${ids.FORM_EMAIL} class="form-input" placeholder="Your Email" type="email">
                            <input id=${ids.FORM_PASS} class="form-input" placeholder="Password" type="password">
                        </div>
                        <div class="form-buttons flex-col-c">
                            <button id=${ids.FORM_LOGIN_BTN} class="form-btn" type="button">LOGIN</button>
                            <button id=${ids.FORM_SIGNUP_BTN} class="form-btn" type="button">SIGNUP</button>
                            ${guestBtn ? `<button id=${ids.FORM_GUEST_BTN} class="form-btn" type="button">GUEST</button>`: ''}
                        </div>
                    </form>
                    `
    el.querySelector(`[id="${ids.FORM_EMAIL}"]`).oninput = event => inputValidation(event, event.target.value.match(/.+@.+\..+/));
    el.querySelector(`[id="${ids.FORM_PASS}"`).oninput = event => inputValidation(event, event.target.value.length > 5);
    el.querySelector('.form-buttons').onclick =  authentication;
    el.id = ids.FORM;
    return el;
}

function inputValidation(event , rule) {
    if(rule) {
        event.target.classList.toggle('invalid-input', false);
        event.target.classList.toggle('valid-input', true);
    }else {
        if(event.target.value) {
            event.target.classList.toggle('invalid-input', true);
        }else {
            event.target.classList.toggle('invalid-input', false);
            event.target.classList.toggle('valid-input', false);
        } 
    }
}