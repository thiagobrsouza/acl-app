import Link from "next/link";
import { Card } from "../../layout/Card";

export function ProfileForm() {

  return (
    <Card title="Add/Update an Profile" xxl="5" xl="5" lg="5" md="8" sm="10" xs="12">

      <form>

        <label htmlFor="" className="form-label">Name</label>
        <input type="text" className="form-control mb-3" />

        <button type="submit" className="mb-3 col-12 btn btn-primary">Submit</button>
        <Link href="/profiles" className="mb-3 col-12 btn btn-outline-info">
          Return to list
        </Link>
        
      </form>

    </Card>
  )
}