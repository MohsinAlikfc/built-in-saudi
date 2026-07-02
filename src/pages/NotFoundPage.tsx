import { Link } from 'react-router-dom'
import type { Tool } from '../tools/types'
import { useDocumentMeta } from '../lib/useDocumentMeta'

interface Props {
  kind?: 'not-found' | 'coming-soon'
  tool?: Tool
}

export function NotFoundPage({ kind = 'not-found', tool }: Props) {
  const soon = kind === 'coming-soon'
  useDocumentMeta(soon ? `${tool?.name} — coming soon` : 'Page not found')

  return (
    <div className="wrap message-page">
      <p className="message-page__code">{soon ? 'SOON' : '404'}</p>
      <h1 className="message-page__title">
        {soon ? `${tool?.name} is on the way` : 'Nothing here'}
      </h1>
      <p className="message-page__body">
        {soon
          ? 'This tool is on the roadmap and being built. Check back soon — or explore the ones that are ready today.'
          : 'That page could not be found. It may have moved, or never existed.'}
      </p>
      <Link to="/" className="btn btn--primary">Back to the toolbox</Link>
    </div>
  )
}
