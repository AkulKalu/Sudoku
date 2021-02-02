let controls = null
let mobileMenuBtn = null;



storage() ?? storage({ activeUser: null });



const state = {
    loginScreen : storage().activeUser ? false : true,
    mobMenuOpen : false,
    statsShown : false,
}

const board = new Board();
let timer = null;



