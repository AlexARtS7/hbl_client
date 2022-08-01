import inputValidation from "components/formsComponents/inputValidation"
import { useEffect, useState } from "react"

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [validErr, setValidErr] = useState('')
    
    useEffect(() => setValidErr(inputValidation(value, validations)),[value])

    return {
        value,
        setValue,
        setValidErr,
        validErr
    }
}

export default useInput
