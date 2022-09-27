import formsValidation from "components/formsComponents/formsValidation"
import { useEffect, useState } from "react"

const useInput = (initialValue, validations) => {
    const [value, setValue] = useState(initialValue)
    const [validErr, setValidErr] = useState('')

    useEffect(() => setValidErr(formsValidation(value, validations)),[value])

    return {
        value,
        validErr,
        setValue,
        setValidErr
    }
}

export default useInput
