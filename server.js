// https://www.npmjs.com/package/node-tesseract-ocr
import tesseract from "node-tesseract-ocr"
import express from "express"
import path from "path"
import { fileURLToPath } from "url"

const app = express()
const PORT = 8080
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const samplesDir = path.join(__dirname, "samples")

console.log({ samplesDir })

app.get("/nodeocr", async (req, res) => {
    const sample = req.query.sample
    //console.log(`${samplesDir}/${sample}`)
    const text = await useTesseractOcr(`${samplesDir}/${sample}`)
    res.send(text)
})

app.listen(PORT)

async function useTesseractOcr(img, options) {
    if (options) {
        return tesseract
            .recognize(img, options)
            .then((text) => {
                console.log("Result:", text)
                return text.trim()
            })
            .catch((error) => {
                console.log(error.message)
            })
    } else {
        return tesseract
            .recognize(img)
            .then((text) => {
                console.log("Result:", text)
                return text.trim()
            })
            .catch((error) => {
                console.log(error.message)
            })
    }
}
