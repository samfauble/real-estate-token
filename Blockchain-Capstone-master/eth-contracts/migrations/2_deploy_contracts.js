// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var CustomERC721Token = artifacts.require("CustomERC721Token");
var Verifier = artifacts.require("Verifier");

module.exports = function(deployer) {

  deployer.deploy(SolnSquareVerifier);

};
