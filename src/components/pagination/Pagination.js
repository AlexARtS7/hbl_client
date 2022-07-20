import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import './pagination.scss'

const Pagination = observer(() => {
    const {products} = useContext(Context)
    const pageCount = Math.ceil(products._totalCount / products._limit)
    const pages=[]
    for (let i = 0; i < pageCount; i++) { pages.push(i + 1) }

    return (
        <div className='pagination'>
            {pages.map(page => 
            <div 
                className={products._page === page ? 'pagination_block pagination_block_active':'pagination_block'} 
                key={page}
                onClick={() => products.setPage(page)}>
                {page}
            </div>
            )}
        </div>        
    )
})

export default Pagination