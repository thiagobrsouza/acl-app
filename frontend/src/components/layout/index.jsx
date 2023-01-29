import { Navbar } from "./Navbar";

export function Layout({children}) {
  return (
    <>
      <Navbar />
      <div className="container mt-4">

        <div className="row justify-content-center">

          { children }

        </div>

      </div>
    </>
  )
}