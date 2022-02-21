var Web3 = require("web3");

export const getTokenId = async (address) => {
  console.log("provider: ", process.env.REACT_APP_WEB3_PROVIDER);
  var web3 = new Web3(
    new Web3.providers.HttpProvider(process.env.REACT_APP_WEB3_PROVIDER)
  );

  const FRVR = require("./FRVR.json");
  const contractAddress = web3.utils.toChecksumAddress(
    process.env.REACT_APP_CONTRACTADDRESS
  );

  const contract = new web3.eth.Contract(FRVR, contractAddress);

  let result;

  try {
    result = await contract.methods.tokensOfOwner(address).call();
  } catch (err) {
    console.log("error: ", result);
  }

  if (result) {
    console.log("success: ", result);
  }
  return result;
};
