interface Props { value: number }
export default function ReturnBadge({ value }: Props) {
  const isPos = value >= 0
  return (
    <span className={`num text-[11px] font-medium ${isPos ? 'text-accent-green' : 'text-accent-red'}`}>
      {isPos ? '+' : ''}{value.toFixed(1)}%
    </span>
  )
}
