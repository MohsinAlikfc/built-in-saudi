import { tools, liveTools } from '../tools'
import { ToolCard } from '../components/ToolCard'
import { SaduDivider } from '../components/SaduDivider'
import { ShieldIcon, BoltIcon, CodeIcon } from '../components/icons'
import { useDocumentMeta } from '../lib/useDocumentMeta'

export function HomePage() {
  useDocumentMeta()

  return (
    <>
      <section className="hero">
        <div className="wrap hero__inner">
          <p className="hero__kicker">
            <span lang="ar">بُنِيَ في السعودية</span>
            <span className="hero__kicker-sep">·</span>
            <span>BUILT IN SAUDI</span>
          </p>
          <h1 className="hero__title">
            Sharp little tools.
            <br />
            <em>No ads. No catch.</em>
          </h1>
          <p className="hero__lede">
            The everyday utilities you keep googling — QR codes, converters,
            generators — gathered into one honest toolbox. Free, fast, and
            private: nothing is uploaded, everything runs in your browser.
          </p>

          <ul className="hero__badges">
            <li><ShieldIcon /> Runs on your device</li>
            <li><BoltIcon /> No sign-up, no ads</li>
            <li><CodeIcon /> Open source</li>
          </ul>
        </div>
      </section>

      <SaduDivider className="sadu--hero" />

      <section className="catalog wrap" aria-labelledby="catalog-title">
        <div className="catalog__head">
          <h2 id="catalog-title" className="catalog__title">The toolbox</h2>
          <p className="catalog__count">
            {liveTools.length} live · {tools.length - liveTools.length} on the way
          </p>
        </div>

        <div className="tool-grid">
          {tools.map((tool, i) => (
            <ToolCard key={tool.id} tool={tool} index={i} />
          ))}
        </div>
      </section>
    </>
  )
}
