class SceneLose extends Phaser.Scene {
    constructor() {
        super("Lose");
    }

    preload() {
        this.load.image("lose", "assets/endLose.png");
        this.load.audio("music", "sounds/loseMusic.mp3");
        this.load.image("playAgain", "assets/playAgain.png");
        var musicConfig = {
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
    }

    create() {
        this.background = this.add.image(0, 0, "lose");
        this.background.setOrigin(0, 0);
        this.music = this.sound.add("music");
        this.music.play(this.musicConfig);
        this.playagain = this.add.image(0, 0, "playAgain").setScale(0.5);
        this.playagain.setOrigin(0, 0);

        this.playagain.setInteractive({ cursor: "pointer" });     // Cursor Symbol ändern
        this.playagain.on("pointerdown", () => {
            this.music.stop();
            this.scene.start("PreGame");
        });
    }
}