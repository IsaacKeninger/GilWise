import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid';
import 'dotenv/config';

const config = new Configuration({
    basePath: PlaidEnvironments.sandbox!,
    baseOptions: {
        headers: {
            'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID!,
            'PLAID-SECRET': process.env.PLAID_SECRET!,
        }
    }
});

const plaid = new PlaidApi(config)

async function getAllInfo() {

    console.log('BALANCES')
    const balanceResult = await plaid.accountsBalanceGet({
        access_token: process.env.PLAID_ACCESS_TOKEN!,
    });

    balanceResult.data.accounts.forEach(account => {
        console.log(`${account.name} — Current: $${account.balances.current} | Available: $${account.balances.available}`);
    })

    console.log("TRANSACTIONS")
    const transactionsResult = await plaid.transactionsGet({
        access_token: process.env.PLAID_ACCESS_TOKEN!,
        start_date: "2026-05-01",
        end_date: "2026-05-30"
    });

    transactionsResult.data.transactions.forEach(t => {
        console.log(`${t.date} | ${t.merchant_name || t.name} | $${t.amount} | ${t.personal_finance_category?.primary}`);
    });
}

getAllInfo()