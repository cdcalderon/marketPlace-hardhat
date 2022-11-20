const config = require("../settings/config.json")
const path = require("path")
const fs = require("fs")

// Define Paths
const base = process.cwd()
const buildBasePath = path.join(base, "/build")

const initialize = () => {}

// Define Canvas

const { createCanvas } = require("canvas")
const canvas = createCanvas(config.image_details.width, config.image_details.height)
const ctx = canvas.getContext("2d")

// -- Create on the canvas
const createImage = async () => {}

// Save the image
const saveImage = (_imageCount) => {
    console.log(`Saving Image...\n`)

    fs.writeFileSync(`${buildBasePath}/images/${_imageCount}.png`, canvas.toBuffer("image/png"))
}

const main = () => {
    try {
        initialize()
        createImage()
    } catch (error) {
        console.log(error)
    }
}

main()
