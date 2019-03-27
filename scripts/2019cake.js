var camera, renderer;

window.onload = function() {
    // scene and camera.
    var scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 20;
    
    // orbit controls
    var controls = new THREE.OrbitControls(camera);
    controls.enableDamping = true;
    controls.enableKeys = true;
    controls.maxPolarAngle = Math.PI / 2;
    
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
    var geometry = new THREE.PlaneGeometry(150, 150, 100, 100);
    var material = new THREE.MeshStandardMaterial({color: 0xC0C0C0, side: THREE.DoubleSide});

    var plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    plane.position.y = -15;
    plane.rotation.x = Math.PI / 2;
    plane.receiveShadow = true;    

    
    // add spotlight that casts shadow onto objects that recieve it
    var spotLight = new THREE.SpotLight(0xffffff);

    spotLight.position.set(5, 20, 3);
    spotLight.castShadow = true;
    spotLight.penumbra = 0.5;
    spotLight.intensity = 1;

    // make higher res
    spotLight.shadowMapWidth = 1024;
    spotLight.shadowMapHeight = 1024;

    scene.add(spotLight);

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
        
        // add gltf scene and make chip cast shadow from light
        scene.add(gltf.scene);
        chip = scene.getObjectByName('CisspChip');
        chip.castShadow = true;
        
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

// update on resize
window.onresize = function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}