const { task } = require("hardhat/config")

task("deploy-fundme").setAction(async (taskArgs, hre) => {
    // create factory
    const fundMeFactory = await ethers.getContractFactory("FundMe")
    console.log("contract depolying")
    // deploy contract from factory
    const fundMe = await fundMeFactory.deploy(10)
    await fundMe.waitForDeployment()
    console.log(" contract has been deployed successfully, contract address is " + fundMe.target)
    if (hre.network.config.chainId == 11155111) {
        console.log("verify contract")
    } {
        console.log("use local network not need verify contract")
    }
})
module.exports = {

}

