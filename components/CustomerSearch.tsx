'use client'

interface CustomerSearchProps {
  search: string
  industry: string
  status: string
  industries: string[]
  onSearch: (v: string) => void
  onIndustry: (v: string) => void
  onStatus: (v: string) => void
}

const selectStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#ffffff',
  padding: '8px 12px',
  fontSize: '12px',
  letterSpacing: '0.05em',
  outline: 'none',
  appearance: 'none',
  cursor: 'pointer',
  minWidth: 140,
}

const inputStyle: React.CSSProperties = {
  backgroundColor: '#1a1a1a',
  border: '1px solid rgba(255,255,255,0.08)',
  color: '#ffffff',
  padding: '8px 12px',
  fontSize: '13px',
  outline: 'none',
  width: '100%',
}

export default function CustomerSearch({
  search,
  industry,
  status,
  industries,
  onSearch,
  onIndustry,
  onStatus,
}: CustomerSearchProps) {
  return (
    <div className="flex flex-wrap gap-3 items-center">
      <div className="relative flex-1 min-w-48">
        <input
          type="text"
          placeholder="Sök kund, konsult eller bransch…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          style={inputStyle}
        />
        {search && (
          <button
            onClick={() => onSearch('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-xs"
            style={{ color: '#A0A0A0' }}
          >
            ✕
          </button>
        )}
      </div>

      <div className="relative">
        <select
          value={industry}
          onChange={(e) => onIndustry(e.target.value)}
          style={selectStyle}
        >
          <option value="">ALLA BRANSCHER</option>
          {industries.map((ind) => (
            <option key={ind} value={ind}>
              {ind.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div className="relative">
        <select
          value={status}
          onChange={(e) => onStatus(e.target.value)}
          style={selectStyle}
        >
          <option value="">ALLA STATUS</option>
          <option value="active">AKTIV</option>
          <option value="inactive">INAKTIV</option>
          <option value="paused">PAUSAD</option>
        </select>
      </div>

      {(search || industry || status) && (
        <button
          onClick={() => {
            onSearch('')
            onIndustry('')
            onStatus('')
          }}
          className="text-xs px-3 py-2 transition-colors"
          style={{
            color: '#C4847A',
            border: '1px solid rgba(196,132,122,0.4)',
            letterSpacing: '0.1em',
          }}
        >
          RENSA
        </button>
      )}
    </div>
  )
}
