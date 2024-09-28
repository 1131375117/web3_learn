const { task } = require("hardhat/config")
task("interact-fundme")
    .addParam("addr", "fundme contract address")
    .setAction(async (taskArgs, hre) => {
        const fundMeFactory = await ethers.getContractFactory("fundme")
        const fundme = fundMeFactory.attach(taskArgs.addr)
    //init 2 accounts 
    const [firstaccount, secondAccount] = await ethers.getSigners()
    //fund contract with first account
   const fundTx = await fundMe.fund({ value: ethers.parseEther("0.5") })
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
    const firstaccountFundMe = await fundMe.fundersToAmount(firstaccount.address)
    const secondAccountFundMe = await fundMe.fundersToAmount(secondAccount.address)
})
module.exports = {}