import Component from './component.jsx'
import {
  React,
  useState,
} from '@/component/management-panel/import-management.js'

function afterSalesService() {
    const [type,setType]=useState(2)
    return (
      <>
      <Component type={type} relationshipType={2}/>
      </>
    )
}

export default afterSalesService