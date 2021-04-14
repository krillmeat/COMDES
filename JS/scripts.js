var modals, lineOne;
window.onload = function(){
    init();
}

function init(){
    console.log("%cInitializing...","color:#999");

    setupHero();
    window.addEventListener("resize", function(){
      setupHero();
      setupAboutLine(lineOne);
    });

    modals = new MODALS(document.querySelector(".modal-container"));

    setTimeout(function(){
      document.body.dataset.state = "default";
      setupAboutLine(lineOne);
    },8000)
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
  console.log(aboutInfoRight);
  let fixWidth = aboutInfoRight - lineOne.getBoundingClientRect().left;
  
  lineTwo.style.left = lineOne.getBoundingClientRect().left+"px";
  lineTwo.style.width = fixWidth+"px";
}