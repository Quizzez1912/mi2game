var gameSettings = {
    playerSpeed: 300,

}

var config = {
    type: Phaser.AUTO,
    width: 1500,
    height: 750,
    backgroundColor: 0x000000,
    scene: [Scene1, Scene2, SceneWin, SceneLose],
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            debug: false
        }
    },
}

var game = new Phaser.Game(config);
