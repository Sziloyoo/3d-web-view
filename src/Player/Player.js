import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Loader from './Utils/Loader.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import Stage from './Stage.js'

let instance = null

export default class Player {
    constructor(container, canvas) {
        // Singelton
        if (instance) return instance
        instance = this

        // Canvas
        this.canvas = canvas

        // Testing loading
        this.source = {
            name: 'sziv',
            type: 'gltfModel',
            path: './models/sziv.glb'
        }

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes(container)
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.loader = new Loader(this.source)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.stage = new Stage()

        // Resize event
        this.sizes.on('resize', () => {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () => {
            this.update()
        })
    }

    resize() {
        this.camera.resize()
        this.renderer.resize()
    }

    update() {
        this.camera.update()
        this.stage.update()
        this.renderer.update()
    }
}