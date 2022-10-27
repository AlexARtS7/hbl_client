import React, { useEffect, useState } from 'react'
import { ArrowRight, CaretDownSquare, CaretRightSquare } from 'react-bootstrap-icons'
import './treeView.scss'

const TreeViewItem = (props) => {
  const {e, categories, vis = true} = props
  const [visible, setVisible] = useState(false)
  const children = categories.filter(i => i.categoryId === e.id)

  useEffect(() => {
    if(!vis) setVisible(vis)
  }, [vis])

  return (
    <ul>
      
      <li className={vis ? 'none':'collapse'} role='button' onClick={() => setVisible(!visible)}>
        {visible? <CaretDownSquare className='me-1'/>:<CaretRightSquare className='me-1'/>}
        {e.name}
      </li>
      {children.length > 0 && children.map((e,i) => <TreeViewItem key={i}  e={e} categories={categories} vis={visible}/>)}
    </ul>    
  )
}

export default TreeViewItem