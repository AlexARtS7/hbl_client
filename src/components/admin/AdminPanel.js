import React, { useEffect, useState } from "react"
import MainModal from "./MainModal"

const AdminPanel = ({setActive}) => {
    const [mainVisible, setMainVisible] = useState(true)

    useEffect(() => {
        if (!mainVisible) setMainVisible(true)
    }, [mainVisible])
    
    return (
        <>
        {mainVisible && <MainModal setActive={setMainVisible}/>}
        </>
    )
}

export default AdminPanel