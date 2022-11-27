const config = require("./settings/config.json")
const path = require("path")
const fs = require("fs")

const base = process.cwd()
const layersBasePath = path.join(base, "/layers")

const main = async () => {
    const layers = []

    for (var i = 0; i < config.layers.length; i++) {
        const attributes = await fs
            .readdirSync(`${layersBasePath}/${_layerType}/`)
            .filter((item) => !/(^|\/)\.[^\/\.]/g.test(item))
            .map((name) => {
                return {
                    name,
                }
            })

        for (var j = 0; j < attributes.length; j++) {
            attributes.forEach((attribute) => {
                attribute.weight = 10
            })
        }

        let metadata = {}

        metadata.name = config.layers[i]
        metadata.attributes = attributes

        layers.push(metadata)
    }

    let rarityData = { layers }

    fs.writeFileSync(`${base}/settings/rarity.json`, JSON.stringify(_config, null, 2))
}

main()
