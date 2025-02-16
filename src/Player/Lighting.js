import * as THREE from 'three'
import Player from "./Player.js"

export default class Lighting {
    constructor(){
        this.player = new Player()
        this.scene = this.player.scene
        this.debug = this.player.debug

        this.params = {
            directionalLightColor: '#ffffff',
            directionalLightIntensity: 1.0,
            ambientLightColor: '#ffffff',
            ambientLightIntensity: 1.0,
        }

        this.directionalLight = this.createDirectionalLight()
        this.ambientLight = this.createAmbientLight()

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder({ title: "Lighting" })
            this.createDebugSettings()
        }
    }

    createDirectionalLight(){
        const directionalLight = new THREE.DirectionalLight(this.params.directionalLightColor, this.params.directionalLightIntensity)
        directionalLight.position.set(1, 2, 3)
        this.scene.add(directionalLight)
        return directionalLight
    }

    createAmbientLight(){
        const ambientLight = new THREE.AmbientLight(this.params.ambientLightColor, this.params.ambientLightIntensity)
        this.scene.add(ambientLight)
        return ambientLight
    }

    createDebugSettings(){
        this.debugFolder.addBinding(this.params, 'directionalLightColor', { label: 'Directional color' }).on('change', (event) => {
            this.directionalLight.color.set(this.params.directionalLightColor)
        })
        this.debugFolder.addBinding(this.directionalLight, 'intensity', { label: 'Directional intensity', min: 0, max: 3, step: 0.05 })
        this.debugFolder.addBinding(this.params, 'ambientLightColor', { label: 'Ambient color' }).on('change', (event) => {
            this.ambientLight.color.set(this.params.ambientLightColor)
        })
        this.debugFolder.addBinding(this.ambientLight, 'intensity', { label: 'Ambient intensity', min: 0, max: 1, step: 0.05 })
    }
}