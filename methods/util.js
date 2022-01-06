const QRCode = require('qrcode');
const fs = require('fs/promises');

const uid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

const generateQR = async (data) => {
    try {
        const uri = await QRCode.toDataURL(data);
        return uri;
  } catch (err) {
        console.error(err)
  }
}

const saveQR = async (name, base64) => {
  const base64Data = base64.replace(/^data:image\/png;base64,/, "");
  //await fs.writeFile(`${name}.png`, base64Data, 'base64');
  await fs.writeFile(process.cwd() + `/images/${name}.png`, base64Data, 'base64');
}

module.exports = { uid, generateQR, saveQR }