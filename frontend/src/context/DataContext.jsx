import { createContext, useContext, useReducer, useCallback } from 'react'
import { detectColumns, getAvailableFeatures } from '@/utils/columnDetector'
import { processData } from '@/utils/dataProcessor'

const DataContext = createContext(null)

const INITIAL = {
  status:   'idle', // idle | uploading | processing | ready | error
  fileName: null,
  rowCount: 0,
  columns:  {},
  features: {},
  metrics:  {},
  error:    null,
}

function reducer(state, action) {
  switch (action.type) {
    case 'UPLOAD_START':
      return { ...INITIAL, status: 'uploading', fileName: action.fileName }
    case 'PROCESSING':
      return { ...state, status: 'processing' }
    case 'READY':
      return { ...state, status: 'ready', ...action.payload, error: null }
    case 'ERROR':
      return { ...state, status: 'error', error: action.error }
    case 'RESET':
      return INITIAL
    default:
      return state
  }
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, INITIAL)

  const loadData = useCallback(async (rawRows, fileName) => {
    dispatch({ type: 'UPLOAD_START', fileName })
    // let React re-paint the uploading state first
    await new Promise(r => setTimeout(r, 80))
    dispatch({ type: 'PROCESSING' })
    await new Promise(r => setTimeout(r, 150))

    try {
      if (!rawRows.length) throw new Error('Empty dataset')
      const headers  = Object.keys(rawRows[0])
      const columns  = detectColumns(headers)
      const features = getAvailableFeatures(columns)
      const { metrics } = processData(rawRows, columns)

      dispatch({
        type: 'READY',
        payload: { columns, features, metrics, rowCount: rawRows.length },
      })
    } catch (err) {
      dispatch({ type: 'ERROR', error: String(err?.message ?? 'Unknown error') })
    }
  }, [])

  const reset = useCallback(() => dispatch({ type: 'RESET' }), [])

  return (
    <DataContext.Provider value={{ ...state, loadData, reset }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const ctx = useContext(DataContext)
  if (!ctx) throw new Error('useData must be used within <DataProvider>')
  return ctx
}
