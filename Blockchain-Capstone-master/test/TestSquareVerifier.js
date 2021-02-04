// define a variable to import the <Verifier> or <renamedVerifier> solidity contract generated by Zokrates
const Verifier = artifacts.require("Verifier");
const {proof, input} = require('../zokrates/code/square/proof.json');
const {assert} = require("chai");

contract('Verifier', async accounts => {
    
    let account1 = accounts[0];
    let account2 = accounts[1];
    let contract = await Verifier.deployed();
    
    describe("Zokrates Verifier", async () => {

        it("should show up", async () => {
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

            let isVerified = await contract.verifyTx( 
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

            assert.isTrue(isVerified, "proof isn't correct");
        })

        it("should show up", async () => {

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

            let isVerified = await contract.verifyTx( 
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

            assert.isFalse(isVerified, "proof shouldn't be correct");
        })
    
    })
})
// Test verification with correct proof
// - use the contents from proof.json generated from zokrates steps

    
// Test verification with incorrect proof
