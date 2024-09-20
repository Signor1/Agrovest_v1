// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {Iinvestment} from "./Interfaces/Iinvestment.sol";

contract DAO is Ownable {
    IERC20 public token;
    Iinvestment public investment;

    constructor(
        address _votingToken,
        address _investmentCA
    ) Ownable(msg.sender) {
        token = IERC20(_votingToken);
        investment = Iinvestment(_investmentCA);
    }

    uint256 proposalCounter;
    uint256 public disputeCounter;
    uint256 public challengeCounter;

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

    struct ChallengeData {
        uint256 proposalId;
        string description;
        bool resolved;
        address challenger;
    }

    struct DisputeData {
        uint256 challengeId;
        address arbitrator;
        bool resolved;
        bool ruling; // true if challenge is upheld, false otherwise
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

    event VotesTallied(
        uint256 indexed proposalIdTallyVote,
        uint256 totalVotingPower
    );

    event ProposalExecuted(
        uint256 ProposalId,
        uint256 FarmId,
        address Proposer
    );

    event DisputeInitiated(
        uint256 indexed disputeInitiatedId,
        uint256 challengeId,
        address indexed arbitrator
    );

    event DisputeResolved(uint256 indexed disputeResolvedId, bool ruling);

    event Delegated(
        address indexed delegatorAddress,
        address indexed delegatee
    );
    event Undelegated(address indexed unDelegator);
    event ChallengeResolved(uint256 indexed challengeIdResolved, bool valid);

    event ChallengeCreated(
        uint256 indexed challengeIdCreated,
        uint256 proposalId,
        address indexed challenger
    );

    // Mapping of locked token [address => amount]
    mapping(address => uint256) lockedTokenBalance;

    // Mapping of Proposal ID to Proposal Data.
    mapping(uint256 => ProposalData) IdToProposal;

    // Mapping of Proposal ID to Voters Address to Bool
    mapping(uint256 => mapping(address => bool)) hasVoted;

    // Mapping of of Proposal ID to Vote Details
    mapping(uint256 => Votes) voteDetails;

    mapping(uint256 => bool) public proposalTallyComplete; // proposalId => tally status

    mapping(uint256 => uint256) public totalVotes; // proposalId => total votes

    mapping(address => address) public delegates;

    mapping(uint256 => DisputeData) public disputes;

    mapping(uint256 => ChallengeData) public challenges;

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

    function executeProposal(
        uint256 _proposalId,
        uint256 _farmId,
        string memory _name,
        string memory _about,
        uint256 _minAmount,
        uint256 _endDate
    ) external {
        require(
            proposalTallyComplete[_proposalId] == true,
            "Votes not tallied yet"
        );

        investment.createInvestment(
            _farmId,
            _name,
            _about,
            _minAmount,
            _endDate,
            msg.sender
        );

        emit ProposalExecuted(_proposalId, _farmId, msg.sender);
    }

    // Delegate Section

    function delegate(address delegatee) external {
        require(delegatee != msg.sender, "Cannot delegate to self");
        require(
            delegates[msg.sender] == address(0),
            "Cannot delegate to Adderss Zero"
        );

        delegates[msg.sender] = delegatee;
        emit Delegated(msg.sender, delegatee);
    }

    function undelegate() external {
        require(delegates[msg.sender] != address(0), "No delegation found");

        delete delegates[msg.sender];
        emit Undelegated(msg.sender);
    }

    function getDelegate(address delegator) external view returns (address) {
        return delegates[delegator];
    }

    // Challange Section

    function createChallenge(
        uint256 proposalId,
        string memory description
    ) external {
        require(bytes(description).length > 0, "Description cannot be empty");

        challenges[challengeCounter] = ChallengeData({
            proposalId: proposalId,
            description: description,
            resolved: false,
            challenger: msg.sender
        });

        emit ChallengeCreated(challengeCounter, proposalId, msg.sender);

        challengeCounter++;
    }

    function resolveChallenge(uint256 challengeId, bool valid) external {
        require(
            !challenges[challengeId].resolved,
            "Challenge already resolved"
        );

        challenges[challengeId].resolved = true;

        // Implement logic to invalidate the proposal if the challenge is valid

        emit ChallengeResolved(challengeId, valid);
    }

    function getChallenge(
        uint256 challengeId
    ) external view returns (ChallengeData memory) {
        return challenges[challengeId];
    }

    // Dispute Section

    function initiateDispute(uint256 challengeId, address arbitrator) external {
        require(arbitrator != address(0), "Invalid arbitrator address");

        disputes[disputeCounter] = DisputeData({
            challengeId: challengeId,
            arbitrator: arbitrator,
            resolved: false,
            ruling: false
        });

        emit DisputeInitiated(disputeCounter, challengeId, arbitrator);

        disputeCounter++;
    }

    function resolveDispute(uint256 disputeId, bool ruling) external {
        DisputeData storage dispute = disputes[disputeId];
        require(
            msg.sender == dispute.arbitrator,
            "Only the arbitrator can resolve the dispute"
        );
        require(!dispute.resolved, "Dispute already resolved");

        dispute.resolved = true;
        dispute.ruling = ruling;

        // Implement logic to apply the ruling to the associated challenge

        emit DisputeResolved(disputeId, ruling);
    }

    function getDispute(
        uint256 disputeId
    ) external view returns (DisputeData memory) {
        return disputes[disputeId];
    }
}
