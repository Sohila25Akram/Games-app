const descShortContainer = document.querySelector("#main-details .description-p.short");
const descLongContainer = document.querySelector("#main-details .description-p.long");

const imgContainer = document.querySelector("#main-details .main-img");
const gameTitle = document.querySelector("#main-details .sec-header");
const screenShotsList = document.querySelector("#main-details .screenshots-container");
const backgroundImg = document.querySelector('#main-details .background');
const visitedLink = document.querySelector('#main-details a');
const generalList = document.querySelectorAll('.general li');
const requirementsContainer = document.querySelector('.requirements-container')

export function createGameDetails(game) {
  const titleEl = createTitle(game);
  const paragraphShortEl = createDescriptionParagraph(game, 'short');
  const paragraphLongtEl = createDescriptionParagraph(game, 'long');
  const imgEL = createImg(game);

  createBackgroundImage(game, backgroundImg);

  visitedLink.href = game.game_url;

  createScreenShotList(game.screenshots);

  createGeneralList(game);

  if(game.minimum_system_requirements){
    createRequirementsList(game);
  }
  
  gameTitle.appendChild(titleEl);
  descShortContainer.appendChild(paragraphShortEl);
  descLongContainer.appendChild(paragraphLongtEl);
  imgContainer.appendChild(imgEL);
}


function createTitle(game){
    const title = document.createElement("h2");
    title.textContent = game.title;
    return title;
}
 
function createDescriptionParagraph(game, descriptionSize){
    const paragraph = document.createElement("p");
    if(descriptionSize === 'short'){
         paragraph.textContent = game.short_description;
    }else{
        paragraph.textContent = game.description;
    }
    
    return paragraph;
}

function createImg(game){
    const gameImg = document.createElement("img");
    gameImg.src = game.thumbnail;
    return gameImg;
}

function createBackgroundImage(game, targetEl){
  targetEl.style.backgroundImage = `url(${game.thumbnail})`;
  targetEl.style.backgroundSize = "cover";
  targetEl.style.backgroundPosition = "center";
  targetEl.style.overflow = 'hidden';
  targetEl.style.position = 'relative'
}

function createScreenShotList(screenshots) {
    screenshots.forEach(screenshot => {
        const screenshotEl = createScreenShot(screenshot.image);
        screenShotsList.appendChild(screenshotEl);
    });
}

function createScreenShot(screenShot){
    const divContainer = document.createElement('div');
    divContainer.className = "screenshot";

    // const ImgEl = createScreenShotImage(screenShot);

    createScreenShotImgBackground(divContainer, screenShot)

    const gradientDiv = document.createElement("div");
    gradientDiv.className = "gradient-black"

    // divContainer.appendChild(ImgEl);
    divContainer.appendChild(gradientDiv);

    return divContainer;
}
function createScreenShotImgBackground(element, screenShot){
  element.style.backgroundImage = `url('${screenShot}')`;
  element.style.backgroundSize = 'cover';
  element.style.backgroundPosition = 'center'
}

// function createScreenShotImage(screenShot) {
//     const img = document.createElement('img');
//     img.src = screenShot;

//     return img;
// }


function createGeneralList(game) {
  const values = [game.platform, game.developer, game.genre, game.release_date];

  generalList.forEach((element, index) => {
    const span = element.querySelector('span');
    if (span && values[index] !== undefined) {
      span.textContent = values[index];
    }
  });
}

function createRequirementsList(game) {
   const minRequired = game.minimum_system_requirements;

  requirementsContainer.innerHTML = '';

  if (!minRequired || Object.keys(minRequired).length === 0) {
    return;
  }

  const ul = document.createElement('ul');
  ul.className = 'list required';

  const requirements = {
    OS: minRequired.os,
    Processor: minRequired.processor,
    Memory: minRequired.memory,
    Graphics: minRequired.graphics,
    Storage: minRequired.storage
  };

  Object.entries(requirements).forEach(([key, value]) => {
    if (!value) return;
    const li = document.createElement('li');

    const h4El = document.createElement('h4');
    h4El.textContent = `${key}: `;

    const span = document.createElement('span');
    span.textContent = value;

    li.appendChild(h4El);
    li.appendChild(span);
    ul.appendChild(li);
  });

  const h3El = document.createElement('h3');
  h3El.textContent = "minimum system requirements";

  requirementsContainer.appendChild(h3El)
  requirementsContainer.appendChild(ul);
}
