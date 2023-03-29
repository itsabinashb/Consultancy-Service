// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "hardhat/console.sol";

contract Consultancy {
    mapping(address => bool) public consumer;
    mapping(address => bool) public advisor;
    address public Advisor;
    address public owner;
    uint256 public currentTime;

    constructor(address _advisor) {
        owner = payable(msg.sender);
        require(!advisor[_advisor]);
        advisor[_advisor] = true;
        Advisor = payable(_advisor);
        
    }

    function openchannelAsConsumer() public payable {
        require(!consumer[msg.sender], "Error: already a consumer");
        consumer[msg.sender] = true;
        currentTime = block.timestamp;
    }

    function closeChannel(
        address _signer,
        bytes32 _messageHash,
        bytes memory _signature
    ) public {
        address recovered = ECDSA.recover(_messageHash, _signature);
        if (recovered == _signer) {
            (bool sent, ) = address(Advisor).call{value: 0.000025 ether}("");
            require(sent);
        } else {
            console.log("Transaction failed");
        }
    }

    function addAdvisor(address _advisor) public onlyOwner {
        require(!advisor[_advisor], "Error: already an advisor");
        advisor[_advisor] = true;
    }

    function removeAdvisor(address _advisor) public onlyOwner {
        require(advisor[_advisor] == true, "Error: not an advisor");
        delete advisor[_advisor];
    }

    function withdraw() public onlyOwner {
        (bool sent, ) = owner.call{value: 0.000025 ether}("");
        require(sent);
    }

    function abort() public {
        require(block.timestamp == currentTime + 30 minutes, "Time limit has not exceeded");
        (bool sent, ) = payable(msg.sender).call{value: 0.00005 ether}("");
        require(sent);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Error: owner priviledge required");
        _;
    }
}
