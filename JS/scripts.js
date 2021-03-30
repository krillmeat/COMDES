var modals;
window.onload = function(){
    init();
}

function init(){
    console.log("%cInitializing...","color:#999");

    modals = new MODALS(document.querySelector(".modal-container"));
}