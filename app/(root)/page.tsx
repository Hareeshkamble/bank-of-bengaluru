import HeaderBox from '@/components/ui/HeaderBox'
import RighSidebar from '@/components/ui/RighSidebar'
import TotalBalenceBox from '@/components/ui/TotalBalenceBox'
import React from 'react'

export default function Home() {
  let loggedIn= {firstName: 'Hareesh',lastName: "Kamble",email: 'hareesh@gmail.com'}
  return (
    <section className='home'>
      <div className="home-content">
        <header className='home-header'>
          <HeaderBox
          type="greeting"
          title="Welcome"
          user={loggedIn?.firstName || "Guest"}
          subtext="Access and Manage your account and transactions efficiently"
          />
        <TotalBalenceBox
        accounts={[]}
        totalBanks={1}
        totalCurrentBalance={12500.53}
        />
        </header>
        RECENT transactions are
      </div>

      <RighSidebar   
      user={loggedIn}
      transactions={[]}
      banks={[{currentBalance:123.50},{currentBalance:3242.64}]}/>
    </section>
  )
}
