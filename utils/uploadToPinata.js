const pinataSDK = require("@pinata/sdk")
const fs = require("fs")
const path = require("path")
require("dotenv").config()

const pinataApiKey = process.env.PINATA_API_KEY || ""
const pinataApiSecret = process.env.PINATA_API_SECRET || ""
const pinata = pinataSDK(pinataApiKey, pinataApiSecret)

const imagesLocation = "./images/nfts/"

const metadataTemplate = {
    name: "",
    description: "",
    image: "",
    attributes: [
        {
            trait_type: "Rarity",
            value: 1,
        },
    ],
}

async function storeImages(imagesLocation) {
    console.log(imagesLocation)
    const fullImagesPath = path.resolve(__dirname, imagesLocation)
    console.log("fullpath ", fullImagesPath)
    const files = fs.readdirSync(fullImagesPath)
    console.log(files)
    console.log("hello")
    let responses = []
    for (fileIndex in files) {
        const readableStreamForFile = fs.createReadStream(`${fullImagesPath}/${files[fileIndex]}`)
        try {
            const response = await pinata.pinFileToIPFS(readableStreamForFile)
            responses.push(response)
        } catch (error) {
            console.log(error)
        }
    }
    return { responses, files }
}

async function storeTokenUriMetadata(metadata) {
    try {
        const response = await pinata.pinJSONToIPFS(metadata)
        return response
    } catch (error) {
        console.log(error)
    }
    return null
}

async function pushImagesAndMetaData(imagesLocation) {
    const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
}

pushImagesAndMetaData(imagesLocation)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
