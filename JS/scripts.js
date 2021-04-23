var modals, filter, lineOne;
window.onload = function(){
  setTimeout(function(){
    init();
  },3000);
}

function init(){
    console.log("%cInitializing...","color:#999");

    modals = new MODALS(document.querySelector(".modal-container"));
    filter = new FILTER(document.querySelector("ul.tags"),"designer");
    document.querySelector("section.hero img").src = `MEDIA/game-on_logo.gif?v=${Date.now()}`;
    
    setTimeout(function(){
      setupHero();
      moveLoadBar();
      window.addEventListener("resize", function(){
        setupHero();
        setupAboutLine(lineOne);
      });
    },500);

    setTimeout(function(){
      document.body.dataset.state = "default";
      setupAboutLine(lineOne);
    },6000);
}

function setupHero(){
  lineOne = document.querySelector(".line-one");
  let logoHeight = getLogoHeight();
  let remHeight = getRemHeight(logoHeight);
  let gif = document.querySelector(".hero img");

  let correctHeight = getCorrectHeight();

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

function moveLoadBar(){
  let loadWrap = document.querySelector(".load-wrap");
  let loadBar = loadWrap.querySelector(".load-bar");

  let lineLeft = document.querySelector(".line-one").getBoundingClientRect().left;
  let barDeltaX = lineLeft - (loadBar.getBoundingClientRect().left + loadBar.clientWidth);

  let barTop = loadBar.getBoundingClientRect().top;
  let logoBottom = ( getCorrectHeight() + getLogoHeight() - 4 );

  let barDeltaY = barTop - logoBottom;

  loadBar.style.transform = `translate(${( barDeltaX - 32 )}px,${-barDeltaY + 32}px)`;
}

function getCorrectHeight(){
  let heroHeight = document.querySelector("section.hero").offsetHeight;

  let gif = document.querySelector(".hero img");
  let logoHeight = gif.offsetHeight * (200/1080);

  return ( heroHeight - logoHeight ) / 2.5;
}

function getLogoHeight(){
  let gif = document.querySelector(".hero img");
  return gif.offsetHeight * (200/1080);
}

function getRemHeight(logoHeight){
  let gif = document.querySelector(".hero img");

  return (gif.offsetHeight - logoHeight) / 2;
}