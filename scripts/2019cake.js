window.onload = function() {

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var controls = new THREE.OrbitControls(camera);

var renderer = new THREE.WebGLRenderer();
    
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);
    
    var chip;
    
    var loader = new THREE.GLTFLoader();
    loader.load('models/cissp chip2.glb',
    function(gltf) {
        
        scene.add(gltf.scene);
        chip = scene.getObjectByName('CisspChip');
        chip.castShadow = true;
        console.log(chip);
/*
    var geometry = new THREE.BoxGeometry(1, 1, 1);
    var material = new THREE.MeshBasicMaterial({color: 0x00ff00});
    cube = new THREE.Mesh(geometry, material);
    scene.add(cube);
    
*/
        
        var light = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(light);
        
        var axesHelper = new THREE.AxesHelper(15);
        scene.add(axesHelper);
        
        console.log(scene);
        camera.position.z = 20;
        
        var geometry = new THREE.PlaneGeometry(500, 500, 100, 100);
        var material = new THREE.MeshStandardMaterial({color: 0xC0C0C0, side: THREE.DoubleSide});
        
        var plane = new THREE.Mesh(geometry, material);
        scene.add(plane);
        plane.position.y = -15;
        plane.rotation.x = Math.PI / 2;
        plane.receiveShadow = true;
        
        // spotlight
        var spotLight = new THREE.SpotLight(0xffffff);
        
        spotLight.position.set(5, 20, 3);
        spotLight.castShadow = true;
        spotLight.penumbra = 0.5;
        spotLight.intensity = 1;
        
        // make higher res
        spotLight.shadowMapWidth = 1024;
        spotLight.shadowMapHeight = 1024;
        
        scene.add(spotLight);
        
        var spotLightHelper = new THREE.SpotLightHelper(spotLight);
        scene.add(spotLightHelper);
        
    }, undefined, function(error) {
            console.error(error);
    });
    
    
    


function animate() {
    requestAnimationFrame(animate);
    
    chip.rotation.x += 0.01;
    chip.rotation.y += 0.01;
    
    controls.update();
    
    renderer.render(scene, camera);
}
animate();
}

window.onresize = function() {
    
}