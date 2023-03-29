const { network } = require("hardhat")


module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy } = deployments
    const chainId = network.config.chainId

    const args = ["0xC81d6a1c5e539313927e1E0d3e1177379CeE8DE9"]
    await deploy("Consultancy", {
        from: deployer,
        args: args,
        log: true,
        waitForConfirmation: 1,
        gasLimit: 2000000
    })
}
