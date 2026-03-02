import { useState, useCallback } from 'react'

export function useCollapsible(): {
  isCollapsed: (id: string) => boolean
  toggle: (id: string) => void
} {
  const [collapsed, setCollapsed] = useState<Set<string>>(new Set())

  const isCollapsed = useCallback((id: string): boolean => collapsed.has(id), [collapsed])

  const toggle = useCallback((id: string): void => {
    setCollapsed(prev => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }, [])

  return { isCollapsed, toggle }
}
