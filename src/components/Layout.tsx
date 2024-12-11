import { FC, PropsWithChildren } from 'react'

const Layout: FC<PropsWithChildren> = ({ children }) => {
  return (
    <div className="md:h-screen1 flex w-full grow flex-col items-center justify-center p-4">
      {children}
    </div>
  )
}

export default Layout
