import Link from 'next/link'
import { Card } from '../../layout/Card'
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { useProfileService } from '../../../services/ProfileService'
import { useState } from 'react';
import { useEffect } from 'react';

export function ProfileList() {

  const service = useProfileService();
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    service.findAll().then(response => {
      setProfiles(response.data);
    })
  }, []);

  function selectProfile(profile) {
    console.log(profile);
  }

  function actions(profile) {
    return (
      <div>
        <Button icon="pi pi-pencil" className="ms-2 p-button-rounded" onClick={e => selectProfile(profile)} />
        <Button icon="pi pi-trash" className="ms-2 p-button-rounded p-button-danger" />
      </div>
    )
  }

  return (
    <Card title="Profiles List">

      <Link href="/profiles/add" className="btn btn-success mb-3">New Profile</Link>

      <DataTable paginator rows={10} rowsPerPageOptions={[10, 15, 20]} rowHover value={profiles} 
      responsiveLayout="scroll" size="small">
        <Column header="Name" field="name" />
        <Column header="Actions" body={actions} />
      </DataTable>

    </Card>
  )
}