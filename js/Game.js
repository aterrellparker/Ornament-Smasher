var i = 120;
Game = function(canvasId) {

    var canvas = document.getElementById(canvasId);
    var engine = new BABYLON.Engine(canvas, true);

    this.scene = this._initScene(engine);

    var _this = this;
    this.loader =  new BABYLON.AssetsManager(this.scene);

    // An array containing the loaded assets
    this.assets = {};

    var meshTask = this.loader.addMeshTask("gun", "", "./assets/", "Snowcannon.babylon");
    meshTask.onSuccess = function(task) {
        _this._initMesh(task);
    };
     var snowmanTask = this.loader.addMeshTask("snowman", "", "./assets/", "snowman.babylon");
    snowmanTask.onSuccess = function(task) {
       snowmanTask.position.y = 5;
    };

    this.loader.onFinish = function (tasks) {

        // Player and arena creation when the loading is finished
        var player = new Player(_this);
        var arena = new Arena(_this);
        
        var myVar = setInterval(myTimer, 1000);
        function myTimer() {
        i += -1;
       document.getElementById("healthbar").innerHTML = i;
       }
        engine.runRenderLoop(function () {
            _this.scene.render();
        });

        window.addEventListener("keyup", function(evt) {
            _this.handleUserInput(evt.keyCode);
        });
    };
 
    this.loader.load();
    
    // Resize the babylon engine when the window is resized
    window.addEventListener("resize", function () {
        if (engine) {
            engine.resize();
        }
    },false);

};


Game.prototype = {
    /**
     * Init the environment of the game / skybox, camera, ...
     */
    _initScene : function(engine) {

        var scene = new BABYLON.Scene(engine);
        
        scene.gravity = new BABYLON.Vector3(0, -9.81, 0);
 
        // Update the scene background color
        scene.clearColor=new BABYLON.Color3(0.8,0.8,0.8);

        // Hemispheric light to light the scene
        new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(1, 2, 1), scene);
            // Fog
    scene.fogMode = BABYLON.Scene.FOGMODE_EXP;
    //BABYLON.Scene.FOGMODE_NONE;
    //BABYLON.Scene.FOGMODE_EXP;
    //BABYLON.Scene.FOGMODE_EXP2;
    //BABYLON.Scene.FOGMODE_LINEAR;

    scene.fogColor = new BABYLON.Color3(0.9, 0.9, 0.85);
    scene.fogDensity = 0.003;

    //Only if LINEAR
    //scene.fogStart = 20.0;
    //scene.fogEnd = 60.0;
        //enable pyshics
        scene.enablePhysics(new BABYLON.Vector3(0, -10, 0), new BABYLON.OimoJSPlugin());
       
        return scene;
    },


    /**
     * Handle user keyboard inputs
     * @param keycode
     */
    handleUserInput : function(keycode) {
        switch (keycode) {
            // user inputs
        }
    },

    /**
     * Initialize a mesh once it has been loaded. Store it in the asset array and set it not visible.
     * @param task
     * @private
     */
    _initMesh : function(task) {
        this.assets[task.name] = task.loadedMeshes;
        for (var i=0; i<task.loadedMeshes.length; i++ ){
            var mesh = task.loadedMeshes[i];
            mesh.isVisible = false;
        }
    }
};
