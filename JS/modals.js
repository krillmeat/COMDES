class MODALS{
  constructor(container){
    this._container = container;

    this.addLaunchEvents(document.querySelectorAll("button.meet-me"))
  }

  addLaunchEvents(nodeList){
    let obj = this;
    for(let i = 0; i < nodeList.length; i++){
      nodeList[i].addEventListener("click",this.launchModal.bind(obj));
    }
  }

  launchModal(e){
    let t = e.currentTarget;
    let match = document.querySelector(`.modal[data-label='${t.dataset.label}']`);

    if(document.querySelectorAll(".modal[data-state='active']").length > 0) document.querySelector(".modal[data-state='active']").dataset.state = 'inactive';
    match.dataset.state = 'active';

  }

  get container(){ return this._container }
}