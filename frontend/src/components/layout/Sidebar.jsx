import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Users, PieChart, Sparkles, BarChart3,
  Zap, ChevronRight, CheckCircle2, Upload,
} from 'lucide-react'
import clsx from 'clsx'
import { useData } from '@/context/DataContext'

const NAV = [
  { to: '/dashboard',       icon: LayoutDashboard, label: 'Dashboard'       },
  { to: '/customers',       icon: Users,           label: 'Customers'       },
  { to: '/segmentation',    icon: PieChart,        label: 'Segmentation'    },
  { to: '/recommendations', icon: Sparkles,        label: 'Recommendations' },
  { to: '/insights',        icon: BarChart3,       label: 'Insights'        },
]

export default function Sidebar() {
  const { status, fileName, rowCount } = useData()
  const dataReady = status === 'ready'

  return (
    <aside className="fixed inset-y-0 left-0 z-30 flex w-60 flex-col
                       bg-gradient-to-b from-brand-900 via-brand-800 to-brand-950
                       shadow-2xl select-none">

      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-6 border-b border-white/10">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl
                        bg-gradient-to-br from-brand-400 to-purple-500 shadow-glow">
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <p className="text-white font-display font-bold text-lg leading-none">InsightX</p>
          <p className="text-brand-300 text-[11px] mt-0.5 font-medium tracking-wide">
            Customer Intelligence
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-3 py-5 scrollbar-thin space-y-1">
        <p className="px-3 text-[10px] font-bold tracking-widest text-brand-400 uppercase mb-3">
          Main Menu
        </p>
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              clsx('sidebar-link group', isActive && 'sidebar-link-active')
            }
          >
            {({ isActive }) => (
              <>
                <span className={clsx(
                  'flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-150',
                  isActive
                    ? 'bg-brand-500 shadow-glow'
                    : 'bg-white/5 group-hover:bg-white/10',
                )}>
                  <Icon size={15} />
                </span>
                <span className="flex-1 text-sm">{label}</span>
                {isActive && (
                  <ChevronRight size={13} className="text-brand-300 opacity-70" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer — dataset status */}
      <div className="px-4 pb-5 pt-3 border-t border-white/10">
        <div className="rounded-xl bg-white/5 p-3">
          {dataReady ? (
            <>
              <div className="flex items-center gap-1.5 mb-1">
                <CheckCircle2 size={11} className="text-emerald-400" />
                <p className="text-emerald-300 text-[10px] font-bold uppercase tracking-wide">Data Loaded</p>
              </div>
              <p className="text-white text-xs font-semibold truncate">{fileName}</p>
              <p className="text-brand-400 text-[10px] mt-1">{rowCount.toLocaleString()} rows processed</p>
              <div className="mt-2 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-full rounded-full bg-gradient-to-r from-emerald-400 to-brand-400" />
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5 mb-1">
                <Upload size={11} className="text-brand-400" />
                <p className="text-brand-400 text-[10px] font-bold uppercase tracking-wide">No Dataset</p>
              </div>
              <p className="text-brand-300 text-[10px]">Go to Dashboard to upload</p>
              <div className="mt-2 h-1 w-full rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-0 rounded-full bg-gradient-to-r from-brand-400 to-purple-400" />
              </div>
            </>
          )}
        </div>
      </div>
    </aside>
  )
}
