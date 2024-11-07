import HeaderBox from '@/components/ui/HeaderBox'
import PaymentTransferForm from '@/components/ui/PaymentTransferForm'
import { getAccounts } from '@/lib/actions/bank.actions';
import { getLoggedInUser } from '@/lib/actions/user.actions';
import React from 'react'

async function PaymentTransfer() {
  const loggedIn = await getLoggedInUser();
  const accounts = await getAccounts({ 
    userId: loggedIn.$id 
  })
  const accountsData=accounts?.data

  console.log("accountsss", accounts);
  if(!accounts) return;
  return (
<section className="payment-transfer">
  <HeaderBox title="payment Transfer"
  subtext='please porivide any specific details or notes related to the payment transfer '/>
  <section className="size-full pt-5">
<PaymentTransferForm
accounts={accountsData}
/>
  </section>
</section>
  )
}

export default PaymentTransfer