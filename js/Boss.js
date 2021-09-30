Boss = function(game, posX, posZ) {

    this.game = game;

    BABYLON.Mesh.call(this, "theboss", this.game.scene);
    var Boss = BABYLON.VertexData.CreateSphere(16, 75);

    Boss.applyToMesh(this, true);

    // The game
    this.game = game;
    // Target position
    this.position = new BABYLON.Vector3(posX, 130, posZ);


    var _this = this;
    this.game.scene.registerBeforeRender(function() {
        _this.rotation.y += 0.01;
        _this.position.x += .1
    });
};

// Our object is a BABYLON.Mesh
Boss.prototype = Object.create(BABYLON.Mesh.prototype);
// And its constructor is the Ship function described above.
Boss.prototype.constructor = Boss;

Boss.prototype.explode = function() {
    this.dispose();

    
}
