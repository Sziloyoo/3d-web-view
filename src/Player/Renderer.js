import * as THREE from 'three'
import Player from './Player'

export default class Renderer{
    constructor(){
        this.player = new Player()
        this.canvas = this.player.canvas
        this.sizes = this.player.sizes
        this.scene = this.player.scene
        this.camera = this.player.camera

        this.setInstance()
    }

    setInstance(){
        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: false,
            alpha: true
        })
        this.instance.toneMapping = THREE.CineonToneMapping
        this.instance.toneMappingExposure = 1.75
        this.instance.setClearColor('#211d20')
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    resize(){
        this.instance.setSize(this.sizes.width, this.sizes.height)
        this.instance.setPixelRatio(this.sizes.pixelRatio)
    }

    update(){
        this.instance.render(this.scene, this.camera.instance)
    }
}