const Moralis = require("moralis").default;
const express = require("express");
const app = express();
const cors = require("cors");
const port = 8080;
require("dotenv").config();

app.use(cors()); 

app.get("/", (req, res) => {
  res.send("Hello World  wrrr!");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


app.get("/nativeBalance", async (req, res) => {
  await Moralis.start({apiKey: process.env.MORALIS_API_KEY });

  try {
    const {address, chain} =req.query;
    const response = await Moralis.EvmApi.token.getWalletTokenBalances({
      address: address,
      chain: chain,
    });
    const nativeBalance = response.data;
     res.send(nativeBalance);
  } catch (e) {
    res.send(e);
    
  }

 
});