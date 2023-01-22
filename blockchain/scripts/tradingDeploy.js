const main = async() => {
    const contractFactory = await ethers.getContractFactory("Trader");
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log("Contract deployed on address: ", contract.address);
}

const runMain = async() => {
    try{
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();