// app/oracle-client.js

const anchor = require("@project-serum/anchor");
const { Connection, PublicKey, Keypair } = require("@solana/web3.js");

// Import the IDL (Interface Description Language)
const idl = require("../target/idl/solana_oracle.json");

async function main() {
    // Configure the connection to the network
    const connection = new Connection("http://localhost:8899", "confirmed");
    
    // Configure the client to use the local cluster
    const provider = new anchor.AnchorProvider(
        connection,
        // Setup default keypair if no wallet is provided
        new anchor.Wallet(Keypair.generate()),
        { commitment: "confirmed" }
    );
    
    // Create our program instance
    const programId = new PublicKey("Your_Program_ID"); // Replace with your program ID
    const program = new anchor.Program(idl, programId, provider);
    
    // Generate a new account for the oracle
    const oracleAccount = Keypair.generate();

    try {
        // Initialize the oracle
        console.log("Initializing oracle account...");
        await program.methods
            .initialize()
            .accounts({
                oracleAccount: oracleAccount.publicKey,
                authority: provider.wallet.publicKey,
                systemProgram: anchor.web3.SystemProgram.programId,
            })
            .signers([oracleAccount])
            .rpc();

        console.log("Oracle initialized successfully!");
        console.log("Oracle Account:", oracleAccount.publicKey.toString());

        // Update price (example: setting price to 50000000 for $500.00)
        console.log("\nUpdating price...");
        await program.methods
            .updatePrice(new anchor.BN(50000000))
            .accounts({
                oracleAccount: oracleAccount.publicKey,
                authority: provider.wallet.publicKey,
            })
            .rpc();

        console.log("Price updated successfully!");

        // Fetch the account data
        const accountData = await program.account.oracleData.fetch(oracleAccount.publicKey);
        console.log("\nCurrent oracle data:");
        console.log("Price:", accountData.price.toString());
        console.log("Last update:", new Date(accountData.lastUpdate * 1000).toISOString());

    } catch (err) {
        console.error("\nError:", err);
    }
}

// Helper function to create a new oracle feed
async function createNewOracleFeed(program, provider, label) {
    const oracleAccount = Keypair.generate();
    
    await program.methods
        .initialize()
        .accounts({
            oracleAccount: oracleAccount.publicKey,
            authority: provider.wallet.publicKey,
            systemProgram: anchor.web3.SystemProgram.programId,
        })
        .signers([oracleAccount])
        .rpc();
        
    return oracleAccount;
}

// Helper function to update oracle price
async function updateOraclePrice(program, provider, oracleAccount, price) {
    await program.methods
        .updatePrice(new anchor.BN(price))
        .accounts({
            oracleAccount: oracleAccount.publicKey,
            authority: provider.wallet.publicKey,
        })
        .rpc();
}

// Helper function to fetch oracle data
async function fetchOracleData(program, oraclePublicKey) {
    const accountData = await program.account.oracleData.fetch(oraclePublicKey);
    return {
        price: accountData.price.toString(),
        lastUpdate: new Date(accountData.lastUpdate * 1000)
    };
}

// Export helper functions for use in other files
module.exports = {
    createNewOracleFeed,
    updateOraclePrice,
    fetchOracleData
};

// Run the main function
if (require.main === module) {
    main().then(
        () => process.exit(),
        err => {
            console.error(err);
            process.exit(-1);
        },
    );
}