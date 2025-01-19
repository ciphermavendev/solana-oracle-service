// programs/solana-oracle/src/lib.rs

use anchor_lang::prelude::*;

declare_id!("Your_Program_ID"); // You'll need to replace this with your program ID

#[program]
pub mod solana_oracle {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>) -> Result<()> {
        let oracle_account = &mut ctx.accounts.oracle_account;
        oracle_account.price = 0;
        oracle_account.last_update = Clock::get()?.unix_timestamp;
        Ok(())
    }

    pub fn update_price(ctx: Context<UpdatePrice>, new_price: u64) -> Result<()> {
        let oracle_account = &mut ctx.accounts.oracle_account;
        oracle_account.price = new_price;
        oracle_account.last_update = Clock::get()?.unix_timestamp;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = authority,
        space = 8 + 8 + 8 // discriminator + price + timestamp
    )]
    pub oracle_account: Account<'info, OracleData>,
    #[account(mut)]
    pub authority: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct UpdatePrice<'info> {
    #[account(mut)]
    pub oracle_account: Account<'info, OracleData>,
    pub authority: Signer<'info>,
}

#[account]
pub struct OracleData {
    pub price: u64,
    pub last_update: i64,
}