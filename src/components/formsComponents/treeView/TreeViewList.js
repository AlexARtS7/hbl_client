import { Context } from 'index'
import React, { useContext } from 'react'
import { ListGroup } from 'react-bootstrap'
import './treeView.scss'
import TreeViewItem from './TreeViewItem'

export default function TreeViewList(props) {
  const {onHide, mode} = props
  const {products} = useContext(Context)
  const categories = products.categories

  return (
    <ListGroup variant="flush">
      {categories.filter(e => !e.categoryId).map((e,i) => 
      <ListGroup.Item as='ul' key={i}>
        <TreeViewItem  e={e} categories={categories} onHide={onHide} products={products} mode={mode}/>
      </ListGroup.Item>)}      
    </ListGroup>
  )
}
