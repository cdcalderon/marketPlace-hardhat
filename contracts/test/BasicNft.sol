// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BasicNft is ERC721 {
    // string public constant TOKEN_URI =
    //     "ipfs://bafybeieqthrdz6xgqvf4uv5jqvpq7cfwbawdz77snikr6ceipff6uo53yy/?filename=0-poncho.json"; // My Frenchy
    string public constant TOKEN_URI =
        "ipfs://QmWq7azr6G1cVaeBAwUx5gVuATDzkgf19s8xQguj5jVPaE/?filename=1-poncho.json"; // My Frenchy
    uint256 private s_tokenCounter;

    event DogMinted(uint256 indexed tokenId);

    constructor() ERC721("Poncho", "PET") {
        s_tokenCounter = 0;
    }

    function mintNft() public {
        _safeMint(msg.sender, s_tokenCounter);
        emit DogMinted(s_tokenCounter);
        s_tokenCounter = s_tokenCounter + 1;
    }

    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        require(_exists(tokenId), "ERC721Metadata: URI query for nonexistent token");
        return TOKEN_URI;
    }

    function getTokenCounter() public view returns (uint256) {
        return s_tokenCounter;
    }
}
