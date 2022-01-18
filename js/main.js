var rotate = false; var cameraZ;
            
            if ( WEBGL.isWebGLAvailable() === false ) {

                document.body.appendChild( WEBGL.getWebGLErrorMessage() );

            }
            function toggle_rotation () {
                rotate = ! rotate;
            }
            
            function zoom_refit (offset) {
                offset =  offset || 1.15;
                r=cameraZ*offset;
                camera.position.x=r*Math.cos(2);
                camera.position.z=r*Math.sin(2);
                camera.lookAt(scene.position);
                renderer.render( scene, camera );
            }
            
            function fitCameraToObject( camera, object, offset, controls ) {

                offset =  offset || 1.35;
            
                const boundingBox = new THREE.Box3();
            
                // get bounding box of object - this will be used to setup controls and camera
                boundingBox.setFromObject( object );
                    
                        //ERRORS HERE
                const center = boundingBox.getCenter();
                const size = boundingBox.getSize();
            
                // get the max side of the bounding box (fits to width OR height as needed )
                const maxDim = Math.max( size.x, size.y, size.z );
                const fov = camera.fov * ( Math.PI / 180 );
                cameraZ = Math.abs( maxDim / 2 * Math.tan( fov * 2 ) ); //Applied fifonik correction
            
                cameraZ *= offset; // zoom out a little so that objects don't fill the screen
            
                // <--- NEW CODE
                //Method 1 to get object's world position
                scene.updateMatrixWorld(); //Update world positions
                var objectWorldPosition = new THREE.Vector3();
                objectWorldPosition.setFromMatrixPosition( object.matrixWorld );
                
                //Method 2 to get object's world position
                //objectWorldPosition = object.getWorldPosition();
            
                const directionVector = camera.position.sub(objectWorldPosition);   //Get vector from camera to object
                const unitDirectionVector = directionVector.normalize(); // Convert to unit vector
                camera.position = unitDirectionVector.multiplyScalar(cameraZ); //Multiply unit vector times cameraZ distance
                camera.lookAt(objectWorldPosition); //Look at object
                // --->
            
                const minZ = boundingBox.min.z;
                const cameraToFarEdge = ( minZ < 0 ) ? -minZ + cameraZ : cameraZ - minZ;
            
                camera.far = cameraToFarEdge * 3;
                camera.updateProjectionMatrix();
            
                if ( controls ) {
            
                // set camera to rotate around center of loaded object
                controls.target = center;
            
                // prevent camera from zooming out far enough to create far plane cutoff
                controls.maxDistance = cameraToFarEdge * 2;
                        // ERROR HERE   
                controls.saveState();
            
                } else {
            
                    camera.lookAt( center )
            
                }
            }
            
            
            
            var container; //var container, stats;

            var camera, controls, scene, renderer;

            init();
            animate();

            function init() {

                camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.01, 1e10 );
                //camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 2000 );
                camera.position.z = 6;

                controls = new THREE.OrbitControls( camera );

                scene = new THREE.Scene();
                scene.add( camera );

                // light

                var dirLight = new THREE.DirectionalLight( 0xffffff );
                dirLight.position.set( 200, 200, 1000 ).normalize();

                camera.add( dirLight );
                camera.add( dirLight.target );

                // model

				var onProgress = function ( xhr ) {

					if ( xhr.lengthComputable ) {

						var percentComplete = xhr.loaded / xhr.total * 100;
						console.log( Math.round( percentComplete, 2 ) + '% downloaded' );

					}

				};
                
				var onError = function () { };

				THREE.Loader.Handlers.add( /\.dds$/i, new THREE.DDSLoader() );

				new THREE.MTLLoader()
					.setPath( 'assets/' )
					.load( 'icezum.mtl', function ( materials ) {

						materials.preload();

						new THREE.OBJLoader()
							.setMaterials( materials )
							.setPath( 'assets/' )
							.load( 'icezum.obj', function ( object ) {

								// object.position.y = - 05;
								scene.add( object );
                                fitCameraToObject ( camera, object, 1.15, controls );

							}, onProgress, onError );

					} );

				//

				
                // var loader = new THREE.VRMLLoader();
                // // loader.load( 'assets/house.wrl', function ( object ) {
                // 
                // loader.load( 'assets/icezum.wrl', function ( object ) {
                // //loader.load( 'assets/oshwi.wrl', function ( object ) {
                //     scene.add( object );
                //     fitCameraToObject ( camera, object, 1.35, controls );
                // 
                // } );

                // renderer

                renderer = new THREE.WebGLRenderer();
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );

                container = document.createElement( 'div' );
                document.body.appendChild( container );
                container.appendChild( renderer.domElement );

                // stats = new Stats();
                // container.appendChild( stats.dom );

                //

                window.addEventListener( 'resize', onWindowResize, false );
                
            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();

                renderer.setSize( window.innerWidth, window.innerHeight );

            }

            function animate() {

                requestAnimationFrame( animate );

                if (rotate) {
                    var timer=Date.now() * 0.0005;
                    r=cameraZ*1.25;
                    camera.position.x=r*Math.cos(timer);
                    camera.position.z=r*Math.sin(timer);
                    camera.lookAt(scene.position);
                    }
                renderer.render( scene, camera );

                // stats.update();

            }