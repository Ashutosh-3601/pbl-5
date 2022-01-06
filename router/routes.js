const { Router } = require('express');
const router = Router();
const Mongo = require('../methods/database');
const { generateQR, saveQR } = require('../methods/util')
const BlockChainModule = require('../methods/blockchain');
const BlockChain = new BlockChainModule(Mongo);

async function initBlockChain() {
    await BlockChain.init();
}
initBlockChain();

router.get('/', async (req, res) => {
    const companies = await Mongo.db.collection('company').find({}).toArray();
    res.render('index', { companies });
});

router.get('/check/:identifier', async(req, res) => {
    const id = req.params.identifier;
    const block = await BlockChain.retreiveBlock(id);
    res.render('result', { block });
});

router.get('/done/:name', async(req, res) => {
       res.download(`${process.cwd()}/images/${req.params.name}.png`, `${req.params.name}.png`, function (err) {
        if (err) {
          //res.json({error: err})
        } else {
            console.log('...')
        }
      })
})

router.post('/generate', async (req, res) => {
  const data = req.body;
  const block = await BlockChain.generateAndAddBlock(data);
  const qrurl = await generateQR(`localhost:3000/check/${block.data.identifier}`);
  await saveQR(block.data.identifier, qrurl);
    res.redirect(`/done/${block.data.identifier}`)
})
module.exports = router;