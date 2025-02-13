import * as THREE from 'three'
import { Pane } from 'tweakpane'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js'

// Canvas
const container = document.querySelector('.canvas-container')
const canvas = document.querySelector('canvas.webgl')

// Screen size
const sizes = {
    width: container.clientWidth,
    height: container.clientHeight
}

// Scene Setup
const scene = new THREE.Scene()
//scene.background = new THREE.Color(0x222222)
const backgroundColor = { color: '#000000' }
const bodyColor = { color: '#ffffff' }
const rendererSettings = { alpha: true }

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(2, 20, 14)
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.target.set(0, 8, 0)
controls.enableDamping = true
controls.enableZoom = false
controls.autoRotate = true

// Lights
const directionalLight = new THREE.DirectionalLight()
directionalLight.position.set(1, 2, 3)
directionalLight.intensity = 2.0
//directionalLight.color.setHex(0x883300)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight()
scene.add(ambientLight)

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: false,
    tonemapping: THREE.ACESFilmicToneMapping,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Scene elements
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('./draco/')
const gltfLoader = new GLTFLoader()
gltfLoader.setDRACOLoader(dracoLoader)
let animMixer = null

gltfLoader.load("./models/sziv_optimized.glb", (gltf) => {
    scene.add(gltf.scene)
    
    animMixer = new THREE.AnimationMixer(gltf.scene)
    const action = animMixer.clipAction(gltf.animations[0])
    if(action) action.play()
})

// Debug UI
let pane
const debugActive = window.location.hash === '#debug'
if(debugActive) pane = createDebugWindow()


// Window resize event
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = container.clientWidth
    sizes.height = container.clientHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const animate = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // Model animation
    if(animMixer)
    {
        animMixer.update(deltaTime)
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call animate again on the next frame
    window.requestAnimationFrame(animate)
}

animate()

function createDebugWindow(){
    pane = new Pane()
    pane.addBinding(directionalLight, 'intensity', { label: 'Directional light intensity', min: 0, max: 5, step: 0.05 })
    pane.addBinding(ambientLight, 'intensity', { label: 'Ambient light intensity', min: 0, max: 1, step: 0.05 })
    pane.addBinding(controls, 'target', { label: 'Camera target' })
    pane.addBinding(camera, 'position', { label: 'Camera position' })
    pane.addBinding(controls, 'autoRotate', { label: 'Auto roate' })
    pane.addBinding(controls, 'enableZoom', { label: 'Allow zoom' })

    pane.addBinding(rendererSettings, 'alpha', {
      label: 'Transparent Canvas',
    }).on('change', (ev) => {
      if (ev.value) {
        // Enable transparency
        scene.background = null; // Clear the background color
        renderer.setClearAlpha(0); // Set clear alpha to 0 for full transparency
      } else {
        // Disable transparency and set a default background color
        scene.background = new THREE.Color(backgroundColor.color) // Set a default background color
        renderer.setClearAlpha(1); // Set clear alpha to 1 for opaque background
      }
    });

    // Add a control for the scene's background color
    pane.addBinding(backgroundColor, 'color', {
      label: 'Canvas Background Color',
    }).on('change', (ev) => {
      if (!rendererSettings.alpha) {
        // Only update the background color if transparency is disabled
        scene.background = new THREE.Color(ev.value);
      }
    });

    pane.addBinding(bodyColor, 'color', {
        label: 'Body Background Color',
      }).on('change', (ev) => {
        document.body.style.backgroundColor = ev.value; // Update the body background color
      });
}