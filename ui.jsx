// Small shared pieces used across sections.

export function SectionHead({ id, kicker, title, children }) {
  return (
    <div className="shead">
      <p className="shead__kicker">{kicker}</p>
      <h2 id={id} className="shead__title">
        {title}
      </h2>
      {children ? <p className="shead__sub">{children}</p> : null}
    </div>
  )
}

export function StatusChip({ status }) {
  return <span className={status === 'Complete' ? 'chip chip--done' : 'chip chip--wip'}>{status}</span>
}

export function Loot({ items, label = 'Loot' }) {
  return (
    <p className="loot">
      {label ? <span className="loot__label">{label}</span> : null}
      {items.map((t) => (
        <span key={t} className="loot__item">
          {t}
        </span>
      ))}
    </p>
  )
}

// Opens a project page from a normal link, so right-click / new tab also work.
export function projectLink(id, onOpen) {
  return {
    href: `#${id}`,
    onClick: (e) => {
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button === 1) return
      e.preventDefault()
      onOpen(id, e.currentTarget)
    },
  }
}

export const TAB_COLOURS = ['#f7c65f', '#86d6df', '#ffa3a3', '#98dfb5']
