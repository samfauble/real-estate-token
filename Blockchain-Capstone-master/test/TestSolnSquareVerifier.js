// Test if a new solution can be added for contract - SolnSquareVerifier
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");

contract('SolnSquareVerifier', async accounts => {
    
    let account1 = accounts[0];
    let account2 = accounts[1];
    let contract = await SolnSquareVerifier.deployed();
    
    describe("Zokrates SolnSquareVerifier", () => {

    it("should show up")
    })
})

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
