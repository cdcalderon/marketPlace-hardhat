//const pinataSDK = require("@pinata/sdk")
const fs = require("fs")
const path = require("path")

// const pinataApiKey = process.env.PINATA_API_KEY || ""
// const pinataApiSecret = process.env.PINATA_API_SECRET || ""
// const pinata = pinataSDK(pinataApiKey, pinataApiSecret)
const imagesLocation = "./images/nfts/"

async function storeImages(imagesLocation) {
    console.log(imagesLocation)
    const fullImagesPath = path.resolve(__dirname, imagesLocation)
    console.log("fullpath ", fullImagesPath)
    const files = fs.readdirSync(fullImagesPath)
    console.log(files)
    console.log("hello")
}

async function storeTokenUriMetadata(metadata) {}

storeImages(imagesLocation)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
