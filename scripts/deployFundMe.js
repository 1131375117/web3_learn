//import ethers.js
//create main function
//execute main function 
const { ethers } = require("hardhat")
// npx hardhat run .\scripts\deployFundMe.js
async function main() { 
    // create factory
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    console.log("contract depolying")
    // deploy contract from factory
    const fundMe = await fundMeFactory.deploy(10)
    await fundMe.waitForDeployment()
    console.log(" contract has been deployed successfully, contract address is "+ fundMe.target)
    if (hre.network.config.chainId == 11155111) { 
        console.log("verify contract")
    } { 
        console.log("use local network not need verify contract")
    }
    //init 2 accounts 
    const [firstaccount,secondAccount] = await ethers.getSigners()
    //fund contract with first account
   const fundTx = await fundMe.fund({value:ethers.parseEther("0.5")})
    await fundTx.wait()
    //check balance of contract
    const balanceContract = await ethers.provider.getBalance(fundMe.target)
    console.log("balance of the contract is " + balanceContract)
    
    //fund contract with second account
    const fundTxSecondAccount = await fundMe.connect(secondAccount).fund({ value: ethers.parseEther("0.5") })
    await fundTxSecondAccount.wait()
    //check balance of contract
    const balanceContractSecondAccount = await ethers.provider.getBalance(fundMe.target)
    console.log("balance of the contract is " + balanceContractSecondAccount)

    //check Mapping account
    const firstaccountFundMe  = await fundMe.fundersToAmount(firstaccount.address)
    const secondAccountFundMe = await fundMe.fundersToAmount(secondAccount.address)
}
    

main().then().catch((error) => {
    console.error(error)
    process.exit(1)
 })