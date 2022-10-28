import React, { useEffect, useState } from 'react'
import { ArrowReturnRight, ArrowRight, CaretDownSquare, CaretRightSquare, ChevronDown, ChevronRight, JournalMinus, JournalPlus } from 'react-bootstrap-icons'
import './treeView.scss'

const TreeViewItem = (props) => {
  const {e, categories, vis = true, onHide} = props
  const [visible, setVisible] = useState(false)
  const children = categories.filter(i => i.categoryId === e.id)

  const onTreeClick = (elem) => {
    elem.stopPropagation()
    setVisible(!visible)
  }

  useEffect(() => {
    if(!vis) setVisible(vis)
  }, [vis])

  return (
    <ul>
      <li className={vis ? 'none':'collapse'} role='button' onClick={onHide}>
        {categories.find(i => i.categoryId === e.id) ?
          <span className='me-2' onClick={elem => onTreeClick(elem)}>{visible? <ChevronDown/>:<ChevronRight/>}</span>
          :
          <ArrowReturnRight className='me-2'/>}
        {e.name}
      </li>
      {children.length > 0 && children.map((e,i) => <TreeViewItem key={i}  e={e} categories={categories} vis={visible} onHide={onHide}/>)}
    </ul>    
  )
}

export default TreeViewItem