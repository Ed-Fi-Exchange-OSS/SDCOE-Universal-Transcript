function base64Encoder(str) {
  return Buffer.from(str).toString("base64");
}

function base64Decoder(str) {
  return Buffer.from(str, 'base64').toString();
}

module.exports = {
  base64Encoder,
  base64Decoder
};

