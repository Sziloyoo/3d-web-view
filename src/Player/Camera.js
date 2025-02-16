import * as THREE from 'three'
import Player from './Player.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera {
    constructor() {
        this.player = new Player()
        this.sizes = this.player.sizes
        this.scene = this.player.scene
        this.canvas = this.player.canvas
        this.debug = this.player.debug

        this.params = {
            fov: 35,
            position: { x: 0, y: 20, z: 32 },
            target: { x: 0, y: 9.5, z: 0 },
            canZoom: false,
            canRotate: true,
            autoRotate: true,
            autoRotateSpeed: 2.0
        }

        this.setInstance()
        this.setControls()

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder({ title: "Camera" })
            this.createDebugSettings()
        }
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(this.params.fov, this.sizes.width / this.sizes.height, 0.1, 100)
        this.instance.position.set(this.params.position.x, this.params.position.y, this.params.position.z)
        this.scene.add(this.instance)
    }

    setControls() {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.target.set(this.params.target.x, this.params.target.y, this.params.target.z)
        this.controls.enableRotate = this.params.canRotate
        this.controls.autoRotate = this.params.autoRotate
        this.controls.autoRotateSpeed = this.params.autoRotateSpeed
        this.controls.enableZoom = this.params.canZoom
        this.controls.enableDamping = true
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update() {
        this.controls.update()
    }

    createDebugSettings() {
        this.debugFolder.addBinding(this.params, 'fov', { label: 'FOV', min: 16, max: 70, step: 1 }).on('change', () => {
            this.instance.fov = this.params.fov
            this.instance.updateProjectionMatrix()
        })
        this.debugFolder.addBinding(this.params, 'position', { label: 'Position', step: 1 }).on('change', () => {
            this.instance.position.set(this.params.position.x, this.params.position.y, this.params.position.z)
        })
        this.debugFolder.addBinding(this.params, 'target', { label: 'Target', step: 1 }).on('change', () => {
            this.controls.target.set(this.params.target.x, this.params.target.y, this.params.target.z)
        })
        this.debugFolder.addBinding(this.params, 'canZoom', { label: 'Can zoom' }).on('change', () => {
            this.controls.enableZoom = this.params.canZoom
        })
        this.debugFolder.addBinding(this.params, 'canRotate', { label: 'Can rotate' }).on('change', () => {
            this.controls.enableRotate = this.params.canRotate
        })
        this.debugFolder.addBinding(this.params, 'autoRotate', { label: 'Auto rotate' }).on('change', () => {
            this.controls.autoRotate = this.params.autoRotate
        })
        this.debugFolder.addBinding(this.params, 'autoRotateSpeed', { label: 'Auto rotate speed', min: 1.0, max: 8.0, step: 0.1 }).on('change', () => {
            this.controls.autoRotateSpeed = this.params.autoRotateSpeed
        })
    }
}