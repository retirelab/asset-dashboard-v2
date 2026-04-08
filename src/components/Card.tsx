import { type ReactNode } from 'react'
interface Props { children: ReactNode; className?: string; accent?: 'none'|'warn'|'blue'|'green'; title?: string }
const accentBorder = { none:'border-surface-line', warn:'border-l-[3px] border-l-accent-amber border-y-0 border-r-0 rounded-l-none', blue:'border-l-[3px] border-l-accent-blue border-y-0 border-r-0 rounded-l-none', green:'border-l-[3px] border-l-accent-green border-y-0 border-r-0 rounded-l-none' }
export default function Card({ children, className='', accent='none', title }: Props) {
  return (
    <div className={`bg-surface-card rounded-[10px] border px-4 py-3 ${accentBorder[accent]} ${className}`}>
      {title && <div className="text-[10px] font-semibold tracking-wider uppercase text-ink-muted mb-3">{title}</div>}
      {children}
    </div>
  )
}
