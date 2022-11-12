const pinataSDK = require("@pinata/sdk")

const pinataApiKey = process.env.PINATA_API_KEY || ""
const pinataApiSecret = process.env.PINATA_API_SECRET || ""
const pinata = pinataSDK(pinataApiKey, pinataApiSecret)

async function storeImages(imagesFilePath) {}

async function storeTokenUriMetadata(metadata) {}

module.exports = { storeImages, storeTokenUriMetadata }
