//import { relativeTimeRounding } from "moment"
import React from "react"
//import { useDisconnect } from "wagmi"


function Abort({ contract,provider }) {
    //const { disconnect } = useDisconnect()
    

    function handleAbort() {
        contract.abort({ gasLimit: 200000 })
        //disconnect()
        
        window.location.reload()

       
    }
    return (
        <div>
            <button
                className="px-4 py-1 text-xl text-blue-600 font-semibold rounded-xl
            border border-blue-200 hover:text-white hover:bg-black
            hover:border-transparent focus:outline-none focus:ring-2
            focus:ring-blue-600 focus:ring-offset-2"
                onClick={handleAbort} 
            >
                Abort
            </button>
        </div>
    )
}

export default Abort
