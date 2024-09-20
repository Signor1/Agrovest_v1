// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract DAO {
    IERC20 public token;

    constructor(address _votingToken) {
        token = IERC20(_votingToken);
    }

    uint256 proposalCounter;

    enum voteData {
        NULL,
        Accept,
        Reject,
        undecided
    }

    struct ProposalData {
        bool isChallanged;
        uint256 proposalId;
        string title;
        string description;
        uint256 createdAt;
        uint256 endsAt;
        uint256 requiredVotes;
        address proposer;
        bool executed;
        uint256 acceptVotes;
        uint256 rejectVotes;
        uint256 undecidedVotes;
    }

    struct Votes {
        uint256 proposalId;
        address voter;
        uint256 votingPower;
        voteData voteType;
    }

    event TokenLocked(uint256 _amount, address owner);

    event TokenUnlocked(uint256 _amount, address owner);

    event NewProposal(uint256 proposalId, string Title, address Proposer);

    event Voted(
        address indexed voter,
        uint256 indexed proposalId,
        uint256 votingPower,
        voteData voteType
    );

    // Mapping of locked token [address => amount]
    mapping(address => uint256) lockedTokenBalance;

    // Mapping of Proposal ID to Proposal Data.
    mapping(uint256 => ProposalData) IdToProposal;

    // Mapping of Proposal ID to Voters Address to Bool
    mapping(uint256 => mapping(address => bool)) hasVoted;

    // Mapping of of Proposal ID to Vote Details
    mapping(uint256 => Votes) voteDetails;

    function lockTokens(uint256 _amount) external {
        uint256 currentBalance = token.balanceOf(msg.sender);

        require(currentBalance >= _amount, "Not Enough Balance to Lock");
        token.transferFrom(msg.sender, address(this), _amount);
        lockedTokenBalance[msg.sender] = _amount;

        emit TokenLocked(_amount, msg.sender);
    }

    function unlockTokens() external {
        uint256 amount = lockedTokenBalance[msg.sender];
        require(lockedTokenBalance[msg.sender] >= amount);
        delete lockedTokenBalance[msg.sender];
        token.transfer(msg.sender, amount);

        emit TokenUnlocked(amount, msg.sender);
    }

    function getTokenBalance() external view returns (uint256) {
        return lockedTokenBalance[msg.sender];
    }

    function proposal(
        string memory _title,
        string memory _description,
        uint256 _requiredVotes,
        uint256 _endsAt
    ) external {
        IdToProposal[proposalCounter] = ProposalData({
            isChallanged: false,
            proposalId: proposalCounter,
            title: _title,
            description: _description,
            requiredVotes: _requiredVotes,
            createdAt: block.timestamp,
            endsAt: _endsAt,
            proposer: msg.sender,
            executed: false,
            acceptVotes: 0,
            rejectVotes: 0,
            undecidedVotes: 0
        });

        proposalCounter++;

        emit NewProposal(proposalCounter, _title, msg.sender);
    }

    function getProposal(
        uint256 _id
    ) public view returns (ProposalData memory) {
        return IdToProposal[_id];
    }

    function calculateVotingPower(
        address _user
    ) internal view returns (uint256) {
        uint256 lockedTokens = lockedTokenBalance[_user];
        require(lockedTokens > 0, "No Token Locked");

        uint256 z = (lockedTokens + 1) / 2;
        uint256 y = lockedTokens;

        while (z < y) {
            y = z;
            z = (lockedTokens / z + z) / 2;
        }

        return y;
    }

    function voteProposal(uint256 _proposalId, voteData _vote) external {
        require(!hasVoted[_proposalId][msg.sender], "User has already voted");

        uint256 votingPower = calculateVotingPower(msg.sender);
        if (_vote == voteData.Accept) {
            IdToProposal[_proposalId].acceptVotes += votingPower;
            voteDetails[_proposalId] = Votes(
                _proposalId,
                msg.sender,
                votingPower,
                voteData.Accept
            );
        } else if (_vote == voteData.Reject) {
            IdToProposal[_proposalId].rejectVotes += votingPower;
            voteDetails[_proposalId] = Votes(
                _proposalId,
                msg.sender,
                votingPower,
                voteData.Reject
            );
        } else {
            IdToProposal[_proposalId].undecidedVotes += votingPower;
            voteDetails[_proposalId] = Votes(
                _proposalId,
                msg.sender,
                votingPower,
                voteData.undecided
            );
        }

        emit Voted(msg.sender, _proposalId, votingPower, _vote);
    }

    function tallyVotes(uint256 proposalId) external {
        require(!proposalTallyComplete[proposalId], "Votes already tallied");

        uint256 totalVotingPower = totalVotes[proposalId];

        proposalTallyComplete[proposalId] = true;

        emit VotesTallied(proposalId, totalVotingPower);
    }
}
