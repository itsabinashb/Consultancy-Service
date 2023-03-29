//import { ethers } from "hardhat"
import { useState, useEffect } from "react"
import { io } from "socket.io-client"

import { verifyMessage } from "ethers/lib/utils"
import CloseChannel from "./CloseChannel"

const socket = io.connect("http://localhost:4000") // here we are connectoing our frontend server with backend server.
//let id = 0

export default function ChatBox({
    readyToEnter,
    signer,
    advisor,
    contract,
    signerObject,
}) {
    const [_message, setMessage] = useState([])
    const [newMessage, setNewMessage] = useState("")
    //const [currentUser, setCurrentUser] = useState("")
    const [currentSignature, setCurrentSignature] = useState(0x00)
    const [room, setRoom] = useState("")
    const [joinRoom, setJoinRoom] = useState(false)

    console.log(`from chat box signer is : ${signer}`)

    // console.log(`from ChatBox readyToEnter is: ${readyToEnter}`)
    // // //console.log(`from ChatBox signer is: ${signer.getAddress()}`)
    // //console.log(`from ChatBox advisor is: ${advisor}`)
    // // console.log(`from ChatBox readyToEnter is: ${contract.address}`)

    function handleJoinRoom(e) {
        e.currentTarget.disabled = true
        socket.emit("room", room)
        setJoinRoom(true)
    }

    async function handleSendMessage() {
        if (newMessage !== "" && joinRoom === true) {
            const messages = {
                message: newMessage,
                roomId: room,
                //user: signer,
            }

            const signature = await signerObject.signMessage(messages.message)
            setCurrentSignature(signature)
            console.log(`signature is: ${signature}`)
            if (
                verifyMessage(messages.message, signature) === signer || // changed here
                verifyMessage(messages.message, signature) === advisor
            ) {
                socket.emit("messages_from_client", messages)
                setMessage([..._message, messages.message])
                setNewMessage("")
            }
        }
    }

    useEffect(() => {
        socket.on("messages_from_server", (messages) => {
            console.log(`message from server: ${messages.message}`)
            setMessage((_message) => [..._message, messages.message])
        })

        return () => {
            socket.off("messages_from_server")
        }
    }, [])
    if (readyToEnter) {
        return (
            <div className="container mx-auto space-y-1">
                <div className="top-[117px] space-y-1 space-x-2">
                    <input
                        className="placeholder:italic shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="join_room"
                        placeholder="room id"
                        onChange={(e) => setRoom(e.target.value)}
                    />

                    <button
                        className="px-4 py-1 text-xl text-blue-600 font-semibold rounded-xl border border-blue-200 hover:text-white hover:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                        type="submit"
                        id="join_room"
                        onClick={handleJoinRoom}
                    >
                        Join Room
                    </button>
                </div>
                <div className="chat-header">
                    <h3 className="font-extrabold  rounded-xl px-2 border to-gray-400 from-black text-3xl  w-60 inset-x-0 top-0">
                        Chat Room
                    </h3>
                </div>
                <div className="md:container xl:mx-auto  space-y-1 shadow border-blue-500 rounded border-2 w-30 h-80 bg-white overflow-y-auto ">
                    <h2 className="font-serif text-xl px-2 py-2 space-y-2 place-self-end">
                        {_message.map((Message) => (
                            <div className="border-zinc-800 rounded-md border-2 w-44   bg-blue-300 py-2 px-2">
                                {Message}
                            </div>
                        ))}
                    </h2>
                </div>

                <div className="space-y-1 space-x-2">
                    <input
                        className="placeholder:italic shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        type="text"
                        value={newMessage}
                        id="send_message"
                        placeholder="hey"
                        onChange={(e) => setNewMessage(e.target.value)}
                    />
                    <button
                        className="px-4 py-1 text-xl text-blue-600 font-semibold rounded-xl border border-blue-200 hover:text-white hover:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                        type="submit"
                        id="send_message"
                        onClick={handleSendMessage}
                    >
                        Send
                    </button>
                </div>
                <CloseChannel
                    signature={currentSignature}
                    message={newMessage}
                    signer={signer}
                    advisor={advisor}
                    contract={contract}
                    room={room}
                    socket={socket}
                />
            </div>
        )
    }
}

// see 18:30
