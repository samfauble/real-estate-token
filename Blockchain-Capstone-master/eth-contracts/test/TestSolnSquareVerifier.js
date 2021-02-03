// Test if a new solution can be added for contract - SolnSquareVerifier

// Test if an ERC721 token can be minted for contract - SolnSquareVerifier
const SolnSquareVerifier = artifacts.require("SolnSquareVerifier");
const {proof, input} = require('../../zokrates/code/square/proof.json');
const {assert} = require("chai");

contract("SolnSquareVerifier", (accounts) => {

    let contract;
    let owner = accounts[0];
    describe("SolnSquareVerifier executes properly", function() {

        beforeEach(async () => {
            contract = await SolnSquareVerifier.new({from: owner});
        });

        it("adds new solution to contract", async function () {

            let arrLength1 = await contract.returnArrayLength();
            await contract.addSolution(123, accounts[0], {from: accounts[0]});
            let arrLength2 = await contract.returnArrayLength();

            let diff = arrLength2.toNumber() - arrLength1.toNumber();
            assert.equal(diff, 1, "Didn't add to the contract");
        });

        it('mints new token', async function () {
            const {
                A,
                A_p,
                B,
                B_p,
                C,
                C_p,
                H,
                K
            } = proof;

            let res = await contract.mint.call(
                5372,
                "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/",
                A,
                A_p,
                B,
                B_p,
                C,
                C_p,
                H,
                K,
                input
            );

            assert.equal(res, true, "Coin not minted");
        })
    })
})