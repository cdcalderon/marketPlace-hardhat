const { assert, expect } = require("chai")
const { network, deployments, ethers } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("Nft Marketplace Unit Tests", function () {
          let nftMarketplace, nftMarketplaceContract, basicNft, basicNftContract, user, deployer
          const PRICE = ethers.utils.parseEther("0.1")
          const TOKEN_ID = 0

          beforeEach(async () => {
              accounts = await ethers.getSigners()
              deployer = accounts[0] // (await getNamedAccounts()).deployer
              user = accounts[1]
              await deployments.fixture(["all"])
              nftMarketplaceContract = await ethers.getContract("NftMarketplace") // default to take accounts[0]
              nftMarketplace = nftMarketplaceContract.connect(deployer)

              // Nft mind and approve
              basicNftContract = await ethers.getContract("BasicNft") // default to take accounts[0]
              basicNft = await basicNftContract.connect(deployer)
              await basicNft.mintNft()
              await basicNft.approve(nftMarketplaceContract.address, TOKEN_ID)
          })

          describe("listItem", function () {
              let listItemTransaction, listItemResult
              beforeEach(async () => {
                  listItemTransaction = await nftMarketplace.listItem(
                      basicNft.address,
                      TOKEN_ID,
                      PRICE
                  )
                  listItemResult = await listItemTransaction.wait()
              })
              it("emits an event after listing an item", async function () {
                  const itemListEvent = listItemResult.events[0]
                  expect(listItemTransaction).to.emit("ItemListed")

                  console.log(itemListEvent.args)
                  itemListEventArgs = itemListEvent.args
                  expect(itemListEventArgs.nftAddress).to.equal(basicNft.address)
                  expect(itemListEventArgs.seller).to.equal(deployer.address)
                  expect(itemListEventArgs.price).to.equal(PRICE)
                  expect(itemListEventArgs.tokenId).to.equal(TOKEN_ID)
              })
          })
      })
