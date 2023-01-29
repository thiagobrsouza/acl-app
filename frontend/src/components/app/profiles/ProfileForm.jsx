import Link from "next/link";
import { Card } from "../../layout/Card";
import { usePermissionService } from '../../../services/PermissionService'
import { useProfileService } from '../../../services/ProfileService'
import { useState } from "react";
import { useEffect } from "react";
import { ToastContainer } from 'react-toastify';

export function ProfileForm() {

  const permissionService = usePermissionService();
  const service = useProfileService();

  const [permissions, setPermissions] = useState([]);
  const [profile, setProfile] = useState({
    name: '', permissions: []
  });

  useEffect(() => {
    permissionService.findAll().then(response => {
      setPermissions(response.data);
    })
  }, []);

  function handleInput(e) {
    const { id, value } = e.target;
    setProfile({...profile, [id]: value });
  }

  function handleCheck(permission) {
    setProfile({...profile, permissions: profile.permissions.includes(permission.id) ? 
      profile.permissions.filter(p => p !== permission.id) : [...profile.permissions, permission.id]
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    console.log(profile);
    service.create(profile);
  }

  return (
    <Card title="Add/Update an Profile" xxl="5" xl="5" lg="5" md="8" sm="10" xs="12">

      <form onSubmit={handleSubmit}>

        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control mb-3" id="name" value={profile.name} onChange={handleInput} />

        <h5 className="mb-3">Select one or more permissions:</h5>

        {
          permissions.map(permission => (
            <div className="form-check">
              <input type="checkbox" className="form-check-input mb-3" id={`permission-${permission.id}`}
              value={permission.id} onChange={() => handleCheck(permission)} />
              <label className="form-check-label mb-3" htmlFor={`permission-${permission.id}`}>{permission.name}</label>
            </div>

          ))
        }

        <button type="submit" className="mb-3 col-12 btn btn-primary">Submit</button>
        <Link href="/profiles" className="mb-3 col-12 btn btn-outline-info">
          Return to list
        </Link>

      </form>

      <ToastContainer />

    </Card>
  )
}