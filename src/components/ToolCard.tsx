import { Link } from 'react-router-dom'
import type { Tool } from '../tools/types'
import { ArrowIcon } from './icons'

interface Props {
  tool: Tool
  index: number
}

export function ToolCard({ tool, index }: Props) {
  const num = String(index + 1).padStart(2, '0')
  const comingSoon = tool.status === 'coming-soon'
  const Icon = tool.Icon

  const inner = (
    <>
      <div className="tool-card__top">
        <span className="tool-card__num">{num}</span>
        {tool.status !== 'stable' && (
          <span className={`pill pill--${tool.status}`}>
            {comingSoon ? 'Coming soon' : 'Beta'}
          </span>
        )}
      </div>

      <span className="tool-card__icon" aria-hidden="true">
        <Icon />
      </span>

      <h3 className="tool-card__name">{tool.name}</h3>
      <p className="tool-card__tagline">{tool.tagline}</p>

      <div className="tool-card__foot">
        <span className="tool-card__cat">{tool.category}</span>
        {!comingSoon && (
          <span className="tool-card__go">
            Open <ArrowIcon className="tool-card__arrow" />
          </span>
        )}
      </div>
    </>
  )

  if (comingSoon) {
    return (
      <div className="tool-card tool-card--soon" aria-disabled="true">
        {inner}
      </div>
    )
  }

  if (tool.href) {
    return (
      <a className="tool-card" href={tool.href} target="_blank" rel="noreferrer noopener">
        {inner}
      </a>
    )
  }

  return (
    <Link className="tool-card" to={`/tools/${tool.id}`}>
      {inner}
    </Link>
  )
}
