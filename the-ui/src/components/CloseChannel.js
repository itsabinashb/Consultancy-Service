import { ethers } from "ethers"
//import { useDisconnect } from "wagmi"

function CloseChannel({ signature, message, signer, room, contract, socket }) {
    // const { disconnect } = useDisconnect()
    const messageHash = ethers.utils.hashMessage(message)
    //_signature = ethers.utils.keccak256(signature)

    async function handleCloseChannelByUser() {
        console.log(`room id is: ${room}`)
        await contract.closeChannel(signer, messageHash, signature, {
            from: signer,
            gasLimit: 200000,
        }) // changed here
        await socket.emit("leave_room", room)
        // disconnect()
        window.location.reload()
    }
    return (
        <div>
            <button
                className="px-4 py-1 text-xl text-blue-600 font-semibold rounded-xl border border-blue-200 hover:text-white hover:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                onClick={handleCloseChannelByUser}
            >
                Close Channel
            </button>
        </div>
    )
}

export default CloseChannel
