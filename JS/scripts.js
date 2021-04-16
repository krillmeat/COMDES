var modals, filter, lineOne;
window.onload = function(){
    init();
}

function init(){
    console.log("%cInitializing...","color:#999");

    modals = new MODALS(document.querySelector(".modal-container"));
    filter = new FILTER(document.querySelector("ul.tags"),"designer");
    document.querySelector("section.hero img").src = `MEDIA/game-on_logo.gif?v=${Date.now()}`;
    
    setTimeout(function(){
      setupHero();
      window.addEventListener("resize", function(){
        setupHero();
        setupAboutLine(lineOne);
      });
    },500);

    setTimeout(function(){
      document.body.dataset.state = "default";
      setupAboutLine(lineOne);
    },6000)
}

function setupHero(){
  let heroHeight = document.querySelector("section.hero").offsetHeight;
  let imgWrap = document.querySelector(".logo-wrap");
  lineOne = imgWrap.querySelector(".line-one");
  let gif = document.querySelector(".hero img");
  let logoHeight = gif.offsetHeight * (200/1080);
  let remHeight = (gif.offsetHeight - logoHeight) / 2;

  let correctHeight = ( heroHeight - logoHeight ) / 2.5;

  // Get the gap that the hero "Should" have
  let heightMod = correctHeight - remHeight;
  gif.style.transform = `translateY(${ heightMod }px)`;
  lineOne.style.top = ( correctHeight + logoHeight - 4 ) + "px";
}

function setupAboutLine(lineOne){
  lineOne.style.height = "1000px";
  let lineTwo = document.querySelector(".line-two");
  let aboutInfo = document.querySelector("section.about .info");
  let aboutInfoRect = aboutInfo.getBoundingClientRect();
  let aboutInfoRight = aboutInfoRect.left + aboutInfo.offsetWidth;
  
  let fixWidth = aboutInfoRight - lineOne.getBoundingClientRect().left;
  
  lineTwo.style.left = lineOne.getBoundingClientRect().left+"px";
  lineTwo.style.width = fixWidth+"px";
}