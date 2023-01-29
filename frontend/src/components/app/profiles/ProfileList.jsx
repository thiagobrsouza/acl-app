import Link from 'next/link'
import { Card } from '../../layout/Card'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export function ProfileList() {

  function actions() {
    return (
      <div>
        <Button icon="pi pi-pencil" className="ms-2 p-button-rounded" />
        <Button icon="pi pi-trash" className="ms-2 p-button-rounded p-button-danger" />
      </div>
    )
  }

  return (
    <Card title="Profiles List">

      <Link href="/profiles/add" className="btn btn-success mb-3">New Profile</Link>

      <DataTable paginator rows={10} rowsPerPageOptions={[10, 15, 20]} rowHover>
        <Column header="Name" />
        <Column header="Actions" body={actions} />
      </DataTable>

    </Card>
  )
}