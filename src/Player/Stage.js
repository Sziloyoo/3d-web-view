import Lighting from "./Lighting.js"
import Player from "./Player.js"
import Model from './Model.js'

export default class Stage {
    constructor() {
        this.player = new Player()
        this.scene = this.player.scene
        this.loader = this.player.loader
        this.lighing = new Lighting()

        // Wait for resources
        this.loader.on('ready', () => {
            this.model = new Model()
        })
    }

    update(){
        if(this.model) this.model.update()
    }
}