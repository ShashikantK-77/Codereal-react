import React from 'react'
import {
    Card,
    CardBody,
    Input,
    Pagination,
    Table,
    TableCell,
    TableContainer,
    TableFooter,
    TableHeader,
  } from "@windmill/react-ui";
import Strategy from './Strategy';
import Createstrategy from './Createstrategy';


const MainStrategy = () => {
  return (
    <div>
     <Card className="min-w-0 shadow-xs overflow-hidden bg-white dark:bg-gray-800 mb-5">
        <CardBody>
       <Strategy/>
        </CardBody>
      </Card>
    </div>
  )
}

export default MainStrategy