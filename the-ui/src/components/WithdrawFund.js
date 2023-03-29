import React from "react"
//import { ethers } from "ethers"

function WithdrawFund({ contract, signer, advisor, owner }) {
    console.log(`advisor is : ${advisor}`)
    function handleWithdraw() {
        contract.withdraw({ from: signer, gasLimit: 200000})   // chaged here
    }

    if(signer === owner){
        return (
            <div>
                <button
                    className="px-4 py-1 text-xl text-blue-600 font-semibold rounded-xl border border-blue-200 hover:text-white hover:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                    onClick={handleWithdraw}
                >
                    Withdraw
                </button>
            </div>
        )
    }
    
}

export default WithdrawFund
