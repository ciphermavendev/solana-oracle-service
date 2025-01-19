// app/price-feed-example.js

const anchor = require("@project-serum/anchor");
const { Connection, PublicKey } = require("@solana/web3.js");
const { createNewOracleFeed, updateOraclePrice, fetchOracleData } = require('./oracle-client.js');

async function runPriceFeed() {
    // Setup connection
    const connection = new Connection("http://localhost:8899", "confirmed");
    const provider = new anchor.AnchorProvider(
        connection,
        new anchor.Wallet(Keypair.generate()),
        { commitment: "confirmed" }
    );
    
    // Create program instance
    const programId = new PublicKey("Your_Program_ID"); // Replace with your program ID
    const program = new anchor.Program(idl, programId, provider);

    // Create a new oracle feed
    console.log("Creating new price feed...");
    const oracleAccount = await createNewOracleFeed(program, provider, "BTC/USD");
    console.log("Oracle feed created:", oracleAccount.publicKey.toString());

    // Simulate updating prices every 5 seconds
    setInterval(async () => {
        try {
            // Generate a mock price (this would be replaced with real price data)
            const mockPrice = Math.floor(Math.random() * 1000000); // Random price for demonstration
            
            // Update the price
            await updateOraclePrice(program, provider, oracleAccount, mockPrice);
            
            // Fetch and display the updated data
            const data = await fetchOracleData(program, oracleAccount.publicKey);
            console.log(`\nPrice updated at ${data.lastUpdate}`);
            console.log(`Current price: $${parseInt(data.price) / 100}`);
            
        } catch (err) {
            console.error("Error updating price:", err);
        }
    }, 5000);
}

// Run the price feed
runPriceFeed().catch(console.error);