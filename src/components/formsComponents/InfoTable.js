import React from 'react'
import { Table } from 'react-bootstrap'

const InfoTable = (props) => {
const {info, label} = props

  return (
    <>
        {info.length > 0 &&
            <Table striped>
                {label &&
                    <thead>
                        <tr><th>{label}</th></tr>
                    </thead>
                }                
                <tbody>
                    {info.map((info,i) => 
                        <tr key={i}>
                            <td>{info.title}</td>
                            <td className="text-end">{info.info}</td>
                        </tr>
                    )}                                        
                </tbody>
            </Table>   
        }
    </>
  )
}

export default InfoTable