class Riceball extends Phaser.GameObjects.Sprite {
    
    constructor(scene){
        var x = scene.player.x;
        var y = scene.player.y;
        
        super(scene,x,y,"riceball")

        scene.add.existing(this);
        scene.physics.world.enableBody(this);

       //* Gruppe riceballs
        scene.riceballs.add(this);



    }

   
}
