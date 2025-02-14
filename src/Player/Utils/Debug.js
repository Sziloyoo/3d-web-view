import { Pane } from 'tweakpane'

export default class Debug {
    constructor(source) {
        this.active = window.location.hash === '#debug'
        if(this.active) {
            this.ui = new Pane()
            this.debugFolder = this.ui.addFolder({ title: "Informations" })
            this.debugFolder.addBinding(source, 'name', { title: "Model name", disabled: true })
            this.debugFolder.addBinding(source, 'type', { title: "File type", disabled: true })
            this.debugFolder.addBinding(source, 'path', { title: "File path", disabled: true })
        }
    }
}