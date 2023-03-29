import { useState } from "react"

function HandleAdvisors({ contract, signer, owner }) {
    const [addAdvisor, setAddAdvisor] = useState("")
    const [removeAdvisor, setRemoveAdvisor] = useState("")

    async function handleAddAdvisors() {
        contract.addAdvisor(addAdvisor, { from: signer })
        setAddAdvisor("")
    }

    async function handleRemoveAdvisors() {
        contract.removeAdvisor(removeAdvisor, { from: signer })
        setRemoveAdvisor("")
    }
    if (signer === owner) {
        return (
            <div className="space-y-1">
                <div className="space-y-1 space-x-2">
                    <input
                        className="placeholder:italic shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="address"
                        value={addAdvisor}
                        id="adding"
                        onChange={(e) => setAddAdvisor(e.target.value)}
                    />
                    <button
                        className="px-4 py-1 text-xl text-blue-600 font-semibold rounded-xl border border-blue-200 hover:text-white hover:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                        id="adding"
                        onClick={handleAddAdvisors}
                    >
                        Add Advisor
                    </button>
                </div>
                <div className="space-y-1 space-x-2">
                    <input
                        className="placeholder:italic shadow appearance-none border rounded w-auto py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        placeholder="address"
                        value={removeAdvisor}
                        id="removing"
                        onChange={(e) => setRemoveAdvisor(e.target.value)}
                    />
                    <button
                        className="px-4 py-1 text-xl text-blue-600 font-semibold rounded-xl border border-blue-200 hover:text-white hover:bg-black hover:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
                        id="removing"
                        onClick={handleRemoveAdvisors}
                    >
                        Remove Advisor
                    </button>
                </div>
            </div>
        )
    }
}

export default HandleAdvisors
