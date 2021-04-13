class MODALS{
  constructor(container){
    this._container = container;
    this.currentModal = null;
    this.launchScroll = 0;

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
    this.currentModal = match;

    // Visibility Stuff
    if(window.scrollY > 900){
      // show side guy
    }

    if(document.querySelectorAll(".modal[data-state='active']").length > 0) document.querySelector(".modal[data-state='active']").dataset.state = 'inactive';
    match.style.display = window.innerWidth >= 700 ? "flex" : "block";
    setTimeout(function(){match.dataset.state = 'active';},100);

    // Height stuff
    let topCalc = ( (window.innerHeight - match.offsetHeight) / 2 ) - 32;
    match.style.marginTop = topCalc <= 0 ? "8px" : topCalc + "px";

    match.querySelector("button.close-modal").focus();

    this.launchScroll = window.scrollY;
    document.body.style.top = (0 - window.scrollY )+"px";
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
    } else if(kc === 9 && document.body.dataset.state === 'modal'){
      if(!e.shiftKey){
        if(document.activeElement.classList.contains("portfolio-link")){
          e.preventDefault();
          this.currentModal.querySelector('.close-modal').focus();
        }
      } else{
        if(document.activeElement.classList.contains('close-modal')){
          e.preventDefault();
          console.log("? ",document.activeElement);
          this.currentModal.querySelector('.portfolio-link').focus();
          console.log("? ",document.activeElement);
        }
      }
    }
  }

  closeModal(){
    let obj = this;
    document.documentElement.style.scrollBehavior = "auto";
    setTimeout(function(){
      document.querySelector(".modal-container").dataset.state = '';
      obj.currentModal.style.display = "none";
      obj.currentModal = null;
      document.body.dataset.state = 'default';
      document.body.style.top = "0px";
      window.scrollTo(0,obj.launchScroll);
      document.documentElement.style.scrollBehavior = "smooth";
    },400);
  }

  get container(){ return this._container }
}