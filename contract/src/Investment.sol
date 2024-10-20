//SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Investment {
    address public DAOAddress;
    IERC20 public token;

    constructor(address _token) {
        token = IERC20(_token);
    }

    uint256 investmentCounter;

    uint256 investorCount;

    struct FarmInvestmentDetails {
        uint256 id;
        uint256 farmId;
        string image;
        string name;
        string about;
        address owner;
        uint256 minAmount;
        uint256 amountRaised;
        uint256 startDate;
        uint256 endDate;
        uint256 farmInvestorCount;
    }

    struct Investors {
        uint256 id;
        uint256 farmID;
        address investorAddress;
        uint256 amount;
    }

    // Events

    event NewFarmCreated(uint256 farmId, address farmOwner);

    event NewFarmInvestment(
        uint256 farmID,
        address investorAddress,
        uint256 amount
    );

    event InvestmentWithdrawn(
        uint256 farmId,
        address withdrawerAddress,
        uint256 amount
    );

    // Total investments in ethers
    uint256 totalInvestment;

    // Array of all farms
    FarmInvestmentDetails[] public allInvestableFarms;

    // Mapping of farm ID to active status
    mapping(uint256 => bool) isFarmActive;

    // Mapping of farm ID to farm struct
    mapping(uint256 => FarmInvestmentDetails) public farmIdToFarmStruct;

    // Array of all investors
    Investors[] public allInvestors;

    // Mapping of farm ID to Investors Address to Amount
   mapping(uint256 => Investors[]) public farmInvestors;

    function createInvestment(
        uint256 _farmId,
        string memory _image,
        string memory _name,
        string memory _about,
        uint256 _minAmount,
        uint256 _endDate,
        address _owner
    ) external {
        FarmInvestmentDetails memory details;

        details.id = investmentCounter;
        details.farmId = _farmId;
        details.name = _name;
        details.about = _about;
        details.owner = _owner;
        details.minAmount = _minAmount;
        details.startDate = block.timestamp;
        details.endDate = _endDate;

        allInvestableFarms.push(details);

        isFarmActive[_farmId] = true;

        farmIdToFarmStruct[_farmId] = FarmInvestmentDetails({
            id: investmentCounter,
            farmId: _farmId,
            image: _image,
            name: _name,
            about: _about,
            owner: _owner,
            minAmount: _minAmount,
            startDate: block.timestamp,
            endDate: _endDate,
            amountRaised: 0,
            farmInvestorCount: 0
        });

        investmentCounter++;

        emit NewFarmCreated(_farmId, _owner);
    }

    function investEthers(uint256 _farmId) external payable {
        require(msg.value >= 0);

        // require(!isFarmActive[_farmId]);

        isFarmActive[_farmId] = true;

        farmIdToFarmStruct[_farmId].amountRaised += msg.value;

        farmIdToFarmStruct[_farmId].farmInvestorCount += 1;

        totalInvestment += msg.value;

        Investors memory newInvestor;

        newInvestor.id = investorCount;
        newInvestor.farmID = _farmId;
        newInvestor.investorAddress = msg.sender;
        newInvestor.amount = msg.value;

        allInvestors.push(newInvestor);

        farmInvestors[_farmId].push(newInvestor);

        emit NewFarmInvestment(_farmId, msg.sender, msg.value);
    }

    function claimInvestmentEthers(uint256 _id, uint256 _amount) external payable {
        
        require(isFarmActive[_id]);

        require(farmIdToFarmStruct[_id].amountRaised >= _amount);

        require(block.timestamp >= farmIdToFarmStruct[_id].endDate);

        isFarmActive[_id] = false;

        address payable to = payable(msg.sender);

        to.transfer(farmIdToFarmStruct[_id].amountRaised);

        emit InvestmentWithdrawn(_id, msg.sender, msg.value);
    }

    function getAllInvestors() external view returns  (Investors[] memory) {
        return allInvestors;
    }

    function getAllInvestableFarms() external view returns (FarmInvestmentDetails[] memory) {
        return allInvestableFarms;
    }

    function getTotalInvestment() external view returns (uint) {
        return totalInvestment;
    }

    function getAllFarmInvestors(uint _farmId) external view returns (Investors[] memory) {
        return farmInvestors[_farmId];
    }

    fallback() external payable {}

    // Receive is a variant of fallback that is triggered when msg.data is empty
    receive() external payable {}
}
