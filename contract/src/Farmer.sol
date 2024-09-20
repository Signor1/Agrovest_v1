// SPDX-License-Identifier: MIT
pragma solidity >=0.8.0 <0.9.0;
import "../Library/Error.sol";
import "../Library/Event.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../Interfaces/IFarmEscrow.sol";

contract Farm {
    IERC20 public token;
    IFarmEscrow public escrow;

    mapping(address => string) public business_name;
    mapping(string => address) public nameToAddress;
    mapping(address => string) public business_image;
    uint256 public productIndexCounter;
    mapping(uint256 => address[]) public productBuyers;

    struct Farmer {
        string business_name;
        string business_image;
        string business_location;
        uint256 business_contact;
        string business_email;
        address farmerAddress;
        bool isRegistered;
    }

    Farmer[] farms;

    struct FarmProducts {
        string product_name;
        string product_image;
        string product_description;
        uint256 product_price;
        address product_owner;
        uint256 product_id;
    }

    mapping(uint256 => Review[]) public productReviews;
    mapping(uint256 => mapping(address => bool)) public hasReviewed;
    mapping(address => mapping(uint256 => bool)) public purchases;
    mapping(address => FarmProducts[]) public farmProducts;
    mapping(address => FarmProducts[]) public purchasedProducts;

    struct Review {
        address reviewer;
        string review;
    }

    mapping(address => FarmProducts[]) cartProducts;

    mapping(address => Farmer) details;

    constructor(address _tokenAddress, address _escrowAddress) {
        token = IERC20(_tokenAddress);
        escrow = IFarmEscrow(_escrowAddress);
    }

    function registerFarms(
        string memory _name,
        string memory _image,
        string memory _location,
        uint256 _contact_info,
        address _address,
        string memory _email
    ) public {
        if (bytes(_name).length <= 0) {
            revert Error.NameCannotBeEmpty();
        }

        if (nameToAddress[_name] != address(0)) {
            revert Error.NameAlreadyRegistered();
        }

        business_name[msg.sender] = _name;
        nameToAddress[_name] = msg.sender;
        business_image[msg.sender] = _image;
        details[msg.sender] = Farmer(
            _name,
            _image,
            _location,
            _contact_info,
            _email,
            _address,
            true
        );
        farms.push(details[msg.sender]);
        emit Event.BusinessNameRegistered(msg.sender, _name);
        emit Event.BusinessImageRegistered(msg.sender, _image);
    }

    function updateDetails(
        uint256 _index,
        string memory _name,
        string memory _image,
        string memory _location,
        uint256 _contact_info,
        string memory _email
    ) public {
        if (_index >= farms.length) {
            revert Error.InvalidFarmIndex();
        }

        if (!details[msg.sender].isRegistered) {
            revert Error.YouAreNotRegistered();
        }

        if (
            keccak256(bytes(farms[_index].business_name)) !=
            keccak256(bytes(business_name[msg.sender]))
        ) {
            revert Error.TheFarmDoesNotBelongToYou();
        }
        farms[_index].business_name = _name;
        farms[_index].business_image = _image;
        farms[_index].business_location = _location;
        farms[_index].business_contact = _contact_info;
        farms[_index].business_email = _email;
        details[msg.sender] = farms[_index];

        emit Event.BusinessNameUpdated(msg.sender, _name);
        emit Event.BusinessImageUpdated(msg.sender, _image);
    }

    function getFarmIndex(string memory _name) public view returns (uint256) {
        for (uint256 i = 0; i < farms.length; i++) {
            if (
                keccak256(bytes(farms[i].business_name)) ==
                keccak256(bytes(_name))
            ) {
                return i;
            }
        }
        revert Error.FarmNotFound();
    }

    function addFarmProduct(
        string memory _productName,
        string memory _productImage,
        string memory _productDescription,
        uint256 _productPrice
    ) public {
        if (!details[msg.sender].isRegistered) {
            revert Error.YouAreNotRegistered();
        }

        productIndexCounter++;
        uint256 _productId = productIndexCounter;

        FarmProducts memory newProduct = FarmProducts(
            _productName,
            _productImage,
            _productDescription,
            _productPrice,
            msg.sender,
            _productId
        );
        farmProducts[msg.sender].push(newProduct);

        emit Event.ProductAdded(msg.sender, _productName);
    }

    function submitReview(uint256 _productId, string memory _review) public {
        bool _hasPurchased = false;
        for (uint256 i = 0; i < productBuyers[_productId].length; i++) {
            if (productBuyers[_productId][i] == msg.sender) {
                _hasPurchased = true;
                break;
            }
        }

        if (!_hasPurchased) {
            revert Error.OnlyBuyersCanReview();
        }

        require(
            !hasReviewed[_productId][msg.sender],
            "You have already reviewed this product"
        );

        productReviews[_productId].push(
            Review({reviewer: msg.sender, review: _review})
        );

        hasReviewed[_productId][msg.sender] = true;
        productReviews[_productId].push(Review(msg.sender, _review));

        emit Event.ProductReviewed(msg.sender, _productId, _review);
    }

    function hasPurchased(
        address buyer,
        uint256 _productId
    ) external view returns (bool) {
        return purchases[buyer][_productId];
    }

    function getProductReviews(
        uint256 _productId
    ) public view returns (Review[] memory) {
        return productReviews[_productId];
    }

    function addProductToCart(uint256 _productId) public {
        bool productExists = false;

        for (uint256 i = 0; i < farms.length; i++) {
            address farmer = nameToAddress[farms[i].business_name];

            for (uint256 j = 0; j < farmProducts[farmer].length; j++) {
                if (farmProducts[farmer][j].product_id == _productId) {
                    productExists = true;

                    FarmProducts memory newProduct = FarmProducts(
                        farmProducts[farmer][j].product_name,
                        farmProducts[farmer][j].product_image,
                        farmProducts[farmer][j].product_description,
                        farmProducts[farmer][j].product_price,
                        farmProducts[farmer][j].product_owner,
                        farmProducts[farmer][j].product_id
                    );
                    cartProducts[msg.sender].push(newProduct);
                    break;
                }
            }
            if (productExists) break;
        }

        if (!productExists) {
            revert Error.ProductDoesNotExist();
        }
    }

    function getCartProducts(
        address _buyer
    ) public view returns (FarmProducts[] memory) {
        return cartProducts[_buyer];
    }

    function removeProductFromCart(uint256 _productId) public {
        FarmProducts[] storage cart = cartProducts[msg.sender];
        for (uint256 i = 0; i < cart.length; i++) {
            if (cart[i].product_id == _productId) {
                cart[i] = cart[cart.length - 1];
                cart.pop();
                break;
            }
        }
    }

    function purchaseProduct(uint256 _productId) public {
        FarmProducts memory product;
        bool productFound = false;
        address productOwner;

        for (uint256 i = 0; i < farms.length; i++) {
            address farmerAddress = farms[i].farmerAddress;
            FarmProducts[] storage products = farmProducts[farmerAddress];

            for (uint256 j = 0; j < products.length; j++) {
                if (products[j].product_id == _productId) {
                    product = products[j];
                    productOwner = farmerAddress;
                    productFound = true;
                    break;
                }
            }
            if (productFound) break;
        }

        if (!productFound) {
            revert Error.ProductDoesNotExist();
        }

        uint256 allowance = token.allowance(msg.sender, address(this));
        if (allowance < product.product_price) {
            revert Error.InsufficientAllowance();
        }
        // uint256[] productIds;
        // uint256[] amounts;

        // // Create arrays for product IDs and amounts
        // uint256;
        // productIds[0] = _productId;
        // uint256;
        // amounts[0] = product.product_price;

        // // Call createEscrow function
        escrow.createEscrow(productOwner, _productId, product.product_price);

        bool success = token.transferFrom(
            msg.sender,
            address(escrow),
            product.product_price
        );
        if (!success) {
            revert Error.TransferFailed();
        }

        // productBuyers[_productId].push(msg.sender);
        // purchases[msg.sender][_productId] = true;

        // purchasedProducts[msg.sender].push(product);

        removeProductFromCart(_productId);

        emit Event.EscrowCreated(msg.sender, _productId);
    }

    function getPurchasedProducts(
        address _buyer
    ) public view returns (FarmProducts[] memory) {
        return purchasedProducts[_buyer];
    }

    function updateFarmProduct(
        uint256 _index,
        string memory _productName,
        string memory _productImage,
        string memory _productDescription,
        uint256 _productPrice
    ) public {
        if (_index >= farmProducts[msg.sender].length) {
            revert Error.InvalidProductIndex();
        }
        farmProducts[msg.sender][_index].product_name = _productName;
        farmProducts[msg.sender][_index].product_image = _productImage;
        farmProducts[msg.sender][_index]
            .product_description = _productDescription;
        farmProducts[msg.sender][_index].product_price = _productPrice;
        emit Event.ProductUpdated(msg.sender, _productName);
    }

    function getFarmProducts() public view returns (FarmProducts[] memory) {
        return farmProducts[msg.sender];
    }

    function getAllFarmProducts() public view returns (FarmProducts[] memory) {
        uint256 totalProducts = 0;
        for (uint256 i = 0; i < farms.length; i++) {
            address farmerAddress = nameToAddress[farms[i].business_name];
            totalProducts += farmProducts[farmerAddress].length;
        }

        FarmProducts[] memory allProducts = new FarmProducts[](totalProducts);
        uint256 index = 0;
        for (uint256 i = 0; i < farms.length; i++) {
            address farmerAddress = nameToAddress[farms[i].business_name];
            FarmProducts[] memory products = farmProducts[farmerAddress];
            for (uint256 j = 0; j < products.length; j++) {
                allProducts[index] = products[j];
                index++;
            }
        }

        return allProducts;
    }

    function getName(address _user) public view returns (string memory) {
        return business_name[_user];
    }

    function getAddress(string memory _name) public view returns (address) {
        return nameToAddress[_name];
    }

    function getUser() external view returns (Farmer memory) {
        return details[msg.sender];
    }

    function getImage(address _user) public view returns (string memory) {
        return business_image[_user];
    }

    function retrunFarms() external view returns (Farmer[] memory) {
        return farms;
    }
}
