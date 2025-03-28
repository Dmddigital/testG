//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "./ERC404.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

contract WarriorERC404 is ERC404 {
    using Strings for uint256;
    
    // Token metadata
    string public dataURI;
    string public baseTokenURI;
    
    // Warrior Attributes
    enum Element { Fire, Water, Earth, Shadow }

    enum Class { Warrior, Mage, Archer, Assassin, Paladin }    

    struct Warrior {
        bytes32 uid;        // Unique identifier
        Element element;
        Class class;
        uint256 powerLevel; // 299-999 range
        uint8 level;        // Starting at 1
        uint8 ratingStars;  // 1-5 stars
        uint8 forgeLevel;   // 0-3
        uint256 crystalSlot; // Crystal ID (0 = empty)
    }
    
    // Warrior data storage
    mapping(uint256 => Warrior) public warriors;

    mapping(uint256 => uint256) public energyLevel; // 0-100
    mapping(uint256 => uint256) public lastBattleTime;

    // Events
    event EnergyRecharged(uint256 tokenId, uint256 newEnergy);
    event WarriorForged(uint256 tokenId, uint8 forgeLevel, uint256 newPower);
    event CrystalSocketed(uint256 tokenId, uint256 crystalId);
    event WarriorCreated(uint256 tokenId, bytes32 uid, uint8 element, uint8 class, uint256 powerLevel, uint8 stars);
    event EnergySpent(uint256 tokenId, uint256 amountSpent, uint256 remaining);
    event BattleContractUpdated(address indexed oldBattleContract, address indexed newBattleContract);
    event MetadataURIUpdated(string newURI, string uriType);
    
    // Chain identifier for multi-chain deployment
    uint256 public chainIdentifier;

    constructor(
        address _owner
    ) ERC404("WarriorERC404", "WAURA", 18, 8000, _owner) {
        balanceOf[_owner] = 8000 * 10 ** 18;
        
        // Set chain identifier based on chain ID
        chainIdentifier = block.chainid;
    }

    function setDataURI(string memory _dataURI) public onlyOwner {
        dataURI = _dataURI;
        emit MetadataURIUpdated(_dataURI, "dataURI");
    }

    function setTokenURI(string memory _tokenURI) public onlyOwner {
        baseTokenURI = _tokenURI;
        emit MetadataURIUpdated(_tokenURI, "baseTokenURI");
    }

    function setNameSymbol(
        string memory _name,
        string memory _symbol
    ) public onlyOwner {
        _setNameSymbol(_name, _symbol);
    }

    // Override the _mint function to create a warrior when an NFT is minted
    function _mint(address to) internal override {
        // Call parent implementation first
        super._mint(to);
        
        // Create a warrior for the newly minted token
        uint256 tokenId = minted;
        _createWarrior(tokenId);
    }

    // Create a warrior with random attributes
    function _createWarrior(uint256 tokenId) internal {
        // Generate random attributes
        uint256 randomSeed = uint256(keccak256(abi.encodePacked(
            block.timestamp, 
            blockhash(block.number - 1),
            tokenId,
            minted,
            msg.sender
        )));
        
        // Generate unique UID
        bytes32 uid = keccak256(abi.encodePacked(
            chainIdentifier,    // Chain ID to ensure uniqueness across chains
            tokenId,            // Token ID for sequential component
            randomSeed,         // Random component
            block.timestamp     // Timestamp component
        ));
        
        // Use seed to determine class
        uint8 seed = uint8(bytes1(keccak256(abi.encodePacked(tokenId))));
        Class class;
        
        if (seed <= 100) {
            class = Class.Archer;      // 39% chance
        } else if (seed <= 160) {
            class = Class.Warrior;     // 24% chance
        } else if (seed <= 210) {
            class = Class.Paladin;     // 20% chance
        } else if (seed <= 240) {
            class = Class.Mage;        // 12% chance
        } else {
            class = Class.Assassin;    // 5% chance
        }
        
        // Element (0-3: Fire, Water, Earth, Shadow)
        Element element = Element((randomSeed / 100) % 4);
        
        // Power level (299-999 range)
        uint256 powerLevel = 299 + (randomSeed / 10000) % 701;
        
        // Star rating based on power level
        uint8 stars;
        if (powerLevel < 400) stars = 1;
        else if (powerLevel < 550) stars = 2;
        else if (powerLevel < 700) stars = 3;
        else if (powerLevel < 850) stars = 4;
        else stars = 5;
        
        // Create the warrior
        warriors[tokenId] = Warrior({
            uid: uid,
            element: element,
            class: class,
            powerLevel: powerLevel,
            level: 1,
            ratingStars: stars,
            forgeLevel: 0,
            crystalSlot: 0
        });

        // Initialize energy to 100 for newly created warriors
        energyLevel[tokenId] = 100;
        lastBattleTime[tokenId] = block.timestamp;
        
        // Emit warrior created event
        emit WarriorCreated(tokenId, uid, uint8(element), uint8(class), powerLevel, stars);
    }

    // Check current energy level
    function getEnergyLevel(uint256 tokenId) public view returns (uint256) {
        if (block.timestamp >= lastBattleTime[tokenId] + 6 hours) {
            return 100; // Fully recharged
        }
        
        // Calculate partial recharge (linear)
        uint256 timeElapsed = block.timestamp - lastBattleTime[tokenId];
        uint256 rechargeRate = 100 * timeElapsed / (6 hours);
        
        return rechargeRate > 100 ? 100 : rechargeRate;
    }

    // Get warrior details
    function getWarrior(uint256 tokenId) public view returns (Warrior memory) {
        require(_ownerOf[tokenId] != address(0), "WarriorERC404: Query for nonexistent warrior");
        return warriors[tokenId];
    }

    // Socket a crystal into a warrior
    function socketCrystal(uint256 tokenId, uint256 crystalId) public {
        require(_ownerOf[tokenId] == msg.sender, "WarriorERC404: Only the owner can socket crystals");
        require(warriors[tokenId].crystalSlot == 0, "WarriorERC404: Warrior already has a crystal");
        
        warriors[tokenId].crystalSlot = crystalId;
        
        emit CrystalSocketed(tokenId, crystalId);
    }

    // Upgrade warrior with forging
    function forgeWarrior(uint256 tokenId) public {
        require(_ownerOf[tokenId] == msg.sender, "WarriorERC404: Only the owner can forge warriors");
        require(warriors[tokenId].forgeLevel < 3, "WarriorERC404: Warrior has reached maximum forge level (3)");
        
        uint8 newForgeLevel = warriors[tokenId].forgeLevel + 1;
        warriors[tokenId].forgeLevel = newForgeLevel;
        
        // Increase power level by 10% per forge level
        uint256 powerBoost = warriors[tokenId].powerLevel * 10 / 100;
        warriors[tokenId].powerLevel += powerBoost;
        
        // Update star rating if applicable
        uint256 newPower = warriors[tokenId].powerLevel;
        uint8 newStars;
        
        if (newPower < 400) newStars = 1;
        else if (newPower < 550) newStars = 2;
        else if (newPower < 700) newStars = 3;
        else if (newPower < 850) newStars = 4;
        else newStars = 5;
        
        warriors[tokenId].ratingStars = newStars;
        
        emit WarriorForged(tokenId, newForgeLevel, newPower);
    }

    function tokenURI(uint256 id) public view override returns (string memory) {
        if (bytes(baseTokenURI).length > 0) {
            return string.concat(baseTokenURI, Strings.toString(id));
        } else {
            Warrior memory warrior = warriors[id];
            
            // Convert element to string
            string memory elementStr;
            if (warrior.element == Element.Fire) elementStr = "Fire";
            else if (warrior.element == Element.Water) elementStr = "Water";
            else if (warrior.element == Element.Earth) elementStr = "Earth";
            else elementStr = "Shadow";
            
            // Set image and class string based on class
            string memory classStr;
            string memory image;
            
            if (warrior.class == Class.Archer) {
                classStr = "Archer";
                image = "Archer.gif";
            } else if (warrior.class == Class.Warrior) {
                classStr = "Warrior";
                image = "Warrior.gif";
            } else if (warrior.class == Class.Paladin) {
                classStr = "Paladin";
                image = "Paladin.gif";
            } else if (warrior.class == Class.Mage) {
                classStr = "Mage";
                image = "Mage.gif";
            } else {
                classStr = "Assassin";
                image = "Assassin.gif";
            }
            
            // Build JSON metadata
            string memory jsonPreImage = string.concat(
                string.concat(
                    string.concat('{"name": "WarriorERC404 #', Strings.toString(id)),
                    '","description":"A collection of 8,000 Warriors enabled by ERC404, an experimental token standard.","external_url":"https://warrior404.com","image":"'
                ),
                string.concat(dataURI, image)
            );
            
            string memory jsonAttributes = string.concat(
                '","attributes":[',
                string.concat('{"trait_type":"Element","value":"', elementStr, '"},'),
                string.concat('{"trait_type":"Class","value":"', classStr, '"},'),
                string.concat('{"trait_type":"Power","value":', Strings.toString(warrior.powerLevel), '},'),
                string.concat('{"trait_type":"Stars","value":', Strings.toString(uint256(warrior.ratingStars)), '},'),
                string.concat('{"trait_type":"Level","value":', Strings.toString(uint256(warrior.level)), '},'),
                string.concat('{"trait_type":"Forge","value":', Strings.toString(uint256(warrior.forgeLevel)), '}')
            );
            
            string memory jsonEnd = ']}';
            
            return string.concat(
                "data:application/json;utf8,",
                string.concat(
                    jsonPreImage,
                    string.concat(jsonAttributes, jsonEnd)
                )
            );
        }
    }

    // Battle contract address
    address public battleContract;

    // Set battle contract address
    function setBattleContract(address _battleContract) external onlyOwner {
        address oldBattleContract = battleContract;
        battleContract = _battleContract;
        emit BattleContractUpdated(oldBattleContract, _battleContract);
    }

    // Check if caller is battle contract
    modifier onlyBattle() {
        require(msg.sender == battleContract, "WarriorERC404: Caller is not the battle contract");
        _;
    }

    // Used by the battle contract to spend energy
    function spendEnergy(uint256 tokenId, uint256 amount) external onlyBattle {
        require(_ownerOf[tokenId] != address(0), "WarriorERC404: Cannot spend energy for nonexistent warrior");
        require(energyLevel[tokenId] >= amount, "WarriorERC404: Insufficient energy for battle");
        
        energyLevel[tokenId] -= amount;
        lastBattleTime[tokenId] = block.timestamp;
        
        emit EnergySpent(tokenId, amount, energyLevel[tokenId]);
    }

    // Get the counter element (strong against)
    function getCounterElement(Element element) public pure returns (Element) {
        // Fire > Shadow > Earth > Water > Fire
        if (element == Element.Fire) return Element.Shadow;
        if (element == Element.Water) return Element.Fire;
        if (element == Element.Earth) return Element.Water;
        if (element == Element.Shadow) return Element.Earth;
        return Element.Fire; // Fallback
    }

    // Get the weak element (weak against)
    function getWeakElement(Element element) public pure returns (Element) {
        // Fire < Water, Water < Earth, Earth < Shadow, Shadow < Fire
        if (element == Element.Fire) return Element.Water;
        if (element == Element.Water) return Element.Earth;
        if (element == Element.Earth) return Element.Shadow;
        if (element == Element.Shadow) return Element.Fire;
        return Element.Fire; // Fallback
    }
}