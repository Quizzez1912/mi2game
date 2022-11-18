class Soyfish extends Phaser.GameObjects.Sprite {

    constructor(scene) {
        var x = scene.boy.x + 30;
        var y = scene.boy.y + 110;


        super(scene, x, y, "soyfish")

        scene.add.existing(this).setScale(2);
        scene.physics.world.enableBody(this);

        //* Gruppe riceballs
        scene.soyfishs.add(this);



    }


}
