// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract FarmEscrow is Ownable(msg.sender) {
    IERC20 public token;

    enum EscrowStatus {
        Null,
        AWAITING_DELIVERY,
        AWAITING_APPROVAL,
        COMPLETE,
        DISPUTE
    }

    struct Escrow {
        address buyer;
        address farmer;
        uint256 amount;
        EscrowStatus status;
        uint256 orderId;
    }

    mapping(uint256 => Escrow) public escrows;
    uint256 public escrowCounter;

    event EscrowCreated(
        uint256 indexed escrowId,
        address indexed buyer,
        address indexed farmer,
        uint256 orderId,
        uint256 amount
    );
    event DeliveryApproved(uint256 indexed approvedEscrowId);
    event DisputeRaised(uint256 indexed _ownerescrowId);
    event DisputeResolved(uint256 indexed resolvedEscrowId, address winner);
    event EscrowCompleted(uint256 indexed completedEscrowId);

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function createEscrow(
        address _farmer,
        uint256 _orderId,
        uint256 _amount
    ) external {
        uint256 allowance = token.allowance(msg.sender, address(this));
        require(allowance >= _amount, "Insufficient allowance");

        bool success = token.transferFrom(msg.sender, address(this), _amount);
        require(success, "Transfer failed");

        escrows[escrowCounter] = Escrow({
            buyer: msg.sender,
            farmer: _farmer,
            amount: _amount,
            status: EscrowStatus.AWAITING_DELIVERY,
            orderId: _orderId
        });

        emit EscrowCreated(
            escrowCounter,
            msg.sender,
            _farmer,
            _orderId,
            _amount
        );
        escrowCounter++;
    }

    function approveDelivery(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(msg.sender == escrow.buyer, "Only buyer can approve delivery");
        require(
            escrow.status == EscrowStatus.AWAITING_DELIVERY,
            "Invalid escrow status"
        );

        escrow.status = EscrowStatus.COMPLETE;

        bool success = token.transfer(escrow.farmer, escrow.amount);
        require(success, "Transfer to farmer failed");

        emit DeliveryApproved(_escrowId);
        emit EscrowCompleted(_escrowId);
    }

    function raiseDispute(uint256 _escrowId) external {
        Escrow storage escrow = escrows[_escrowId];
        require(
            msg.sender == escrow.buyer || msg.sender == escrow.farmer,
            "Only buyer or farmer can raise dispute"
        );
        require(
            escrow.status == EscrowStatus.AWAITING_DELIVERY ||
                escrow.status == EscrowStatus.AWAITING_APPROVAL,
            "Invalid escrow status"
        );

        escrow.status = EscrowStatus.DISPUTE;

        emit DisputeRaised(_escrowId);
    }

    function resolveDispute(
        uint256 _escrowId,
        address _winner
    ) external onlyOwner {
        Escrow storage escrow = escrows[_escrowId];
        require(escrow.status == EscrowStatus.DISPUTE, "No dispute to resolve");
        require(
            _winner == escrow.buyer || _winner == escrow.farmer,
            "Invalid winner address"
        );

        escrow.status = EscrowStatus.COMPLETE;

        bool success = token.transfer(_winner, escrow.amount);
        require(success, "Transfer failed");

        emit DisputeResolved(_escrowId, _winner);
        emit EscrowCompleted(_escrowId);
    }

    function getEscrowDetails(
        uint256 _escrowId
    ) external view returns (Escrow memory) {
        return escrows[_escrowId];
    }
}
