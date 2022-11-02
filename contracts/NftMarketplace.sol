// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

error NftMarketplace__InvalidPriceShouldBeAboveZero();

contract NftMarketplace is ReentrancyGuard {
    // eip-721
    // https://eips.ethereum.org/EIPS/eip-721
    /// @notice Get the approved address for a single NFT
    /// @dev Throws if `_tokenId` is not a valid NFT.
    /// @param _tokenId The NFT to find the approved address for
    /// @return The approved address for this NFT, or the zero address if there is none
    // function getApproved(uint256 _tokenId) external view returns (address);

    struct Listing {
        uint256 price;
        address seller;
    }
    // NFT Contract address -> NFT TokenId -> Listing
    mapping(address => mapping(uint256 => Listing)) private s_listings;

    /////////////////////
    // Main Functions //
    /////////////////////
    /*
     * @notice Method for listing NFT
     * @param nftAddress Address of NFT contract
     * @param tokenId Token ID of NFT
     * @param price sale price for each item
     */
    function listItem(
        address nftAddress,
        uint256 tokenId,
        uint256 price
    ) external {
        if (price <= 0) {
            revert NftMarketplace__InvalidPriceShouldBeAboveZero();
        }
        IERC721 nft = IERC721(nftAddress);

        s_listings[nftAddress][tokenId] = Listing(price, msg.sender);
    }
}
