import * as THREE from 'three'
import Player from './Player'

export default class Renderer {
    constructor() {
        this.player = new Player()
        this.canvas = this.player.canvas
        this.sizes = this.player.sizes
        this.scene = this.player.scene
        this.camera = this.player.camera
        this.debug = this.player.debug

        this.params = {
            toneMapping: 'ACESFilmic',
            toneMappingExposure: 1.75
        }

        this.toneMappingOptions = this.createToneMappingOptions()

        this.setInstance()

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder({ title: "Renderer" })
            this.createDebugSettings()
        }
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            alpha: true
        })
        this.instance.toneMapping = this.toneMappingOptions[this.params.toneMapping]
        this.instance.toneMappingExposure = this.params.toneMappingExposure
        //this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update() {
        this.instance.render(this.scene, this.camera.instance)
    }

    // Debug
    createToneMappingOptions() {
        const toneMappingOptions = {
            Linear: THREE.LinearToneMapping,
            Reinhard: THREE.ReinhardToneMapping,
            Cineon: THREE.CineonToneMapping,
            ACESFilmic: THREE.ACESFilmicToneMapping,
            AgX: THREE.AgXToneMapping,
            Neutral: THREE.NeutralToneMapping
        }
        return toneMappingOptions
    }

    createDebugSettings() {
        this.debugFolder.addBinding(this.instance, 'toneMappingExposure', { label: 'Exposure', min: 0, max: 3, step: 0.05 })
        this.debugFolder.addBinding(this.params, 'toneMapping', { label: 'Tonemapping', options: this.toneMappingOptions }).on('change', (event) => {
            this.instance.toneMapping = event.value;
        })
    }
}