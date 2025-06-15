export function createGameCard(game, showDesc= false) {
    const gameImg = createCardImg(game);
    const gradientCard = createCardGradient();
    const headerEl = createCardHeader(game);
    const descEl = createCardDesc(game);
    const spanEl = createCardDate(game);
    const caption = createCardCaption(headerEl, descEl, spanEl, showDesc);
    const gameCard = createCard(gameImg, gradientCard, caption, game.id, showDesc)

    return gameCard;
}

function createCard(gameImg, gradientCard, caption, gameId){
    const gameCard = document.createElement("a");
    gameCard.className = "game-card";
    gameCard.href = `single-game.html?id=${gameId}`;
    gameCard.append(gameImg, gradientCard, caption);
    return gameCard;
}

function createCardImg(game){
    const gameImg = document.createElement("img");
    gameImg.src = game.thumbnail;
    return gameImg;
}

function createCardGradient(){
    const gradientCard = document.createElement("div");
    gradientCard.className = "gradient-black";
    return gradientCard;
}

function createCardCaption(headerEl, descEl, spanEl, showDesc){
    const caption = document.createElement("div");
    caption.className = "caption";
    if(showDesc){
        caption.append(headerEl, descEl, spanEl);
    }else{
        caption.append(headerEl,  spanEl);
    }
    return caption;
}

function createCardHeader(game){
    const headerEl = document.createElement("h3");
    headerEl.textContent = game.title;
    return headerEl;
}

function createCardDesc(game){
    const descEl = document.createElement("p");
    descEl.textContent = game.short_description;
    return descEl;
}

function createCardDate(game){
    const spanEl = document.createElement("span");
    spanEl.textContent = game.release_date;
    return spanEl;
}
