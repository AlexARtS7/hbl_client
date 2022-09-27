import React, { useEffect } from "react"
import { Pagination } from "react-bootstrap";
import "./pagination.scss";

const PagesPagination = ({store}) => {
    const pageCount = Math.ceil(store.totalCount / store.limit)
    const pages=[]
    for (let i = 0; i < pageCount; i++) { pages.push(i + 1) }

    useEffect(() => {
        if(store.page > pageCount && pageCount > 0) store.setPage(pageCount)
    }, [pageCount])

    return (
        <Pagination className="d-flex justify-content-center mt-5">
            {pages.length > 1 && pages.map(page => 
            <Pagination.Item
                active={store.page === page}
                key={page}
                onClick={() => store.setPage(page)}>
                {page}
            </Pagination.Item>
            )}
        </Pagination>        
    )
}

export default PagesPagination