let controls = null



storage() ?? storage({ activeUser: null });



const state = {
    loginScreen : storage().activeUser ? false : true,
    menuOpen : false,
    statsShown : false,
}

const board = new Board();
let timer = null;



