var CustomERC721Token = artifacts.require('CustomERC721Token');
var chai = require("chai");
var assert = chai.assert;
chai.use(require('chai-string'));

contract('TestCustomERC721Token', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            let totalBalance;
            this.contract = await CustomERC721Token.deployed({from: account_one});
            this.contract2 = await CustomERC721Token.deployed({from: account_two});
        })

        it('should return total supply', async function () { 
            await this.contract.mint(account_one, 123, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
            await this.contract.mint(account_one, 456, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
            await this.contract.mint(account_one, 789, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");

            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 3, "Wrong total supply value");
        })

        it('should get token balance', async function () { 
            let totalBalance = await this.contract.balanceOf(account_one); 
            assert.equal(totalBalance.toNumber(), 3, "Wrong balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            await this.contract.mint(account_one, 123456789, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/", {from: account_one});
            
            let uri = await this.contract.tokenURI(123456789); 
            assert.equal(uri.toString(), "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/123456789", "Wrong URI");
        })

        it('should transfer token from one owner to another', async function () { 
            await this.contract.transferFrom(account_one,  account_two, 123); 

            let owner = await this.contract.ownerOf(123);
            assert.equal(owner, account_two, "Wrong owner"); 
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await CustomERC721Token.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            let error;
            try {
                await this.contract.mint(account_two, 123, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
            } catch(e) {
                error = e;
            }

            assert.containIgnoreSpaces(error.message, "Caller needs to be contract owner", "Wrong error message");
            

        })

        it('should return contract owner', async function () { 
            let owner = await this.contract.getOwner();
            assert.equal(owner, account_one, "Wrong contract owner")
        })

    });
})