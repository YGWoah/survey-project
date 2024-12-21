import { AdminService } from '@app/services/admin/admin';
import { useEffect } from 'react';

const AdminDashBoard = () => {
  useEffect(() => {
    AdminService.getAdminResosurce().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div>
      <h1>Admin DashBoard</h1>
    </div>
  );
};

export default AdminDashBoard;
