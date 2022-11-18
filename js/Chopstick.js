class Chopstick extends Phaser.GameObjects.Sprite {

    constructor(scene) {
        var x = scene.girl.x - 150;
        var y = scene.girl.y + 95;

        super(scene, x, y, "chopstick")

        scene.add.existing(this).setScale(2);
        scene.physics.world.enableBody(this);

        //* Gruppe riceballs
        scene.chopsticks.add(this);



    }


}
