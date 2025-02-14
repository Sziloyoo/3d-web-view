import * as THREE from 'three'

import Player from "./Player.js"

export default class Lighting {
    constructor(){
        this.player = new Player()
        this.scene = this.player.scene

        this.ambientLight = this.createAmbientLight()
        this.directionalLight = this.createDirectionalLight()
    }

    createAmbientLight(){
        const ambientLight = new THREE.AmbientLight()
        this.scene.add(ambientLight)
        return ambientLight
    }

    createDirectionalLight(){
        const directionalLight = new THREE.DirectionalLight()
        directionalLight.position.set(1, 2, 3)
        this.scene.add(directionalLight)
        return directionalLight
    }
}