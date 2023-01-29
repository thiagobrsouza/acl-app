import Link from 'next/link'
import { Card } from '../../layout/Card'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export function CarList() {

  function actions() {
    return (
      <div>
        <Button icon="pi pi-pencil" className="ms-2 p-button-rounded" />
        <Button icon="pi pi-trash" className="ms-2 p-button-rounded p-button-danger" />
      </div>
    )
  }

  return (
    <Card title="Cars List">

      <Link href="/cars/add" className="btn btn-success mb-3">New Car</Link>

      <DataTable paginator rows={10} rowsPerPageOptions={[10, 15, 20]} rowHover>
        <Column header="Model" />
        <Column header="Manufacturer" />
        <Column header="Price" />
        <Column header="Manager" />
        <Column header="Actions" body={actions} />
      </DataTable>

    </Card>
  )
}