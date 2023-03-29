/** @type import('hardhat/config').HardhatUserConfig */

require("@nomicfoundation/hardhat-network-helpers")
require("@nomiclabs/hardhat-ethers")
require("@nomiclabs/hardhat-etherscan")
require("chai")
require("dotenv").config()
require("hardhat-deploy")
module.exports = {
    solidity: {
        compilers: [
            { version: "0.8.13" },
            { version: "0.8.14" },
            { version: "0.8.15" },
            { version: "0.8.16" },
            { version: "0.8.17" },
        ],
    },
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 31337,
            blockConfirmations: 1,
            forking: {
                url: process.env.MAINNET_RPC_URL,
            },
        },

        goerli: {
            chainId: 5,
            blockConfirmations: 1,
            accounts: [process.env.PRIVATE_KEY],
            url: process.env.RPC_URL,
        },
    },

    etherscan: {
        apiKey: {
            goerli: process.env.ETHERSCAN_API_KEY,
        },
    },

    namedAccounts: {
        deployer: {
            default: 0,
        },
    },
}
