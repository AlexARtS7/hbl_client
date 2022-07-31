import { Context } from "index"
import { observer } from "mobx-react-lite"
import React, { useContext } from "react"
import { Pagination } from "react-bootstrap";

const PagesPagination = observer(() => {
    const {products} = useContext(Context)
    const pageCount = Math.ceil(products.totalCount / products.limit)
    const pages=[]
    for (let i = 0; i < pageCount; i++) { pages.push(i + 1) }

    return (
        <Pagination className="d-flex justify-content-center mt-5">
            {pages.map(page => 
            <Pagination.Item
                active={products.page === page}
                key={page}
                onClick={() => products.setPage(page)}>
                {page}
            </Pagination.Item>
            )}
        </Pagination>        
    )
})

export default PagesPagination