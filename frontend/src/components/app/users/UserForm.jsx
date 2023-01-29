import Link from "next/link";
import { Card } from "../../layout/Card";

export function UserForm() {

  return (
    <Card title="Add/Update an User" xxl="5" xl="5" lg="5" md="8" sm="10" xs="12">

      <form>

        <label htmlFor="" className="form-label">Name</label>
        <input type="text" className="form-control mb-3" />

        <label htmlFor="" className="form-label">E-mail</label>
        <input type="text" className="form-control mb-3" />

        <label htmlFor="" className="form-label">Profile</label>
        <select className="form-select mb-3">
          <option>Select an profile</option>
        </select>

        <label htmlFor="" className="form-label">Password</label>
        <input type="password" className="form-control mb-3" />

        <label htmlFor="" className="form-label">Confirm password</label>
        <input type="password" className="form-control mb-3" />

        <button type="submit" className="mb-3 col-12 btn btn-primary">Submit</button>
        <Link href="/users" className="mb-3 col-12 btn btn-outline-info">
          Return to list
        </Link>
        
      </form>

    </Card>
  )
}