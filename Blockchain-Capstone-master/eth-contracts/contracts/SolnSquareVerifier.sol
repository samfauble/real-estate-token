pragma solidity >=0.4.21;


import "./verifier.sol";
import "./ERC721Mintable.sol";
import '../../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol';

// TODO define a contract call to the zokrates generated solidity contract <Verifier> or <renamedVerifier>
contract SolnSquareVerifier is CustomERC721Token {

    using SafeMath for uint256;

    Verifier verifier;

    struct Solution {
        uint256 index;
        address solutionAddress;
        bool exists;
    }

    Solution[] solutionsArr;

    mapping(address => Solution) solutions;

    event SolutionAdded(address addedAddress);

    function addSolution(uint256 index, address addr) public {
        solutions[addr].solutionAddress = addr;
        solutions[addr].index = index;
        solutions[addr].exists = true;
        solutionsArr.push(solutions[addr]);
        
        emit SolutionAdded(addr);
    }

    function mint(address addr, uint256 tokenId, string memory tokenURI) public returns(bool) {
        uint256 length = solutionsArr.length;
        uint256 newIndex = length.sub(1);

        for(uint256 i = 0; i < length; i++) {
            Solution memory current = solutionsArr[i];
            require(current.solutionAddress != solutions[addr].solutionAddress, "Solutions must be unique");
        }


        super.mint(addr, tokenId, tokenURI);
        addSolution(newIndex, addr);

        return true;
    }
}


// TODO define another contract named SolnSquareVerifier that inherits from your ERC721Mintable class



// TODO define a solutions struct that can hold an index & an address


// TODO define an array of the above struct


// TODO define a mapping to store unique solutions submitted



// TODO Create an event to emit when a solution is added



// TODO Create a function to add the solutions to the array and emit the event



// TODO Create a function to mint new NFT only after the solution has been verified
//  - make sure the solution is unique (has not been used before)
//  - make sure you handle metadata as well as tokenSuplly

  


























