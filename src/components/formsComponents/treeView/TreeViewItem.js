import React, { useEffect, useState } from 'react'
import { ArrowReturnRight, ChevronDown, ChevronRight} from 'react-bootstrap-icons'
import './treeView.scss'

export default React.memo(function TreeViewItem(props) {
  const {e, categories, vis = true, onHide, products} = props
  const [visible, setVisible] = useState(false)
  const children = categories.filter(i => i.categoryId === e.id)

  const onCategoryClick = (e) => {
    products.setSelectedCategory(e)
    onHide()
  }
 
  const onTreeClick = (elem) => {
    elem.stopPropagation()
    setVisible(!visible)
  }

  useEffect(() => {
    if(!vis) setVisible(vis)
  }, [vis])

  return (
    <ul>
      <li className={vis ? 'none':'collapse'} role='button' onClick={() => onCategoryClick(e)}>
        {categories.find(i => i.categoryId === e.id) ?
          <span className='me-2' onClick={elem => onTreeClick(elem)}>{visible? <ChevronDown/>:<ChevronRight/>}</span>
          :
          <ArrowReturnRight className='me-2'/>}
        {e.name}
      </li>
      {children.length > 0 && children.map((e,i) => 
        <TreeViewItem key={i}  e={e} categories={categories} vis={visible} onHide={onHide} products={products}/>)}
    </ul>    
  )
}, 
(prev, next) => {
  if(prev.vis !== next.vis) {
    return false 
  } else {
    return true
  }
})