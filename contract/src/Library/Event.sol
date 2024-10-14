// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

library Event {
    /*--------------------- FARM EVENTS------------------------- */
    event BusinessNameUpdated(address indexed user, string name);
    event BusinessImageUpdated(address indexed user, string image);
    event BusinessNameRegistered(address indexed user, string name);
    event BusinessImageRegistered(address indexed user, string image);

    /*--------------------- PRODUCT EVENTS------------------------- */
    event ProductAdded(address indexed farmer, string productName);
    event ProductUpdated(address indexed farmer, string productName);
    event ProductReviewed(
        address indexed buyer,
        uint256 productId,
        string review
    );
    event EscrowCreated(address indexed buyer, uint256 indexed orderId);
}