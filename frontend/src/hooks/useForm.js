import { useEffect, useState } from "react"

export const useForm = (initialFields, cb = () => { }) => {

  const [fields, setFields] = useState(initialFields)

  useEffect(() => {
    cb(fields)
  }, [fields])

  const handleChange = ({ target }) => {
    var field = target.name
    var value = target.type === 'number' ? +target.value : target.value
    setFields(prevFields => ({ ...prevFields, [field]: value }))
    console.log(fields);
  }

  return [
    fields,
    handleChange,
    setFields
  ]
}