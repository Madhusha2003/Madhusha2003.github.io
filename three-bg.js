/* =========================================
   THREE.JS HERO BACKGROUND & 3D MODEL
   ========================================= */
(function initThreeBackground() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
        60,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;

    // 2. Lighting (Crucial for 3D textures & screen materials)
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0x00ff88, 2.5); // Neon green accent
    dirLight.position.set(10, 20, 15);
    scene.add(dirLight);

    const cyanLight = new THREE.PointLight(0x00d2ff, 3, 50); // Cyan back-light
    cyanLight.position.set(-15, -10, 10);
    scene.add(cyanLight);

    // 3. Particle System
    const particleCount = 600;
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i++) {
        positions[i] = (Math.random() - 0.5) * 85;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.22,
        color: 0x00ff88,
        transparent: true,
        opacity: 0.75,
        depthWrite: false
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // 4. Load Custom 3D Laptop Model
    const laptopModel = new THREE.Group();
    const globes = new THREE.Group();
    scene.add(laptopModel);
    scene.add(globes);

    let initialLaptopY = 0;
    let initialGlobesY = 0;
    const loader = new THREE.GLTFLoader();
    loader.setMeshoptDecoder(MeshoptDecoder);

    loader.load(
        'assets/3d/Laptop.glb',
        (gltf) => {
            ImportedScene = gltf.scene;

            const laptopBase = ImportedScene.getObjectByName('_LaptopBase');
            const laptopKeyBoard = ImportedScene.getObjectByName('_KeyBoard');
            const laptopLidControl = ImportedScene.getObjectByName('_LaptopLidControl');
            const globe = ImportedScene.getObjectByName('_Sphere');

            if (laptopBase) laptopModel.add(laptopBase);
            if (laptopKeyBoard) laptopModel.add(laptopKeyBoard);
            if (laptopLidControl) laptopModel.add(laptopLidControl);
            if (globe) globes.add(globe);

            // Fix backfaces and missing normals
            laptopModel.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.side = THREE.DoubleSide;
                    child.material.depthWrite = true;
                    child.material.depthTest = true;
                    child.material.needsUpdate = true;
                }
            });

            globes.traverse((child) => {
                if (child.isMesh && child.material) {
                    child.material.side = THREE.DoubleSide;
                    child.material.depthWrite = true;
                    child.material.depthTest = true;
                    child.material.needsUpdate = true;
                }
            });

            // Auto-center the mesh geometry to local (0, 0, 0)
            const box = new THREE.Box3().setFromObject(laptopModel);
            const center = box.getCenter(new THREE.Vector3());
            const size = box.getSize(new THREE.Vector3());

            laptopModel.position.x -= center.x;
            laptopModel.position.y -= center.y; // Adjust to sit on "ground"
            laptopModel.position.z -= center.z;

            globes.position.x -= center.x;
            globes.position.y -= center.y;
            globes.position.z -= center.z;

            // Auto-fit to viewport (scale to ~12 units wide)
            const maxDim = Math.max(size.x, size.y, size.z);
            const targetSize = 80;
            const autoScale = targetSize / (maxDim || 1);
            laptopModel.scale.set(autoScale, autoScale, autoScale);
            globes.scale.set(autoScale, autoScale, autoScale);

            // Angle for portfolio presentation
            laptopModel.rotation.set(0.3, -0.4, 0);
            laptopModel.position.set(0, -12, 0);
            initialLaptopY = laptopModel.position.y;

            globe.rotation.set(0, 0, 0);
            globes.position.set(0, -12, 0);
            initialGlobesY = globes.position.y;

            scene.add(laptopModel);
            scene.add(globes);
            camera.lookAt(scene.position);

            console.log("3D Model Rendered Successfully. Size:", size);
        },
        undefined,
        (error) => {
            console.error('GLTF Load Error:', error);
        }
    );

    // 5. Mouse Interaction
    let targetX = 0;
    let targetY = 0;

    window.addEventListener('mousemove', (event) => {
        targetX = (event.clientX / window.innerWidth - 0.5) * 2;
        targetY = (event.clientY / window.innerHeight - 0.5) * 2;
    });

    // 6. Responsive Window Resize Handling
    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // 7. Animation Loop
    const clock = new THREE.Clock();

    function animate() {
        requestAnimationFrame(animate);
        const elapsedTime = clock.getElapsedTime();

        // Slow particle rotation
        particleSystem.rotation.y = elapsedTime * 0.04;

        // Floating & subtle tilting animation for laptop
        if (laptopModel) {
            laptopModel.rotation.y = -0.4 + Math.sin(elapsedTime * 0.5) * 0.2;
            laptopModel.position.y = initialLaptopY + Math.sin(elapsedTime * 1.5) * 0.4;
        }
        if (globes) {
            globes.rotation.y = elapsedTime * 0.2;
            globes.position.y = initialGlobesY + Math.sin(elapsedTime * 1.5) * 0.35;
        }

        // Camera follow mouse parallax
        camera.position.x += (targetX * 6 - camera.position.x) * 0.05;
        camera.position.y += (-targetY * 6 - camera.position.y) * 0.05;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();
})();