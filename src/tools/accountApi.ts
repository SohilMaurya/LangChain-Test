import accounts from "../data/accounts.json" with { type: "json" };

export interface Account {
  accountNumber: string;
  customerName: string;
  country: string;
  email: string;
  accountStatus: string;
}

export async function getAccount(accountNumber: string): Promise<Account | null> {
  return accounts.find((item) => item.accountNumber === accountNumber) ?? null;
}