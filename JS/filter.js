class FILTER{
  constructor(buttonListElem,connectedElemClass){
    this._buttonListElem = buttonListElem;
    this._connectedElemClass = connectedElemClass;
    this._activeFilter = "all";

    this.attachFilterButtonEvents(this._buttonListElem);
  }

  attachFilterButtonEvents(buttonListElem){
    let obj = this;
    let buttonElems = buttonListElem.querySelectorAll("button");
    for(let i = 0; i < buttonElems.length; i++){
      buttonElems[i].addEventListener("click",obj.filter.bind(obj));
    }
  }

  filter(e){
    let obj = this;
    let t = e.currentTarget;
    let filterLabel = t.dataset.label;

    document.querySelector(".filter-tag[data-state='active']").dataset.state = "inactive";
    t.dataset.state = "active";

    if(filterLabel !== this._activeFilter){
      this._activeFilter = filterLabel;
      let filteredElems = document.querySelectorAll(`.${this._connectedElemClass}`);

      document.querySelector(`.${this._connectedElemClass}`).parentElement.dataset.state = "filtering";
  
      setTimeout(function(){
        for(let i = 0; i < filteredElems.length; i++){
          if(filterLabel !== "all"){
            filteredElems[i].dataset.state = filteredElems[i].dataset.tags.indexOf(filterLabel) >= 0 ? "show" : "hide";
          } else{
            filteredElems[i].dataset.state = "show";
          }
        }
  
        document.querySelector(`.${obj._connectedElemClass}`).parentElement.dataset.state = "";
      },1000);
    }
  }
}