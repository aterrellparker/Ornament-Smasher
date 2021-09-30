Target = function(game, posX, posZ, posY) {
     var cot = Math.floor((Math.random() * 20) + 1);
    var color1 = (Math.random() * (0 - 1.000) + 1).toFixed(1);
    var color2  = (Math.random() * (0 - 1.000) + 1).toFixed(1);
    var color3 = (Math.random() * (0 - 1.000) + 1).toFixed(1);
    var opacity = (Math.random() * (.5 - 1) + 1).toFixed(1);
    var targetshape = Math.floor((Math.random() * 16) + 1);
    this.game = game;
     
    BABYLON.Mesh.call(this, "target", this.game.scene);
    var vd = BABYLON.VertexData.CreateSphere(targetshape, 5);
    vd.applyToMesh(this, true);

    // The game
    this.game = game;
    // Target position
    this.position = new BABYLON.Vector3(posX, posY, posZ);
    var target1 = new BABYLON.StandardMaterial("texture1", this.game.scene);
    target1.alpha = opacity;
    if(cot < 10){
    target1.diffuseTexture = new BABYLON.Texture("Ornament" + cot + ".jpg", this.game.scene);
    }
    if(cot > 10){
    target1.diffuseColor = new BABYLON.Color3(color1, color2, color3);
    target1.emissiveColor = new BABYLON.Color3(color1, color2, color3);
    target1.specularColor = new BABYLON.Color3(color1, color2, color3);
    }
    this.material = target1;
  
    var _this = this;
    this.game.scene.registerBeforeRender(function() {
   
        _this.rotation.y += 0.01;

        
        if(ammo === 0){
        document.getElementById("ammolose").style.visibility = "visible"; 
       }
    });
};

// Our object is a BABYLON.Mesh
Target.prototype = Object.create(BABYLON.Mesh.prototype);
// And its constructor is the Ship function described above.
Target.prototype.constructor = Target;

Target.prototype.explode = function(cot, color1, color2, color3, opacity) {
    this.dispose();
    var snowballbox = BABYLON.Mesh.CreateBox("box", 5.0, this.game.scene);
    snowballbox.position = this.position;
    snowballbox.isVisible = false;
    var ammochance = Math.floor((Math.random() * 10) + 1);
 
    var particleSystem1 = new BABYLON.ParticleSystem("particles", 100, this.game.scene );
    particleSystem1.emitter = snowballbox
    particleSystem1.particleTexture = new BABYLON.Texture("assets/particles/smoke.png", this.game.scene);
    particleSystem1.emitRate = 5;
    particleSystem1.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    particleSystem1.minEmitPower = 1;
    particleSystem1.maxEmitPower = 3;
    particleSystem1.color1 = new BABYLON.Color4(0, 1, 0, 1.0);
    particleSystem1.colorDead = new BABYLON.Color4(1, 0, 1, 0.0);
    particleSystem1.minSize = 30;
    particleSystem1.maxSize = 30;
    particleSystem1.minLifeTime = 0.25;
    particleSystem1.maxLifeTime = 0.25;
    particleSystem1.manualEmitCount = 300;
    particleSystem1.start();
    
    var particleSystem2 = new BABYLON.ParticleSystem("particles", 100, this.game.scene );
    particleSystem2.emitter = snowballbox
    particleSystem2.particleTexture = new BABYLON.Texture("assets/particles/shatter.png", this.game.scene);
    particleSystem2.emitRate = 5;
    particleSystem2.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
    particleSystem2.minEmitPower = 1;
    particleSystem2.maxEmitPower = 3;
    particleSystem2.direction1 = new BABYLON.Vector3(-8, 0, 8);
    particleSystem2.direction2 = new BABYLON.Vector3(8, 0, -8);
    particleSystem2.minAngularSpeed = 5.5;
    particleSystem2.maxAngularSpeed = 6;
    particleSystem2.minEmitBox = new BABYLON.Vector3(1, 1, 1); // Starting all from
    particleSystem2.maxEmitBox = new BABYLON.Vector3(1, 1, 1); // To...
    particleSystem2.color1 = new BABYLON.Color4(1, 0, 0, 1.0);
    particleSystem2.color2 = new BABYLON.Color4(1, 0, 0, 1.0);
    particleSystem2.colorDead = new BABYLON.Color4(0, 0, 0, 0.0);
    particleSystem2.minSize = 1;
    particleSystem2.maxSize = 1;
    particleSystem2.minLifeTime = 5;
    particleSystem2.maxLifeTime = 5;
    particleSystem2.manualEmitCount = 3000;
    particleSystem2.gravity = new BABYLON.Vector3(0, -19, 0);
    particleSystem2.start();
   if(ammochance === 1){
        ammo += 10;
        var snowballbox = BABYLON.Mesh.CreateBox("box", 5.0, this.game.scene);
       
        snowballbox.position = this.position;
        snowballbox.isVisible = true;
        snowballbox.setPhysicsState({impostor:BABYLON.PhysicsEngine.BoxImpostor, move:true, mass:1, friction:0.5, restitution:0.1});
    } 

};