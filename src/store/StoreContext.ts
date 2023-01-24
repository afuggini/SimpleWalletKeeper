import { Dispatch, createContext } from 'react'

const context = createContext<[any, Dispatch<any>]>([null, () => {}])

export default context
