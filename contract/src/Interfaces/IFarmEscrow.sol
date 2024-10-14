// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IFarmEscrow {
    struct Escrow {
        address buyer;
        address farmer;
        uint256 amount;
        EscrowStatus status;
        uint256 farmId;
        uint256 productId;
    }

    enum EscrowStatus {
        AWAITING_DELIVERY,
        AWAITING_APPROVAL,
        COMPLETE,
        DISPUTE
    }

    function createEscrow(
        address _farmer,
        uint256 _orderId,
        uint256 _amount
    ) external;

    function approveDelivery(uint256 _escrowId) external;

    function raiseDispute(uint256 _escrowId) external;

    function resolveDispute(uint256 _escrowId, address _winner) external;

    function getEscrowDetails(
        uint256 _escrowId
    ) external view returns (Escrow memory);
}