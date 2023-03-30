import "./App.css"
import abi from "./contract/Consultancy.json"
import EnterChannel from "./components/EnterChannel"
//import { WagmiConfig } from "wagmi"
import { ethers } from "ethers"
import { useState } from "react"
const _abi = abi.abi
console.log("abi is", _abi)
let _signer
let _contract
const address = "0x18b70A4bE01eA22Da80EFAC86fa3FeE59e252FEB"

let signerAddress
export default function App() {
    const [values, setValues] = useState({
        signer: null,
        contract: null,
        signerObject: null,
    })

    /**
     *
     *  initial render: both are null
     *  2nd render: with click handleConnect() setValues prepare to update with new values
     *
     */

    async function handleConnect(e) {
        e.preventDefault()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        //const provider = new ethers.getDefaultProvider("http://localhost:8545")

        _signer = provider.getSigner()
        //console.log(`_signer address is : ${await _signer.getAddress()}`)
        signerAddress = await _signer.getAddress()
        // console.log(`signerAddress is : ${signerAddress}`)

        _contract = new ethers.Contract(address, _abi, _signer)

        setValues({
            signer: signerAddress,
            contract: _contract,
            signerObject: _signer,
        }) // preparing to set new value in next render
    }

    return (
        
        <div className="container mx-auto space-y-1 w-full h-full ">
            <h1 className="text-transparent bg-clip-text bg-gradient-to-r to-gray-400 from-black text-6xl font-extrabold">
                Welcome To Consultancy Service
            </h1>
            <h3>Only active room-id: 1</h3>
            <nav>
                <button
                    className="px-4 py-1 text-xl text-blue-600 font-semibold rounded-xl border border-blue-200 hover:text-white hover:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    onClick={handleConnect}
                >
                    {ethers.utils.isAddress(signerAddress)
                        ? `Connected By ${signerAddress}`
                        : `Connect Wallet`}
                </button>
            </nav>

            <EnterChannel values={values}/>
            
        </div>
        
    )
}
