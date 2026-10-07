import { useEffect, useRef } from 'react'

export default function Cursor() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    const move = e => { el.style.left = e.clientX + 'px'; el.style.top = e.clientY + 'px' }
    const over = () => el.classList.add('hover')
    const out  = () => el.classList.remove('hover')
    document.addEventListener('mousemove', move)
    const attach = () => {
      document.querySelectorAll('a,button,.hoverable').forEach(n => {
        n.addEventListener('mouseenter', over)
        n.addEventListener('mouseleave', out)
      })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => { document.removeEventListener('mousemove', move); obs.disconnect() }
  }, [])
  return <div ref={ref} className="cursor" />
}
