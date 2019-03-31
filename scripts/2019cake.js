const GROUND = -15;

var camera, renderer;
var emitter;

// scene and camera.
var scene = new THREE.Scene();
camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

// orbit controls
var controls = new THREE.OrbitControls(camera);
controls.enableDamping = true;
controls.enableKeys = true;
controls.enableDamping = true;
controls.dampingFactor = 1;
controls.minDistance = 10;
controls.maxDistance = 100;
//controls.maxPolarAngle = Math.PI / 2; // can't pivot below the floor plane.

//controls.autoRotate = true;

// renderer with better shadow map
renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


// add distance fog
scene.fog = new THREE.Fog(0x000000, 10, 80);


// add ambient light
var light = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(light);    


// add ground plane, receiving shadow from object that cast(s)Shadow
var geometry = new THREE.PlaneGeometry(300, 300, 100, 100);
var material = new THREE.MeshStandardMaterial({color: 0xC0C0C0, side: THREE.DoubleSide});

var plane = new THREE.Mesh(geometry, material);
//scene.add(plane);
plane.position.y = GROUND;
plane.rotation.x = Math.PI / 2;
plane.receiveShadow = true;    


// add spotlight that casts shadow onto objects that recieve it
var spotLight = new THREE.SpotLight(0xffffff);

spotLight.position.set(5, 30, 3);
spotLight.castShadow = true;
spotLight.shadow.radius = 3; // makes the edge blurrier at the expense of making it look like copies
spotLight.penumbra = 0.5;
spotLight.intensity = 1;

// make higher res
// = 1024 is faster, but edges are more jagged looking
spotLight.shadowMapWidth = 2048;
spotLight.shadowMapHeight = 2048;

//scene.add(spotLight);

// add spotlight helper
//var spotLightHelper = new THREE.SpotLightHelper(spotLight);
//scene.add(spotLightHelper);


// add axis helper
//        var axesHelper = new THREE.AxesHelper(15);
//        scene.add(axesHelper);    


// load CISSP chip model
var chip;

var loader = new THREE.GLTFLoader();
loader.load('models/cissp chip2.glb',
function(gltf) {
    // loader callback

    // add gltf scene and make chip cast shadow from light
    scene.add(gltf.scene);
    chip = scene.getObjectByName('CisspChip');
    chip.castShadow = true;
    chip.receiveShadow = true;
    chip.material.fog = false; // Makes it so the chip isn't affected by distance fog.

    loadCandle();
    


}, undefined, function(error) {
        console.error(error);
});

var flameOuter;
function loadCandle() {
var loader2 = new THREE.GLTFLoader();
loader2.load('models/candle2.glb', function(gltf) {
    scene.add(gltf.scene);
    var candle = scene.getObjectByName('Candle');
   
    candle.parent = scene.getObjectByName('CisspChip');
    
   flameOuter = scene.getObjectByName('FlameOuter'); 
    flameOuter.material = new THREE.MeshStandardMaterial();
    
    flameOuter.material.transparent = true;
    flameOuter.material.opacity = 0.8;
    flameOuter.material.emissive = new THREE.Color(0xE7E06D);
    //flameOuter.material.color = new THREE.Color(0x00ff00);
    
    // candlelight source of light.
    var candleLight = new THREE.PointLight(0xE7E06D, 5, 20);
    
    candleLight.castShadow = true;
    scene.add(candleLight);
    candleLight.parent = flameOuter;
    

    
    
    // Candle lens flare
    //var light = new THREE.PointLight(0xE7E06D, 1.5, 2000);
    
    var textureLoader = new THREE.TextureLoader();
    
    var textureFlare0 = textureLoader.load('textures/lensflare0.png');
    var textureFlare1 = textureLoader.load('textures/lensflare2.png');
    var textureFlare2 = textureLoader.load('textures/lensflare3.png');
    
    var lensFlare = new THREE.Lensflare();
    
    lensFlare.addElement( new THREE.LensflareElement( textureFlare0, 256, 0 ) );
    lensFlare.addElement( new THREE.LensflareElement( textureFlare1, 512, 0 ) );
    lensFlare.addElement( new THREE.LensflareElement( textureFlare2, 60, 0.6 ) );
    
    candleLight.add(lensFlare);
    lensFlare.position.y += 1;
        
    
    
    
    
    // start the animation loop.
    animate();
});
}

var ctr= 0;
function animate() {
    requestAnimationFrame(animate);

    //chip.rotation.x += 0.01;
    chip.rotation.x = 1 * Math.sin(ctr * .2);
    chip.rotation.y += 0.01;

    controls.update();

    // vertical bobber function
    ctr = ctr + 0.02;
    chip.position.y = 4 * Math.sin(ctr);
    //chip.position.z = 4 * Math.sin(ctr);

    //flameOuter.material.opacity = 1.4 + Math.sin(ctr * 10);
    //flameOuter.material.opacity = 0.8;
    flameOuter.rotation.x = 0.1 * Math.sin(ctr*5);
    flameOuter.rotation.y = 0.1 * Math.sin(ctr*5);
    
    renderer.render(scene, camera);
}

// Interactive
document.querySelector('#credits-link').onclick = function(e) {
    e.preventDefault();
    document.querySelector('.credits-container').style.display = 'flex';
}

document.querySelector('.credits-container').onclick = function() {
    this.style.display = 'none';
}

// prevent credits screen from closing when clicking a link within.
document.querySelector('.credits-container a').onclick = function(e) {
    e.stopPropagation();
}    


// update on resize
window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// disable iOS Safari scrolling / bouncing effects when trying to pan.
// https://stackoverflow.com/questions/7768269/ipad-safari-disable-scrolling-and-bounce-effect
function preventDefault(e) { e.preventDefault(); }
document.body.addEventListener('touchmove', preventDefault, { passive: false });