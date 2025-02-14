import Player from "./Player/Player.js"

const container = document.querySelector('.canvas-container')
const canvas = document.querySelector('canvas.webgl')
const player = new Player(container, canvas)