// migrating the appropriate contracts
var SquareVerifier = artifacts.require("./SquareVerifier.sol");
var SolnSquareVerifier = artifacts.require("./SolnSquareVerifier.sol");
var Verifier = artifacts.require("./verifier.sol");

module.exports = function(deployer) {
  deployer.deploy(SquareVerifier);
  deployer.deploy(SolnSquareVerifier);
  deployer.deploy(Verifier);
};
