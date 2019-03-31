/*function initCandle() {
    var emitter = Fireworks.createEmitter({ nParticles: 400 })
        .effectsStackBuilder()
            .spawnerSteadyRate(100)
            .position(Fireworks.createShapePoint(0, 0, 0))
            .velocity(Fireworks.createShapePoint(0, 0, 0))
            .lifeTime(0.3, 0.5)
            .randomVelocityDrift(Fireworks.createVector(10, 0, 10))
            .renderToThreejsParticleSystem({
                particleSystem: function(emitter) {
                    var geometry = new THREE.Geometry();
                    for (var i = 0; i < emitter.nParticles(); i++) {
                        geometry.vertices.push( new THREE.Vector3() );
                    }
                    
                    geometry.colors = new Array(emitter.nParticles());
                    for (var i = 0; i < emitter.nParticles(); i++) {
                        geometry.colors[i] = new THREE.Color();
                    }
                    
                    var texture = Fireworks.ProceduralTextures.buildTexture();
                    
                    var material = new THREE.ParticleBasicMaterial({
                        color: new THREE.Color(0x00ff00), //.setHSV(0.3, 0.9, 0.4).getHex(),
                        size: 3,
                        sizeAttenuation: true,
                        vertexColors: true,
                        map: texture,
                        blending: THREE.AdditiveBlending,
                        depthWrite: false,
                        transparent: true
                    });
                    
                    var particleSystem = new THREE.ParticleSystem(geometry, material);
                    particleSystem.dynamic = true;
                    particleSystem.sortParticles = true;
                    
                    particleSystem.position.y = -2.5;
                    scene.add(particleSystem);
                    return particleSystem;
                }
            }).back().start();
}*/


function initCandle() {
	var emitter	= Fireworks.createEmitter({nParticles : 400})
		.effectsStackBuilder()
			.spawnerSteadyRate(100)
			.position(Fireworks.createShapePoint(0, 0, 0))
			.velocity(Fireworks.createShapePoint(0, 5, 0))
			.lifeTime(0.3, 0.5)
			.randomVelocityDrift(Fireworks.createVector(10, 0, 10))
			.renderToThreejsParticleSystem({
				particleSystem	: function(emitter){
					var geometry	= new THREE.Geometry();
					// init vertices
					for( var i = 0; i < emitter.nParticles(); i++ ){
						geometry.vertices.push( new THREE.Vector3() );
					}
					// init colors
					geometry.colors	= new Array(emitter.nParticles())
					for( var i = 0; i < emitter.nParticles(); i++ ){
						geometry.colors[i]	= new THREE.Color();
					}
					
					var texture	= Fireworks.ProceduralTextures.buildTexture();
					var material	= new THREE.ParticleBasicMaterial({
						color		: new THREE.Color(0x00ff00),//.setHSV(0.3, 0.9, 0.4).getHex(),
						size		: 3,
						sizeAttenuation	: true,
						vertexColors	: true,
						map		: texture,
						blending	: THREE.AdditiveBlending,
						depthWrite	: false,
						transparent	: true
					});
					var particleSystem		= new THREE.ParticleSystem(geometry, material);
					particleSystem.dynamic		= true;
					particleSystem.sortParticles	= true;
					
					particleSystem.position.y	= -2.5;
					scene.add(particleSystem);
					return particleSystem;
				}
			}).back()
		.start();
}