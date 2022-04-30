const {Router} = require('express')
const Jimp = require('jimp')

const router = Router()

router.get('/', (req, res)=>{
    try {
        res.render('index')
    } catch (err) {
        console.log(err);
    }
})

router.post('/', async (req, res)=>{
    try {
        let imgRaw = 'public/raw/ramadan.jpg' // 626px 626px
        let imgActive = 'public/active/ramadan.jpg'
        let imgExport = 'public/export/ramadan.jpg'

        let textData = {
            text: `${req.body.name}`.toUpperCase(),
            maxWidth: 606,
            maxHeight: 400,
            placementX: 10,
            placementY: 300
        };

        const clone = await Jimp.read(imgRaw)
        await clone.clone().write(imgActive)

        const active = await Jimp.read(imgActive)

        const font = await Jimp.loadFont('./public/fonts/aAwalRamadhan.ttf.fnt')

        const image = await active.print(font, textData.placementX, textData.placementY, {
            text: textData.text,
            alignmentX: Jimp.HORIZONTAL_ALIGN_CENTER
        }, textData.maxWidth)

        await image.quality(100).write(imgExport)
                                                                                                           
        res.redirect('/success')
    } catch (err) {
        console.log(err);
    }
})

router.get('/success', (req, res)=>{
    try {
        res.render('success')
    } catch (err) {
        console.log(err);
    }
})

module.exports = router