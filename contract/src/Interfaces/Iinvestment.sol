// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface Iinvestment {
    function createInvestment(
        uint256 _farmId,
        string memory _name,
        string memory _about,
        uint256 _minAmount,
        uint256 _endDate,
        address _owner
    ) external;
}
