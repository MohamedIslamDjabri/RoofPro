import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const update = () => {
      setIsMobile(mql.matches)
    }
    const timer = setTimeout(update, 0)
    mql.addEventListener("change", update)
    return () => {
      clearTimeout(timer)
      mql.removeEventListener("change", update)
    }
  }, [])

  return isMobile
}
