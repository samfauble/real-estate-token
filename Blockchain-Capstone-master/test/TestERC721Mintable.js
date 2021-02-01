var ERC721Mintable = artifacts.require('ERC721Mintable');
var { assert } = require("chai");

contract('TestERC721Mintable', accounts => {

    const account_one = accounts[0];
    const account_two = accounts[1];

    describe('match erc721 spec', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});
            this.contract2 = await ERC721Mintable.new({from: account_two});
 
            await this.contract.mint(account_one, 123, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
            await this.contract.mint(account_one, 456, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
            await this.contract.mint(account_one, 789, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");
        })

        it('should return total supply', async function () { 
            let totalSupply = await this.contract.totalSupply();
            assert.equal(totalSupply, 3, "Wrong total supply value");
        })

        it('should get token balance', async function () {
            let totalBalance = await this.contract.balanceOf(account_one); 
            assert.equal(totalBalance, 3, "Wrong balance");
        })

        // token uri should be complete i.e: https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1
        it('should return token uri', async function () { 
            let uri = await this.contract.getBaseTokenURI(); 
            assert.equal(uri, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1", "Wrong URI");
        })

        it('should transfer token from one owner to another', async function () { 
            let tokenId = await this.contract.tokenOfOwnerByIndex(account_one, 0);
            await this.contract.transferFrom(account_one,  account_two, tokenId); 

            let balance = this.contract.balanceOf(account_one);
            assert.equal(balance, 2, "Wrong amount of tokens"); 
        })
    });

    describe('have ownership properties', function () {
        beforeEach(async function () { 
            this.contract = await ERC721Mintable.new({from: account_one});
        })

        it('should fail when minting when address is not contract owner', async function () { 
            await this.contract.mint(account_two, 123, "https://s3-us-west-2.amazonaws.com/udacity-blockchain/capstone/1");   
            assert.fail("account_two can't mint coins on first contract");
        })

        it('should return contract owner', async function () { 
            
        })

    });
})