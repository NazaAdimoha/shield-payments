import { Header } from "@/components/layout/header"
// import { Navbar } from "@/components/navbar"
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