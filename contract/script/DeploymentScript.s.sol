// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import {Investment} from "../src/Investment.sol";
import {Token} from "../src/Token.sol";
import {FarmEscrow} from "../src/FarmEscrow.sol";
import {DAO} from "../src/DAO.sol";
import {Farm} from "../src/Farmer.sol";

contract DeploymentScript is Script {
    Investment public dInvestment;
    Token public dToken;
    FarmEscrow public dFarmEscrow;
    DAO public dDAO;
    Farm public dFarm;

    function setUp() public {}

    function run() public {
        uint privateKey = vm.envUint("DEPLOYER_PRIVATE_KEY");
        vm.startBroadcast(privateKey);
        dToken = new Token();
        dInvestment = new Investment(address(dToken));
        dFarmEscrow = new FarmEscrow(address(dToken));
        dDAO = new DAO(address(dToken), address(dInvestment));
        dFarm = new Farm(address(dToken), address(dFarmEscrow));

        vm.stopBroadcast();

        console.logString(
            string.concat(
                "TokenContract deployed at: ",
                vm.toString(address(dToken))
            )
        );

        console.logString(
            string.concat(
                "InvestmentContract deployed at: ",
                vm.toString(address(dInvestment))
            )
        );

        console.logString(
            string.concat(
                "FarmEscrowContract deployed at: ",
                vm.toString(address(dFarmEscrow))
            )
        );
        
        console.logString(
            string.concat(
                "DAOContract deployed at: ",
                vm.toString(address(dDAO))
            )
        );

        console.logString(
            string.concat(
                "FarmContract deployed at: ",
                vm.toString(address(dDAO))
            )
        );
    }
}
