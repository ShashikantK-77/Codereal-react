
import Createstrategy from 'components/Strategy/Createstrategy'
import Filter from 'components/Strategy/Filter'
import MainStrategy from 'components/Strategy/MainStrategy'
import PageTitle from 'components/Typography/PageTitle'
import React from 'react'

const StrategyMaster = () => {
  return (
    <div>
    <PageTitle> Strategies </PageTitle>
    {/* <Createstrategy/> */}
    <Filter/>
    <MainStrategy/>

    </div>
  )
}

export default StrategyMaster