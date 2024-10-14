// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;

contract Error {
    error NotEnoughFunds();
    error AlreadyRegistered();
    error NameCannotBeEmpty();
    error NameAlreadyRegistered();
    error InvalidFarmIndex();
    error YouAreNotRegistered();
    error TheFarmDoesNotBelongToYou();
    error FarmNotFound();
    error InvalidProductIndex();
    error ProductDoesNotExist();
    error OnlyBuyersCanReview();
    error TransferFailed();
    error NotPurchased();
    error InsufficientAllowance();
}