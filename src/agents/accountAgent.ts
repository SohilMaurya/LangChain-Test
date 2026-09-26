import type { SupportStateType } from "../graph/state.js";
import { getAccount } from "../tools/accountApi.js";

export async function accountAgent(state: SupportStateType) {
  if (!state.accountNumber) {
    return { context: "No account number was provided. Ask the customer for their account number." };
  }

  const account = await getAccount(state.accountNumber);

  if (!account) {
    return { context: `No account was found for ${state.accountNumber}.` };
  }

  return {
    context: `
Account Information:
Account Number: ${account.accountNumber}
Customer Name: ${account.customerName}
Country: ${account.country}
Email: ${account.email}
Account Status: ${account.accountStatus}
`
  };
}