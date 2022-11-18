class Scene1 extends Phaser.Scene {
  constructor() {
    super("PreGame");

  }


  preload() {

    //#region //! Preload für StartScene (Background Controls Gametitle MusicIcon PlayButton)
    // Background
    this.load.image("background", "assets/pregame/pregamebackground.png");
    // Controls
    this.load.image("controls", "assets/pregame/gameControl.png");
    // Title
    this.load.image("sushimaster", "assets/pregame/sushimasterLogo.png")
    // PlayButton Spritesheet
    this.load.spritesheet("playButton", "assets/pregame/playButton.png", {
      frameWidth: 285,
      frameHeight: 134
    });
    // Music Icon Spritesheet
    this.load.spritesheet("music", "assets/pregame/music.png", {
      frameWidth: 128,
      frameHeight: 64
    });

    this.load.image("showEnemies", "assets/pregame/enemy.png");

    
    //! Preload endscene
    this.load.spritesheet("winOni", "assets/endWinJump.png", {
      frameWidth: 600,
      frameHeight: 400
    });



    //#endregion

    //#region  //! Preload für das Game (Assets / Atlas)

    //* Hintergrund für das Spiel ( Parallax)
    this.load.image("mountain", "assets/gameBackground/mountain_bg.png")
    this.load.image("tree", "assets/gameBackground/tree.png");
    this.load.image("ground", "assets/gameBackground/street.png");


    //* Object Spritesheets & Atlas
    // Player
    this.load.atlas("player", "assets/game/playerSprite.png", "assets/game/playerSprite.json");
    this.load.atlas("onibaby", "assets/game/onibaby.png", "assets/game/onibaby.json");
    // PowerUP JumpBoost
    this.load.atlas("atlas_jumpBoost", "assets/game/powerups/jumpBoost.png", "assets/game/powerups/jumpBoost.json");
    this.load.image("jumpBoostIcon", "assets/game/powerups/jumpBoostIcon.png");

    // Rice-ball
    this.load.image("ricebowl", "assets/game/ricebowl1.png");
    this.load.image("riceball", "assets/game/riceball_oni.png");

    // Girl
    this.load.atlas("girl", "assets/enemy/girl.png", "assets/enemy/girl.json");
    // Boy
    this.load.atlas("boy", "assets/enemy/boy.png", "assets/enemy/boy.json");
    // Wasabi
    this.load.image("wasabi", "assets/enemy/wasabi.png");

    // Soyfish
    this.load.image("soyfish", "assets/enemy/soyfish.png");

    // Chopstick
    this.load.image("chopstick", "assets/enemy/chopstick.png");

    //* HUD Elemente
    // Lebensanzeige
    this.load.atlas("hp", "assets/HUD/hp.png", "assets/HUD/hp.json");

    // Bossbar
    this.load.atlas("bosshp", "assets/enemy/bosshp.png", "assets/enemy/bosshp.json");

    //#endregion

    //! Music und Soundeffekte
    //* Main Menu
    this.load.audio("menuMusic", "sounds/mainMenu.mp3");

    //* Game
    this.load.audio("playerHit", "sounds/playerHit.mp3")
    this.load.audio("soyfishThrow", "sounds/soyfishThrow22.mp3");
    this.load.audio("stickThrow", "sounds/stickThrow.mp3");
    this.load.audio("shootRiceball", "sounds/shootRiceball.mp3")

    this.load.audio("enemyArea", "sounds/enemyArea.mp3")
    this.load.audio("girlHit", "sounds/girlHit.mp3")
    this.load.audio("boyHit", "sounds/boyHit.mp3")
    this.load.audio("girlMusic", "sounds/girlMusic.mp3")
    this.load.audio("boyMusic", "sounds/boyMusic.mp3")

    this.load.audio("mainMusic", "sounds/mainMusic.mp3")

    this.load.audio("pickupRicebowl", "sounds/collectBowl.mp3")
    this.load.audio("pickupJump", "sounds/collectJumpboost.mp3")

  }

  create() {

    //#region  //! MusicButton
    this.MusicButton = this.add.sprite(config.width - 100, config.height / 2 - 300, "music");
    this.music = this.sound.add("menuMusic");
    var allowMusic = true;

    var musicConfig = {
      mute: false,
      volume: 0.7,
      rate: 1,
      detune: 0,
      seek: 0,
      loop: true,
      delay: 0
    }

    this.music.play(musicConfig);

    //#endregion

    //#region  //!Animationen 
   
    //! Endscene Jump
    this.anims.create({
      key: "oniJump_anim",
      frames: this.anims.generateFrameNumbers("winOni"),
      frameRate: 10,
      repeat: -1
    }); 

    //* ONi baby
    this.anims.create({
      key: "onibaby_anim",
      frames: this.anims.generateFrameNumbers("onibaby", {
        start: 0,
        end: 1,
      }),
      frameRate: 6,
      repeat: -1
    });


    //* Pickups 
    this.anims.create({
      key: "hoverJumpBoost_anim",
      frames: this.anims.generateFrameNumbers("atlas_jumpBoost", {
        start: 0,
        end: 10,
      }),
      frameRate: 15,
      repeat: -1
    });


    //* MusicButon
    this.anims.create({
      key: "musicOn_anim",
      frames: this.anims.generateFrameNumbers("music", {
        start: 1,
        end: 0
      }),
      frameRate: 20,
      repeat: 0
    });

    this.anims.create({
      key: "musicOff_anim",
      frames: this.anims.generateFrameNumbers("music", {
        start: 0,
        end: 1
      }),
      frameRate: 20,
      repeat: 0
    });



    //* Health HUD 
    this.anims.create({
      key: "hp5_anim",
      frames: [{ key: "hp", frame: 1 },],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "hp4_anim",
      frames: [{ key: "hp", frame: 2 },],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "hp3_anim",
      frames: [{ key: "hp", frame: 3 },],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "hp2_anim",
      frames: [{ key: "hp", frame: 4 },],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "hp1_anim",
      frames: [{ key: "hp", frame: 5 },],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "hp0_anim",
      frames: [{ key: "hp", frame: 6 },],
      frameRate: 8,
      repeat: 0
    });

    //*DEAD ANIM

    this.anims.create({
      key: "playerdead_anim",
      frames: [{ key: "player", frame: 2 },],
      frameRate: 8,
      repeat: 0
    });



    //*HIT ANIM

    this.anims.create({
      key: "playerhit_anim",
      frames: [{ key: "player", frame: 1 },],
      frameRate: 8,
      repeat: 0
    });



    //* BossHP
    //* Health HUD 

    this.anims.create({
      key: "bosshp4_anim",
      frames: [{ key: "bosshp", frame: 1 },],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "bosshp3_anim",
      frames: [{ key: "bosshp", frame: 2 },],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "bosshp2_anim",
      frames: [{ key: "bosshp", frame: 3 },],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "bosshp1_anim",
      frames: [{ key: "bosshp", frame: 4 },],
      frameRate: 8,
      repeat: 0
    });

    this.anims.create({
      key: "bosshp0_anim",
      frames: [{ key: "bosshp", frame: 5 },],
      frameRate: 8,
      repeat: 0
    });



    //* PlayButton
    this.anims.create({
      key: "playButton_anim",
      frames: this.anims.generateFrameNumbers("playButton"),
      frameRate: 5,
      repeat: -1
    });


    //* ENEMY
    this.anims.create({
      key: "boy_anim",
      frames: this.anims.generateFrameNumbers("boy"),
      frameRate: 10,
      repeat: 0
    });

    this.anims.create({
      key: "girl_anim",
      frames: this.anims.generateFrameNumbers("girl"),
      frameRate: 18,
      repeat: 0
    });

   
    //#endregion

    //#region  //! Create Start Menu (Images & Sprites)  

    //* Background
    this.background = this.add.image(0, 0, "background");
    this.background.setOrigin(0, 0);
    this.background.setDepth(-10);

    //* Controls Instruction
    this.controls = this.add.image(config.width - 320, 120, "controls").setScale(0.25);
    this.controls.setOrigin(0, 0);
    //* Game Title
    this.sushimaster = this.add.image(config.width / 2, config.height / 2 - 160, "sushimaster");

    //* Play Button
    this.playButton = this.add.sprite(config.width / 2, config.height / 2, "playButton");
    this.playButton.play("playButton_anim");

    this.showEnemies = this.add.image(10, 270, "showEnemies").setScale(0.85);
    this.showEnemies.setOrigin(0, 0);
    //#endregion

    //#region //! Start Menu Interaction

    //* Music Button
    this.MusicButton.setInteractive({ cursor: "pointer" });     // Cursor Symbol ändern
    this.MusicButton.on("pointerdown", () => {
      if (allowMusic) {
        this.music.pause();
        allowMusic = false;
        this.MusicButton.play("musicOff_anim")
      } else {
        this.music.resume(musicConfig);
        allowMusic = true;
        this.MusicButton.play("musicOn_anim")
      }
    });

    //* Play Button
    this.playButton.setInteractive({ cursor: "pointer" });     // Cursor Symbol ändern
    this.playButton.on("pointerdown", () => {
      this.music.stop();
      this.scene.start("playGame");

      //allowMusic = false;

    });

    //#endregion


  }

  update() {


  }
}
