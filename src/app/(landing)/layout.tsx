import { Header } from "@/components/layout/header"

import { ReactNode } from "react"

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Header />
      {children}
    </>
  )
}

export default Layout