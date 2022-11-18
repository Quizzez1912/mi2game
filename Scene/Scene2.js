class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");

    }

    preload() {

    }

    create() {

        //#region  //!  Sounds and Music
        this.playerHitSound = this.sound.add("playerHit");
        this.soyfishSound = this.sound.add("soyfishThrow");
        this.stickSound = this.sound.add("stickThrow");
        this.shootRiceballSound = this.sound.add("shootRiceball");

        this.enemyAreaSound = this.sound.add("enemyArea");
        this.girlHitSound = this.sound.add("girlHit");
        this.boyHitSound = this.sound.add("boyHit");

        this.girlMusic = this.sound.add("girlMusic");
        this.boyMusic = this.sound.add("boyMusic");

        this.mainMusic = this.sound.add("mainMusic");

        this.pickupRicebowl = this.sound.add("pickupRicebowl");
        this.pickupJump = this.sound.add("pickupJump");


        const throwSoundConfig = {
            mute: false,
            volume: 0.3,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }
        const enemySoundConfig = {
            mute: false,
            volume: 0.7,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        const hitSoundConfig = {
            mute: false,
            volume: 0.5,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        }

        const musicConfig = {
            mute: false,
            volume: 0.8,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }


        //#endregion

        //#region //! HUD Create


        //* Healthbar
        this.hpValue = 6;
        this.hp = this.add.sprite(config.width - 200, 10, "hp");
        this.hp.setOrigin(0, 0);
        this.hp.setDepth(10);
        this.hp.setScrollFactor(0);

        //* Bosshealthbar Girl
        this.bosshpGirlValue = 5;
        this.bosshpGirl = this.add.sprite(config.width / 2, 10, "bosshp").setScale(1.25);
        this.bosshpGirl.setOrigin(0.5, 0);
        this.bosshpGirl.setDepth(0);
        this.bosshpGirl.setScrollFactor(0);

        //* Bosshealthbar Boy
        this.bosshpBoyValue = 5;
        this.bosshpBoy = this.add.sprite(config.width / 2, 10, "bosshp").setScale(1.25);
        this.bosshpBoy.setOrigin(0.5, 0);
        this.bosshpBoy.setDepth(0);
        this.bosshpBoy.setScrollFactor(0);



        //* Ricebar 
        this.avaibleRice = 5;
        this.ricebowlIcon = this.add.image(config.width - 70, 95, "ricebowl");
        this.ricebowlIcon.setOrigin(0, 0);
        this.ricebowlIcon.setDepth(10);
        this.ricebowlIcon.setScrollFactor(0);
        this.riceCount = this.add.text(config.width - 75, 100, "5", {
            font: "65px Arial",
            fill: "#000000",

        });
        this.riceCount.setOrigin(1, 0);
        this.riceCount.setScrollFactor(0);
        this.riceCount.setDepth(10);


        //* JumpBoost
        this.jumpBoostIcon = this.add.image(20, 10, "jumpBoostIcon").setScale(2);
        this.jumpBoostIcon.setOrigin(0, 0);
        this.jumpBoostIcon.setDepth(40);
        this.jumpBoostIcon.setScrollFactor(0);
        this.jumpBoostIcon.setAlpha(0.25);
        //#endregion

        //#region  //! Background Create (Parallax)

        this.mountain = this.add.tileSprite(0, 0, 6000, game.config.height, "mountain");
        this.mountain.setOrigin(0, 0);
        this.mountain.setScrollFactor(0);

        this.tree = this.add.tileSprite(0, 0, 6000, 750, "tree");
        this.tree.setOrigin(0, 1);
        this.tree.setScrollFactor(0);
        this.tree.y = game.config.height - 5;

        // Ground Layer mit Höhe von 50px
        this.ground = this.add.tileSprite(0, 1, 7400, 50, "ground");
        this.ground.setOrigin(0, 1);
        this.ground.setScrollFactor(0);
        this.ground.y = game.config.height;
        this.physics.add.existing(this.ground);
        this.ground.body.setCollideWorldBounds(true);
        //#endregion 

        //#region   //! World Physics 
        this.physics.world.gravity.y = 400;
        this.physics.world.bounds.width = 7400;


        //#endregion

        //#region //! Player definition and PlayerInputs
        this.cursorKeys = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.player = this.physics.add.sprite(100, 618, "player");
        this.playerDead = false;
        this.playerWIN = false;
        this.riceballCooldown = 0;
        this.riceballOnCooldown = false;

        //#endregion

        //#region  //! Enemies (OLD Guy && Girl && Wasabi)
        //* Boy
        
        this.boy = this.physics.add.sprite(5000, 100, "boy").setScale(1.75);
        this.boy.setOrigin(0, 0);
        this.boy.setDepth(20);
        this.boy.setImmovable(true);
        this.boyShootTime = 0;
        this.boySpawntime = 0;
        this.boyActive = false;
        this.boyDead = false;
        this.boyAppearSound = false;
        
        // console.log("x boy" + this.boy.x)

        //* Girl
        
        this.girl = this.physics.add.sprite(2000, 100, "girl").setScale(1.75);
        this.girl.setOrigin(1, 0);
        this.girl.setDepth(10);
        this.girl.setImmovable(true);
        this.girlShootTime = 0;
        this.girlActive = false;
        this.girlDead = false;
        this.girlAppearSound = false;

        
        //* Wasabi Group
        this.wasabiGroup = this.physics.add.group();
        this.wasabiSpawntime = 0;

        //* Soyfish Group
        this.soyfishs = this.physics.add.group({
            allowGravity: false,
            velocityX: -750,
            velocityY: 100
        });
        this.soyfishs.setDepth(30);

        
        //* Chopstick Group
        this.chopsticks = this.physics.add.group({
            allowGravity: false,
            velocityX: -650,
            velocityY: 90
        });

        //* Game end
        this.onibaby = this.physics.add.sprite(7200, 650, "onibaby");
        this.onibaby.play("onibaby_anim");

        //#endregion

        //#region  //!PickUP Ricebowl  + Powerup ( JumpBoost )

        this.ricebowl = this.physics.add.group({
            key: "ricebowl",
            repeat: 1,
        });
        this.ricebowl.children.iterate(child => {
            this.physics.add.collider(child, this.ground);
            child.x = Phaser.Math.Between(2000, 4000);
            child.y = 668;
            child.setImmovable(true);
        });

        this.riceballs = this.physics.add.group({
            allowGravity: false,
            velocityX: 400,
            velocityY: 10
        });

        //* Jump Boost
        this.pwrJump = this.physics.add.group({
            key: "2x",
            repeat: 0,
            allowGravity: false,
        });
        this.pwrJump.children.iterate(child => {
            this.physics.add.collider(child, this.ground);
            child.x = Phaser.Math.Between(100, 4500);
            child.y = 550;
            child.setImmovable(true);
            child.play("hoverJumpBoost_anim");
        });

        this.jumpBoost = false;
        this.avaibleBoostJump = 0;
        this.physics.add.overlap(this.player, this.pwrJump, this.takePwrJumpBoost, null, this);
        //#endregion


        //#region //! Collider & Overlapping (between Player and Enemies and other Objects)

        //* Girl
        this.physics.add.collider(this.girl, this.ground);
        this.physics.add.collider(this.girl, this.player, this.playerCollideGirl, null, this);

        //* Boy
        this.physics.add.collider(this.boy, this.ground);
        this.physics.add.collider(this.boy, this.player, this.playerCollideBoy, null, this);

        //* Player
        this.physics.add.collider(this.player, this.ground);
        this.physics.add.collider(this.player, this.chopsticks, this.chopstickHitPlayer, null, this);
        this.physics.add.collider(this.player, this.soyfishs, this.soyfishHitPlayer, null, this);
        this.physics.add.overlap(this.player, this.wasabiGroup, this.wasabiHit, null, this);
        this.physics.add.overlap(this.player, this.ricebowl, this.ricebowlHit, null, this);

        //* Onibaby
        this.physics.add.collider(this.onibaby, this.ground);
        this.physics.add.overlap(this.player, this.onibaby, this.gamEnd, null, this);

        //* Riceballs
        this.physics.add.collider(this.ground, this.riceballs, this.riceballHitGround, null, this);
        this.physics.add.overlap(this.riceballs, this.wasabiGroup, this.riceballHitWasabi, null, this);
        this.physics.add.collider(this.girl, this.riceballs, this.playerHitGirl, null, this);
        this.physics.add.collider(this.boy, this.riceballs, this.playerHitBoy, null, this);
        this.physics.add.overlap(this.riceballs, this.chopsticks, this.riceballGetHit, null, this);
        this.physics.add.overlap(this.riceballs, this.soyfishs, this.riceballGetHit, null, this);

        //* Wasabi
        this.physics.add.collider(this.wasabiGroup, this.ground);
        this.physics.add.overlap(this.wasabiGroup, this.ricebowl, this.wasabiGetHit, null, this);
        this.physics.add.overlap(this.wasabiGroup, this.chopsticks, this.wasabiGetHit, null, this);
        this.physics.add.overlap(this.wasabiGroup, this.soyfishs, this.wasabiGetHit, null, this);

        //* Chopsticks
        this.physics.add.collider(this.ground, this.chopsticks, this.chopstickHitGround, null, this);
        this.physics.add.collider(this.player, this.chopsticks, this.chopstickHitPlayer, null, this);
        this.physics.add.overlap(this.wasabiGroup, this.chopsticks, this.chopstickHitGround, null, this);


        //* Soyfish
        this.physics.add.collider(this.ground, this.soyfishs, this.soyfishHitGround, null, this);
        this.physics.add.collider(this.player, this.soyfishs, this.soyfishHitPlayer, null, this);
        this.physics.add.overlap(this.wasabiGroup, this.soyfishs, this.soyfishHitGround, null, this);

        //#endregion

        //#region  //! Main Camera

        this.myCam = this.cameras.main;
        // Grenzen der Kamera festlegen hier = 3* der Configlänge
        this.myCam.setBounds(0, 0, 7400, game.config.height);
        // Camera verfolgt den Spieler
        this.myCam.startFollow(this.player);

        //#endregion

        this.mainMusic.play(this.musicConfig);


        //! TESTBEFEHLE FÜR DEBUGGIN

    }


    //! Update 
    update() {

        this.movePlayerManager();
        this.eventManager();
        this.controlEnemy();

        // Schnelligkeit des Scrollens bzw. des vorbeiziehens des Hintergrundes Höher = schneller vorbeiziehen
        this.mountain.tilePositionX = this.myCam.scrollX * .5;
        this.tree.tilePositionX = this.myCam.scrollX * .8;
        this.ground.tilePositionX = this.myCam.scrollX;

    }

    //#region  //! Player Functions & Eventmanager

    //* Playermovement
    movePlayerManager() {
        if (!this.playerDead) {
            if (this.cursorKeys.left.isDown && this.player.x > 60) {

                this.player.setVelocityX(-gameSettings.playerSpeed);

            } else if (this.cursorKeys.right.isDown && this.player.x < 7400 - 60) {
                this.player.setVelocityX(gameSettings.playerSpeed);


            } else {
                this.player.setVelocityX(0);
            }
            // Jump
            if (this.cursorKeys.up.isDown && this.player.body.onFloor()) {
                this.player.setVelocityY(-gameSettings.playerSpeed);

            }
            // Jump with Boost    
            if (this.cursorKeys.up.isDown && this.player.body.onFloor() && this.jumpBoost) {
                this.player.setVelocityY(-gameSettings.playerSpeed * 1.5);
                this.avaibleBoostJump++;
                if (this.avaibleBoostJump == 2) {
                    this.jumpBoost = false;
                    this.jumpBoostIcon.setAlpha(0.25);
                }
                console.log(" jumpBoost JUMP schon benutzt == " + this.avaibleBoostJump)

            }
        }

        //* Player shoot Riceball
        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {
            console.log("Vor dem Abschießen noch " + this.avaibleRice + " Reisbaelle übrig");

            if (this.avaibleRice > 0 && !this.riceballOnCooldown) {
                this.shootRiceball();
                this.avaibleRice--;
                this.riceballOnCooldown = true;


                if (this.avaibleRice == 0) {
                    this.riceCount.setText("");
                } else {
                    this.riceCount.setText(this.avaibleRice);
                }
            }

        }
    }

    //#region //! ShootFunction
    shootRiceball() {
        var riceball = new Riceball(this);
        this.shootRiceballSound.play(this.throwSoundConfig);
    }

    shootSoyfish() {
        if (!this.boyDead) {
            this.soyfish = new Soyfish(this);
            this.boy.play("boy_anim");
            this.soyfishSound.play(this.throwSoundConfig);
        }
    }

    shootChopstick() {
        if (!this.girlDead) {
            this.chopstick = new Chopstick(this);
            this.girl.play("girl_anim");
            this.stickSound.play(this.throwSoundConfig);
        }
    }
    //#endregion

    //! EVENTMANAGER
    eventManager() {

        if (this.riceballOnCooldown) {
            this.riceballCooldown++;
            console.log("riceballONCD COUNT ++ ");

            if (this.riceballCooldown / 60 > 5) {
                console.log("riceball COOLDOWN VORBEI");
                this.riceballCooldown = 0;
                this.riceballOnCooldown = false;
            }
        }

        if (this.avaibleRice == 0 || this.riceballOnCooldown) {
            this.ricebowlIcon.alpha = 0.5;

        } else {
            this.ricebowlIcon.alpha = 1.0;
        }

        //* Active Girl Shooting
        if (this.player.x > (this.girl.x - 800) && !(this.girlDead)) {
            //  console.log(this.player.x);
            // console.log("girl active");
            this.enemyActivGirl();
        }

        //* Active Boy Shooting
        if (this.player.x > (this.boy.x - 800) && !(this.boyDead)) {
            //   console.log(this.player.x);
            // console.log("boy active");
            this.enemyActivBoy();
        }

        if (this.playerDead) {
            this.scene.start("Lose");
        }

        if (this.playerWIN) {
            this.scene.start("Win");
        }
    }
    //#endregion

    controlHp(hpValue) {

        switch (hpValue) {
            // 2.5 Herzen
            case 5:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp5_anim");
                this.player.play("playerhit_anim");
                this.playerHitSound.play(this.hitSoundConfig);
                break;

            // 2 Herzen
            case 4:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp4_anim");
                this.playerHitSound.play(this.hitSoundConfig);
                break;

            // 1.5 Herzen
            case 3:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp3_anim");
                this.playerHitSound.play(this.hitSoundConfig);
                break;

            // 1 Herz
            case 2:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp2_anim");
                this.playerHitSound.play(this.hitSoundConfig);
                break;

            // 0.5 Herzen
            case 1:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp1_anim");
                this.playerHitSound.play(this.hitSoundConfig);
                break;

            // 0 Herzen
            case 0:

                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp0_anim");
                console.log("******TOT********");
                this.playerHitSound.play(this.hitSoundConfig);
                this.playerIsDead();
                break;

            case -1:
                console.log("DEINE LEBEN === " + hpValue);
                this.hp.play("hp0_anim");
                console.log("******TOT********");
                this.playerHitSound.play(this.hitSoundConfig);
                this.playerIsDead();
                break;



        }

    }
    controlBossHpGirl(bosshpValueGirl) {

        switch (bosshpValueGirl) {
            // 4 Herzen
            case 4:
                console.log("Boss LEBEN === " + bosshpValueGirl);
                this.bosshpGirl.play("bosshp4_anim");
                break;

            // 3 Herzen
            case 3:
                console.log("Boss LEBEN === " + bosshpValueGirl);
                this.bosshpGirl.play("bosshp3_anim");
                break;

            // 2 Herzen
            case 2:
                console.log("Boss LEBEN === " + bosshpValueGirl);
                this.bosshpGirl.play("bosshp2_anim");
                break;

            // 1 Herz
            case 1:
                console.log("Boss LEBEN === " + bosshpValueGirl);
                this.bosshpGirl.play("bosshp1_anim");
                break;

            // 0 Herzen
            case 0:
                console.log("Boss LEBEN === " + bosshpValueGirl);
                this.bosshpGirl.play("bosshp0_anim");
                console.log("******BOSS IST TOT********");
                this.girlDead = true;
                this.girl.active = false;
                this.girl.destroy();
                this.bosshpGirl.destroy();
                this.girlMusic.stop();
                this.mainMusic.play(this.musicConfig);

                break;
        }

    }

    controlBossHpBoy(bosshpValueBoy) {

        switch (bosshpValueBoy) {
            // 4 Herzen
            case 4:
                console.log("Boss LEBEN === " + bosshpValueBoy);
                this.bosshpBoy.play("bosshp4_anim");
                break;

            // 3 Herzen
            case 3:
                console.log("Boss LEBEN === " + bosshpValueBoy);
                this.bosshpBoy.play("bosshp3_anim");
                break;

            // 2 Herzen
            case 2:
                console.log("Boss LEBEN === " + bosshpValueBoy);
                this.bosshpBoy.play("bosshp2_anim");
                break;

            // 1 Herz
            case 1:
                console.log("Boss LEBEN === " + bosshpValueBoy);
                this.bosshpBoy.play("bosshp1_anim");
                break;

            // 0 Herzen
            case 0:
                console.log("Boss LEBEN === " + bosshpValueBoy);
                this.bosshpBoy.play("bosshp0_anim");
                console.log("******BOSS IST TOT********");
                this.boyDead = true;
                this.boy.active = false;
                this.boy.destroy();
                this.bosshpBoy.destroy();
                this.boyMusic.stop();
                this.mainMusic.play(this.musicConfig);
                this.onibaby.play("onibaby_anim");
                break;



        }


    }
    //#region  //! Collider Functions ( WasabiHit RicebowlHit RiceballHit ChopstickHit SoyfishHit)

    wasabiHit(player, wasabi) {
        wasabi.destroy();
        this.hpValue--;
        this.controlHp(this.hpValue);

    }

    wasabiGetHit(wasabi, ricebowl) {
        wasabi.destroy();
    }

    chopstickHitPlayer(player, chopstick) {
        chopstick.destroy();
        this.hpValue -= 2;
        this.controlHp(this.hpValue);

    }

    soyfishHitPlayer(player, soyfish) {
        soyfish.destroy();
        this.hpValue -= 2;
        this.controlHp(this.hpValue);

    }
    ricebowlHit(player, ricebowl) {
        ricebowl.destroy();
        console.log("Ricebowl aufgehoben");
        this.avaibleRice += 5;
        this.pickupRicebowl.play(this.hitSoundConfig);
        if (this.avaibleRice == 0) {
            this.riceCount.setText("");
        } else {
            this.riceCount.setText(this.avaibleRice);
        }

    }

    soyfishHitGround(ground, soyfish) {
        soyfish.destroy();
    }

    chopstickHitGround(ground, chopstick) {
        chopstick.destroy();
    }

    riceballHitGround(ground, riceball) {
        riceball.destroy();
    }

    riceballHitWasabi(riceball, wasabi) {
        riceball.destroy();
        wasabi.destroy();
    }
    riceballGetHit(riceball, enemyweapon) {
        riceball.destroy();
    }

    playerHitGirl(girl, riceball) {
        riceball.destroy();
        this.bosshpGirlValue--;
        this.girlHitSound.play(this.throwSoundConfig);
        this.controlBossHpGirl(this.bosshpGirlValue);
        console.log(this.bosshpGirlValue + "BOSS LEBEN ÜBRIG")
    }

    playerHitBoy(boy, riceball) {
        riceball.destroy();
        this.bosshpBoyValue--;
        this.boyHitSound.play(this.throwSoundConfig);
        this.controlBossHpBoy(this.bosshpBoyValue);
        console.log(this.bosshpBoyValue + "BOSS LEBEN ÜBRIG")
    }

    playerCollideGirl(girl, player) {
        this.hpValue = 0;
        this.controlHp(this.hpValue);
        this.player.setX(this.player.x - 30);
    }

    playerCollideBoy(boy, player) {
        this.hpValue = 0;
        this.controlHp(this.hpValue);
        this.player.setX(this.player.x - 30);
    }

    playerIsDead() {
        if (!this.playerDead) {
            this.player.setVelocityX(0);
            this.player.setImmovable(true);
            console.log("playerISDead");
            this.player.play("playerdead_anim");
            this.playerDead = true;
            this.girlActive = false;
            this.boyActive = false;
            this.mainMusic.stop();
            this.girlMusic.stop();
            this.boyMusic.stop();

        }


    }


    //#endregion


    //#region //! Spawn Enemy & Powerups    


    //#region //! spawnWasabi and activate Girl + Boy
    spawnWasabi() {
        var newWasabi = new Wasabi(this);
        console.log("SPAWNED WASABI");
    }

    enemyActivGirl() {
        if (!this.girlAppearSound) {
            this.enemyAreaSound.play(this.enemySoundConfig);
            this.mainMusic.stop();
            this.girlMusic.play(this.musicConfig);
            this.girlAppearSound = true;
        }
        //console.log("ACTIVE GIRL")
        this.avaibleChopstick = 100;
        this.girlActive = true;
        this.bosshpGirl.setDepth(10);
    }

    enemyActivBoy() {
        if (!this.boyAppearSound) {
            this.enemyAreaSound.play(this.enemySoundConfig);
            this.mainMusic.stop();
            this.boyMusic.play(this.musicConfig);
            this.boyAppearSound = true;

        }
        //  console.log("ACTIVE BOY")
        this.avaibleSoyfish = 100;
        this.boyActive = true;
        this.bosshpBoy.setDepth(10);
    }

    //#endregion

    controlEnemy() {
        this.wasabiSpawntime++;

        if (this.wasabiSpawntime / 60 > 5 && !this.playerDead) {
            this.wasabiSpawntime = 0;
            this.spawnWasabi();
        }

        if (this.girlActive) {
            this.girlShootTime++;
            
            if (this.girlShootTime / 60 > 3 && !this.girlDead && !this.playerDead) {
                this.girlShootTime = 0;
                this.shootChopstick();
            }
        }

        if (this.boyActive) {
            this.boyShootTime++;
          
            if (this.boyShootTime / 60 > 2.5 && !this.boyDead && !this.playerDead) {
                this.boyShootTime = 0;
                this.shootSoyfish();

            }
        }


    }

    //#endregion


    //#region //! Take Powerup
    takePwrJumpBoost(player, jumpBoost) {
        jumpBoost.destroy();
        this.jumpBoost = true;
        this.jumpBoostIcon.setAlpha(1);
        console.log("JumpBoost picked up!");
        this.pickupJump.play(this.hitSoundConfig);
    }
    //#endregion    


    gamEnd() {
        this.mainMusic.stop();
        this.playerWIN = true;
    }

}





