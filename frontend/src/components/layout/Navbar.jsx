import Link from 'next/link'

export function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
      <div className="container-fluid">
        <Link href="/" className="navbar-brand">
          ACL App
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbar" aria-controls="navbar" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbar">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href="/profiles" className="nav-link">
                Profiles
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/cars" className="nav-link">
                Cars
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/users" className="nav-link">
                Users
              </Link>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}