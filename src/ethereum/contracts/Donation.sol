// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.7.0 <0.9.0;

contract Factory {

    address[] public deployedDonations;

    function createDonation(uint minimum) public {
        address donation = address(new Donation(minimum, msg.sender));
        deployedDonations.push(donation);
    }

    function getDeployedDonations() public view returns (address[] memory) {
        return deployedDonations;
    }

}

contract Donation {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalsCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    mapping(address => bool) public approvers;
    mapping(uint => Request) public requests;
    uint public requestsCount;
    uint public approversCount;

    modifier isManager() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimum, address creator) {
        minimumContribution = minimum;
        manager = creator;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount++;
        }
    }

    function createRequest(string memory description, uint value, address recipient) public isManager {
        Request storage rq = requests[requestsCount++];
        rq.description = description;
        rq.value = value;
        rq.recipient = recipient;
        rq.complete = false;
        rq.approvalsCount = 0;
    }

    function approveRequest(uint index) public {
        Request storage request = requests[index];
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalsCount++;
    }

    function finishRequest(uint index) public isManager {
        Request storage request = requests[index];
        require(request.approvalsCount > (approversCount / 2));
        require(!request.complete);
        payable(request.recipient).transfer(request.value);
        request.complete = true;
    }

    function getDetail() public view returns (
        address, uint, uint, uint, uint
    ) {
        return (
            manager,
            minimumContribution,
            requestsCount,
            approversCount,
            address(this).balance
        );
    }

}