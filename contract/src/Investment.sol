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

    struct FarmInvestmentDetails {
        uint256 id;
        uint256 farmId;
        string name;
        string about;
        address owner;
        uint256 minAmount;
        uint256 startDate;
        uint256 endDate;
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

    // Array of all farms
    FarmInvestmentDetails[] public allInvestableFarms;

    // Mapping of farm ID to active status
    mapping(uint256 => bool) isFarmActive;

    // Mapping of farm ID to farm struct
    mapping(uint256 => FarmInvestmentDetails) public farmIdToFarmStruct;

    // Array of all investors
    Investors[] public allInvestors;

    // Mapping of farm ID to Investors Address to Amount
    mapping(uint256 => mapping(address => uint256))
        public farmIDToAddressToAmount;

    function createInvestment(
        uint256 _farmId,
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
            name: _name,
            about: _about,
            owner: _owner,
            minAmount: _minAmount,
            startDate: block.timestamp,
            endDate: _endDate
        });

        investmentCounter++;

        emit NewFarmCreated(_farmId, _owner);
    }

    function investmentERC20(uint256 _farmId, uint256 _amount) external {
        require(_amount >= farmIdToFarmStruct[_farmId].minAmount);

        require(!isFarmActive[_farmId]);

        token.transferFrom(msg.sender, address(this), _amount);

        isFarmActive[_farmId] = true;
        farmIDToAddressToAmount[_farmId][msg.sender] = _amount;

        emit NewFarmInvestment(_farmId, msg.sender, _amount);
    }

    function investEthers(uint256 _farmId) external payable {
        require(msg.value >= farmIdToFarmStruct[_farmId].minAmount);

        require(!isFarmActive[_farmId]);

        isFarmActive[_farmId] = true;
        farmIDToAddressToAmount[_farmId][msg.sender] = msg.value;

        emit NewFarmInvestment(_farmId, msg.sender, msg.value);
    }

    function claimInvestmentIERC20(uint256 _id, uint256 _amount) external {
        require(isFarmActive[_id]);
        require(farmIDToAddressToAmount[_id][msg.sender] >= _amount);
        require(block.timestamp >= farmIdToFarmStruct[_id].endDate);

        isFarmActive[_id] = false;

        delete farmIDToAddressToAmount[_id][msg.sender];

        token.transfer(msg.sender, _amount);

        emit InvestmentWithdrawn(_id, msg.sender, _amount);
    }

    function claimInvestmentEthers(uint256 _id) external payable {
        require(isFarmActive[_id]);
        require(farmIDToAddressToAmount[_id][msg.sender] >= msg.value);

        require(block.timestamp >= farmIdToFarmStruct[_id].endDate);

        isFarmActive[_id] = false;

        address payable to = payable(msg.sender);
        to.transfer(farmIDToAddressToAmount[_id][msg.sender]);

        delete farmIDToAddressToAmount[_id][msg.sender];

        emit InvestmentWithdrawn(_id, msg.sender, msg.value);
    }

    fallback() external payable {}

    // Receive is a variant of fallback that is triggered when msg.data is empty
    receive() external payable {}
}
