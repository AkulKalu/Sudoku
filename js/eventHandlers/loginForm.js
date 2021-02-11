import {startApp} from '../game/interfaceModes.js';
import {stats} from '../components/stats.js';
import {userDisplay} from '../components/userDisplay.js';

export function authentication(event) {
    
    const email = document.getElementById(ids.FORM_EMAIL)
    const password = document.getElementById(ids.FORM_PASS);
    const spinner = document.getElementById(ids.SPINNER);
    

    const valid = email.value.match(/.+@.+\..+/) && password.value.length > 5;

    const toggleSpinner = state => {
        email.hidden = state;
        password.hidden = state;
        spinner.hidden = !state;
    }

    const serverError = err => {
        toggleSpinner(false);
        document.getElementById(ids.FORM_ERROR).textContent = err;
    }

    const serverSuccess = (data) => {
        storage({
            activeUser: {
                ...data.response,
                loginTime: new Date(),
            }
        });
        startApp(!state.statsShown);
        if(state.statsShown) {
           state.statsShown.close()
           replace(ids.USER_MENU, userDisplay());
        }
    }

    const payload = {
        action: 'login',
        email: email.value,
        password: password.value,
    }
    
    switch (event.target.id) {
        case ids.FORM_LOGIN_BTN:
            if(valid) {
                toggleSpinner(true);
                serverSide(payload, serverSuccess, serverError);
            }
            break;
        case ids.FORM_SIGNUP_BTN: 
            if(valid) {
                toggleSpinner(true); 
                payload.action = 'signup';
                serverSide(payload, serverSuccess, serverError);

            }  
            break;
        case ids.FORM_GUEST_BTN:
            storage({activeUser: null})
            startApp();
    }
}