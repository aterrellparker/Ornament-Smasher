/**
 * The arena is the world where the player will evolve
 * @param scene
 * @constructor
 */
Arena = function(game) {
    this.game = game
    // Skybox
      var skybox = BABYLON.Mesh.CreateBox("skyBox", 1000.0, this.game.scene);
      skybox.infiniteDistance = true;
      var skyboxMaterial = new BABYLON.StandardMaterial("skyBox", this.game.scene);
      skyboxMaterial.backFaceCulling = false;
      skyboxMaterial.reflectionTexture = new BABYLON.CubeTexture("skybox/skybox", this.game.scene);
      skyboxMaterial.reflectionTexture.coordinatesMode = BABYLON.Texture.SKYBOX_MODE;
      skyboxMaterial.diffuseColor = new BABYLON.Color3(0, 0, 0);
      skyboxMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
      skybox.material = skyboxMaterial;
      skybox.layerMask = 2;
    // The arena size
    this.size = 200;
    //ground material
    var groundMaterial = new BABYLON.StandardMaterial("ground", this.game.scene);
    groundMaterial.diffuseTexture = new BABYLON.Texture("./assets/snow.jpg", this.game.scene);
    groundMaterial.diffuseTexture.uScale = 6;
    groundMaterial.diffuseTexture.vScale = 6;
    groundMaterial.specularColor = new BABYLON.Color3(0, 0, 0);
    // The ground
    var ground = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "./assets/heightMap.png", 750, 750, 50, 0, 10, this.game.scene, false);
    ground.position.y = -2.0;
    ground.material = groundMaterial;
    ground.checkCollisions = true;
    // a second gorund for variety
    var ground2 = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "./assets/heightMap2.png", 200, 200, 50, 0, 10, this.game.scene, false);
    ground2.position.y = -2.0;
    ground2.position.x = -10.0;
    ground2.material = groundMaterial;
    ground2.checkCollisions = true;
    // a third gorund for variety
    var ground3 = BABYLON.Mesh.CreateGroundFromHeightMap("ground", "./assets/heightMap3.png", 100, 100, 50, 0, 5, this.game.scene, false);
    ground.position.y = -2.0;
    ground3.position.x = -50.0;
    ground3.material = groundMaterial;
    ground3.checkCollisions = true;
    //EXTRA ground
    var extr = BABYLON.Mesh.CreateGround("ground1", 1000, 1000, 2, this.game.scene);
    extr.position.y = -2.0;
    extr.material = groundMaterial;
    extr.checkCollisions = true;
    
   ground.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false});
   ground2.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false});
   ground3.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false});
   extr.setPhysicsState({ impostor: BABYLON.PhysicsEngine.BoxImpostor, move:false});
   //  create a cloud for snow
   var sphere = new BABYLON.Mesh.CreateSphere('sphere1', 16, 2, this.game.scene);
   // move the cloud upward
   sphere.position.y = 100;
   sphere.isVisible = false;
   // Create a particle system
    var particleSystem = new BABYLON.ParticleSystem("particles", 20000, this.game.scene);

    //Texture of each particle
    particleSystem.particleTexture = new BABYLON.Texture("assets/particles/smoke.png", this.game.scene);

    // Where the particles come from
    particleSystem.emitter = sphere; // the starting object, the emitter
    particleSystem.minEmitBox = new BABYLON.Vector3(-100, 0, 100); // Starting all from
    particleSystem.maxEmitBox = new BABYLON.Vector3(100, 0, -100); // To...

    // Colors of all particles
    particleSystem.color1 = new BABYLON.Color4(0.7, 0.8, 1.0, 1.0);
    particleSystem.color2 = new BABYLON.Color4(0.2, 0.5, 1.0, 1.0);
    particleSystem.colorDead = new BABYLON.Color4(0, 0, 0.2, 0.0);

    // Size of each particle (random between...
    particleSystem.minSize = 0.1;
    particleSystem.maxSize = 0.5;

    // Life time of each particle (random between...
    particleSystem.minLifeTime = 0.3;
    particleSystem.maxLifeTime = 20;

    // Emission rate
    particleSystem.emitRate = 1000;

    // Blend mode : BLENDMODE_ONEONE, or BLENDMODE_STANDARD
    particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_ONEONE;

    // Set the gravity of all particles
    particleSystem.gravity = new BABYLON.Vector3(0, -9.81, 0);

    // Direction of each particle after it has been emitted
    particleSystem.direction1 = new BABYLON.Vector3(-30, -10, 30);
    particleSystem.direction2 = new BABYLON.Vector3(30, -10, -30);

    // Angular speed, in radians
    particleSystem.minAngularSpeed = 0;
    particleSystem.maxAngularSpeed = Math.PI;

    // Speed
    particleSystem.minEmitPower = 1;
    particleSystem.maxEmitPower = 3;
    particleSystem.updateSpeed = 0.005;
  
    particleSystem.checkCollisions = true;
    
    // Start the particle system
    particleSystem.start();
    
   
    var _this = this;
    setInterval(function() {
        var posX = _this._randomNumber(-_this.size/2, _this.size/2);
        var posZ = _this._randomNumber(-_this.size/2, _this.size/2);
        var posY = Math.floor((Math.random() * 8) + 3);
        var t = new Target(_this.game, posX, posZ, posY);
    }, 2000);

    // Minimap
    var mm = new BABYLON.FreeCamera("minimap", new BABYLON.Vector3(0,25,0), this.game.scene);
    mm.layerMask = 0;
    
    mm.mode = BABYLON.Camera.ORTHOGRAPHIC_CAMERA;
    
    mm.orthoLeft = -this.size/2;
    mm.orthoRight = this.size/2;
    mm.orthoTop =  this.size/2;
    mm.orthoBottom = -this.size/2;

    mm.rotation.x = Math.PI/2;
    

    var xstart = 0.79,
        ystart = 0.65;
     var width = 0.99-xstart,
        height = 1-ystart;

    mm.viewport = new BABYLON.Viewport(
        xstart,
        ystart,
        width,
        height
    );
    this.game.scene.activeCameras.push(mm);
    
};


Arena.prototype = {

    /**
     * Generates a random number between min and max
     * @param min
     * @param max
     * @returns {number}
     * @private
     */
    _randomNumber : function (min, max) {
        if (min == max) {
            return (min);
        }
        var random = Math.random();
        return ((random * (max - min)) + min);
    },

    _deactivateSpecular : function(mesh) {
        if (!mesh.material) {
            mesh.material = new BABYLON.StandardMaterial(mesh.name+"mat", this.game.scene);
        }
        mesh.material.specularColor = BABYLON.Color3.Black();
    }

};