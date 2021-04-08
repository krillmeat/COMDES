class MODALS{
  constructor(container){
    this._container = container;

    this.addLaunchEvents(document.querySelectorAll("button.meet-me"))
    this.addCloseEvents(document.querySelectorAll("button.close-modal"))

    window.addEventListener("keydown",this.keyHandler.bind(this))
  }

  addLaunchEvents(nodeList){
    let obj = this;
    for(let i = 0; i < nodeList.length; i++){
      nodeList[i].addEventListener("click",this.launchModal.bind(obj));
    }
  }

  addCloseEvents(nodeList){
    let obj = this;
    for(let i = 0; i < nodeList.length; i++){
      nodeList[i].addEventListener("click",this.closeModalButton.bind(obj));
    }
  }

  launchModal(e){
    let t = e.currentTarget;
    let match = document.querySelector(`.modal[data-label='${t.dataset.label}']`);

    if(document.querySelectorAll(".modal[data-state='active']").length > 0) document.querySelector(".modal[data-state='active']").dataset.state = 'inactive';
    match.dataset.state = 'active';

    match.querySelector("button.close-modal").focus();

    document.body.dataset.state = 'modal';
    document.querySelector(".modal-container").dataset.state = 'show';
  }

  closeModalButton(e){
    let t = e.currentTarget;
    let p = t.parentElement;
    p.dataset.state = 'inactive';

    this.closeModal();
  }

  keyHandler(e){
    let kc = e.keyCode;
    if(kc === 27 && document.body.dataset.state === 'modal'){
      document.querySelector(".modal[data-state='active']").dataset.state = 'inactive';
      this.closeModal();
    }
  }

  closeModal(){
    document.body.dataset.state = 'default';
    setTimeout(function(){
      document.querySelector(".modal-container").dataset.state = '';
    },400);
  }

  get container(){ return this._container }
}