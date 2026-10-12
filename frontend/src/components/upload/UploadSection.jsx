import { useState, useRef, useCallback } from 'react'
import { Upload, FileSpreadsheet, X, AlertCircle, CheckCircle2 } from 'lucide-react'
import Papa from 'papaparse'
import * as XLSX from 'xlsx'
import { useData } from '@/context/DataContext'

const ACCEPT = '.csv,.xlsx,.xls'
const MAX_MB = 50

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 ** 2) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 ** 2).toFixed(1)} MB`
}

export default function UploadSection() {
  const { loadData, status } = useData()
  const [drag, setDrag] = useState(false)
  const [localError, setLocalError] = useState('')
  const inputRef = useRef(null)

  const handleFile = useCallback(async (file) => {
    setLocalError('')
    if (!file) return

    const ext = file.name.split('.').pop().toLowerCase()
    if (!['csv', 'xlsx', 'xls'].includes(ext)) {
      setLocalError('Unsupported file type. Please upload a CSV or Excel file.')
      return
    }
    if (file.size > MAX_MB * 1024 * 1024) {
      setLocalError(`File too large. Maximum size is ${MAX_MB} MB.`)
      return
    }

    try {
      if (ext === 'csv') {
        Papa.parse(file, {
          header: true,
          skipEmptyLines: true,
          dynamicTyping: false,
          complete: ({ data, errors }) => {
            if (!data.length) { setLocalError('CSV file is empty or has no valid rows.'); return }
            loadData(data, file.name)
          },
          error: (err) => setLocalError(`CSV parse error: ${err.message}`),
        })
      } else {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const wb   = XLSX.read(e.target.result, { type: 'array' })
            const ws   = wb.Sheets[wb.SheetNames[0]]
            const data = XLSX.utils.sheet_to_json(ws, { defval: '' })
            if (!data.length) { setLocalError('Excel file is empty or has no valid rows.'); return }
            loadData(data, file.name)
          } catch (err) {
            setLocalError(`Excel parse error: ${err.message}`)
          }
        }
        reader.onerror = () => setLocalError('Failed to read file.')
        reader.readAsArrayBuffer(file)
      }
    } catch (err) {
      setLocalError(`Unexpected error: ${err.message}`)
    }
  }, [loadData])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDrag(false)
    const file = e.dataTransfer.files[0]
    handleFile(file)
  }, [handleFile])

  const onDragOver = (e) => { e.preventDefault(); setDrag(true) }
  const onDragLeave = () => setDrag(false)
  const onInputChange = (e) => handleFile(e.target.files[0])

  const busy = status === 'uploading' || status === 'processing'

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
      <div className="w-full max-w-xl animate-slide-up">

        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl
                          bg-gradient-to-br from-brand-500 to-purple-600 shadow-glow mb-4">
            <Upload size={28} className="text-white" />
          </div>
          <h2 className="font-display font-bold text-2xl text-slate-800 mb-2">
            Upload Your Dataset
          </h2>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            Upload any e-commerce CSV or Excel file. Column names are auto-detected —
            works with Online Retail II and similar datasets.
          </p>
        </div>

        {/* Drop zone */}
        {!busy ? (
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onClick={() => inputRef.current?.click()}
            className={`relative border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer
                        transition-all duration-200 group
                        ${drag
                          ? 'border-brand-400 bg-brand-50 scale-[1.01]'
                          : 'border-slate-200 bg-slate-50/60 hover:border-brand-300 hover:bg-brand-50/40'}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPT}
              onChange={onInputChange}
              className="sr-only"
            />
            <div className={`flex h-14 w-14 items-center justify-center rounded-xl mx-auto mb-4
                             transition-all ${drag ? 'bg-brand-100 scale-110' : 'bg-slate-100 group-hover:bg-brand-100'}`}>
              <FileSpreadsheet size={26} className={drag ? 'text-brand-600' : 'text-slate-400 group-hover:text-brand-500'} />
            </div>
            <p className="font-semibold text-slate-700 mb-1">
              {drag ? 'Drop your file here' : 'Drag & drop your file'}
            </p>
            <p className="text-sm text-slate-400 mb-4">or click to browse</p>
            <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600
                             text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm">
              CSV · XLSX · XLS &nbsp;·&nbsp; Max {MAX_MB} MB
            </span>
          </div>
        ) : (
          /* Processing state */
          <div className="border-2 border-brand-200 rounded-2xl p-10 text-center bg-brand-50/40 animate-pulse-slow">
            <div className="relative flex h-16 w-16 items-center justify-center mx-auto mb-4">
              <div className="absolute inset-0 rounded-full border-4 border-brand-200" />
              <div className="absolute inset-0 rounded-full border-4 border-t-brand-600 animate-spin" />
              <FileSpreadsheet size={24} className="text-brand-600 relative z-10" />
            </div>
            <p className="font-semibold text-brand-700 mb-1">
              {status === 'uploading' ? 'Reading file…' : 'Processing dataset…'}
            </p>
            <p className="text-sm text-brand-400">
              Detecting columns, computing metrics, building segments
            </p>
          </div>
        )}

        {/* Error */}
        {localError && (
          <div className="mt-4 flex items-start gap-3 bg-red-50 border border-red-100 rounded-xl px-4 py-3">
            <AlertCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm text-red-600 font-medium">{localError}</p>
            </div>
            <button onClick={() => setLocalError('')}>
              <X size={14} className="text-red-400 hover:text-red-600" />
            </button>
          </div>
        )}

        {/* Tips */}
        <div className="mt-6 rounded-xl bg-white border border-slate-100 p-4 space-y-2">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Recommended Datasets
          </p>
          {[
            { label: 'Online Retail II (UCI)', url: 'https://archive.ics.uci.edu/dataset/502/online+retail+ii' },
            { label: 'Any CSV with customer & product columns', url: null },
          ].map(tip => (
            <div key={tip.label} className="flex items-center gap-2">
              <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0" />
              {tip.url ? (
                <a href={tip.url} target="_blank" rel="noopener noreferrer"
                   className="text-xs text-brand-600 hover:underline">{tip.label}</a>
              ) : (
                <span className="text-xs text-slate-500">{tip.label}</span>
              )}
            </div>
          ))}
        </div>

      </div>
    </div>
  )
}
