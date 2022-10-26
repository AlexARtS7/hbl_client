import { Context } from 'index'
import React, { useContext, useState } from 'react'
import { ListGroup } from 'react-bootstrap'
import './treeView.scss'

const ListGroupAdds = (props) => {
  const {e, categories, vis = true} = props
  const [visible, setVisible] = useState(false)
  const children = categories.filter(i => i.categoryId === e.id)

  return (
    <ul>
      <li className={!vis && 'collapse'} onClick={() => setVisible(!visible)}>{e.name}</li>
      {children.length > 0 && children.map((e,i) => <ListGroupAdds key={i}  e={e} categories={categories} vis={visible}/>)}
    </ul>    
  )
}

const TreeViewList = () => {
  const {products} = useContext(Context)
  const categories = products.categories

  return (
    <ListGroup variant="flush">
      {categories.filter(e => !e.categoryId).map((e,i) => <ListGroupAdds key={i} e={e} categories={categories}/>)}
      {/* <ListGroup.Item > */}
      {/* <div onClick={() => setTrriger(!trigger)}>dfeevvecw</div>
      <div className={trigger?'ms-3':'collapse'}>fgdgd</div>
      <div className={trigger?'ms-3':'collapse'}>fgdgd</div>
      <div className={trigger?'ms-3':'collapse'} onClick={() => setTrriger(!trigger)}>dfeevvecw</div> */}
    
  
      {/* </ListGroup.Item> */}
      
    </ListGroup>
  )
}

export default TreeViewList