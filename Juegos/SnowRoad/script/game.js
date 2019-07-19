var game = {
    fps : 24,
    framerate : 1000
};

var roadFighter;

addEventListener("keydown", function (event) {
    press(event);
}, false);

addEventListener("keyup", function (event) {
    release(event);
}, false);

function Game() {
    game.context = document.getElementById('gameBoard');
    game.ctx = game.context.getContext('2d');
    roadFighter = new RoadFighter(game.ctx, game.context.width, game.context.height, directions);
    setInterval("roadFighter.update()", game.framerate/game.fps);
}

function main(){
    game = new Game();
}

function restart(){
    game.context = document.getElementById('gameBoard');
    game.ctx = game.context.getContext('2d');
    roadFighter = new RoadFighter(game.ctx, game.context.width, game.context.height, directions);
    var button = document.getElementById('again');
    button.style.display = 'none';
    button.style.zIndex = -2;
}



