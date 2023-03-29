//const { ethers } = require("ethers")
const { ethers } = require("hardhat")
const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers")
const { assert, expect } = require("chai")

describe("Consultanct", function () {
    async function deployConsultancyFixture() {
        const Contract = await ethers.getContractFactory("Consultancy")
        const [owner, signer, advisor, addr2, addr3] = await ethers.getSigners()
        const contract = await Contract.deploy(advisor.address)
        await contract.deployed()

        return { owner, signer, advisor, addr2, addr3, contract }
    }

    describe("openChannelAsConsumer", function () {
        it("opening channel successfully", async function () {
            const { signer, contract } = await loadFixture(
                deployConsultancyFixture
            )
            assert.isOk(
                contract.connect(signer.address).openchannelAsConsumer({
                    value: ethers.utils.parseEther("1"),
                }),
                "Not working"
            )
        })
        it("not already in consumer mapping", async function () {
            const { addr2, contract } = await loadFixture(
                deployConsultancyFixture
            )
            assert.isNotTrue(
                contract.consumer(addr2.address),
                "Already in mapping"
            )
        })
    })

    describe("closeChannel", function () {
        it("closing the channel properly", async function () {
            const { signer, contract } = await loadFixture(
                deployConsultancyFixture
            )
            const message = "hello i am message"
            const messageHash = ethers.utils.hashMessage(message)
            const signature = await signer.signMessage(message)
            assert.isOk(
                contract
                    .connect(signer.address)
                    .closeChannel(signer.address, messageHash, signature)
            )
        })
    })

    describe("withdraw", function () {
        it("withdrawing fund properly", async function () {
            const { owner, contract } = await loadFixture(
                deployConsultancyFixture
            )
            let inititalBalance = await owner.getBalance()
            contract.connect(owner.address).withdraw()
            let newBalance = await owner.getBalance()
            assert.notEqual(newBalance, inititalBalance)
            
        })
    })
    describe("addAdvisor", function () {
        it("adding advisor properly", async function () {
            const { addr2, owner, contract } = await loadFixture(
                deployConsultancyFixture
            )
            contract.connect(owner.address).addAdvisor(addr2.address)
            assert.isOk(contract.advisor(addr2.address))
        })
    })

    describe("removeAdvisor", function () {
        it("removing advisor properly", async function () {
            const { advisor, owner, contract } = await loadFixture(
                deployConsultancyFixture
            )

            contract.connect(owner.address).removeAdvisor(advisor.address)
            assert.isNotTrue(contract.advisor(advisor.address))
        })
    })
})
