const pinataSDK = require("@pinata/sdk")
const fs = require("fs")
const path = require("path")

const pinataApiKey = process.env.PINATA_API_KEY || ""
const pinataApiSecret = process.env.PINATA_API_SECRET || ""
const pinata = pinataSDK(pinataApiKey, pinataApiSecret)
const imagesLocation = "./images/nfts/"

async function storeImages(imagesFilePath) {
    const fullImagesPath = path.resolve(__dirname, imagesFilePath)
    const files = fs.readdirSync(fullImagesPath)
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

async function storeTokenUriMetadata(metadata) {}

async function uploadImagesAndMetadataToPinata(imagesLocation) {
    const metadataTemplate = {
        name: "",
        description: "",
        image: "",
        attributes: [
            {
                trait_type: "Cuteness",
                value: 100,
            },
        ],
    }
    const { responses: imageUploadResponses, files } = await storeImages(imagesLocation)
    for (imageUploadResponseIndex in imageUploadResponses) {
        let tokenUriMetadata = { ...metadataTemplate }
        tokenUriMetadata.name = files[imageUploadResponseIndex].replace(".png", "")
        tokenUriMetadata.description = `Poncho ${tokenUriMetadata.name}`
        tokenUriMetadata.image = `ipfs://${imageUploadResponses[imageUploadResponseIndex].IpfsHash}`
        console.log(`Uploading ${tokenUriMetadata.name}...`)
        const metadataUploadResponse = await storeTokenUriMetadata(tokenUriMetadata)
        tokenUris.push(`ipfs://${metadataUploadResponse.IpfsHash}`)
    }
    console.log("Token URIs uploaded! They are:")
    console.log(tokenUris)
}

uploadImagesAndMetadataToPinata(imagesLocation)
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
