import * as THREE from "three"
import Player from "./Player.js"

export default class Model{
    constructor(){
        this.player = new Player()
        this.loader = this.player.loader
        this.time = this.player.time
        this.scene = this.player.scene

        this.initModel(this.player.source.name)
        this.displayModel()
    }

    initModel(modelName){
        this.modelGLTF = this.loader.items[modelName]
        this.animMixer = new THREE.AnimationMixer(this.modelGLTF.scene)
        this.modelAction = this.animMixer.clipAction(this.modelGLTF.animations[0])
    }

    displayModel(){
        // Add loaded model to the scene
        if(this.modelGLTF) this.scene.add(this.modelGLTF.scene)
        else console.error("There is no reference for the GLTF file.")

        // Playing animation if there is one
        if(this.animMixer && this.modelAction) this.modelAction.play()
        else console.error("Can't find animation in the GLTF file.")
    }

    update(){
        if(this.animMixer) this.animMixer.update(this.time.getDeltaTime())
    }
}