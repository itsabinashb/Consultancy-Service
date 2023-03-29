import { ethers } from "ethers"
import { useState } from "react"
import ChatBox from "./ChatBox"
import HandleAdvisors from "./HandleAdvisors"
import WithdrawFund from "./WithdrawFund"
import Abort from "./Abort"

export default function EnterChannel({ values, provider }) {
    const [readyToEnter, setReadyToEnter] = useState(false)
    const [advisor, setAdvisor] = useState(null)
    const [owner, setOwner] = useState(null)
    const { signer } = values
    const { contract } = values
    const {signerObject} = values
    
    async function handleChannelEntry(e) {
        e.preventDefault()
        e.currentTarget.disabled = true

        console.log("from enterChannel signer is ", contract.signer)
        console.log(
            `from EnterChannel address of signer ${signer}` // changed here
        )
        console.log(`from EnterChannel contract address is ${contract.address}`)
        console.log(`From EnterChannel provider is ${contract.provider}`)

        if (
            await contract.openchannelAsConsumer({
                value: ethers.utils.parseEther("0.00005"),
                gasLimit: 200000,
            })
        ) {
            setReadyToEnter(true)
        }

        setAdvisor(await contract.Advisor())
        setOwner(await contract.owner())
    }
    return (
        <div className="space-y-1">
            <div>
                <button
                    className="px-4 py-1 text-xl text-blue-600 font-semibold rounded-xl border border-blue-200 hover:text-white hover:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    onClick={handleChannelEntry}
                >
                    Pay 0.00005 ether and enter
                </button>
            </div>

            <ChatBox
                readyToEnter={readyToEnter}
                signer={signer}
                advisor={advisor}
                contract={contract}
                signerObject={signerObject}
                
            />
            <WithdrawFund
                contract={contract}
                signer={signer}
                advisor={advisor}
                owner={owner}
            />
            <HandleAdvisors
                contract={contract}
                signer={signer}
                advisor={advisor}
                owner={owner}
            />
            <Abort signer={signer} contract={contract} provider={provider}/>
        </div>
    )
}
