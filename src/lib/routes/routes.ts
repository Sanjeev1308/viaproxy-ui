import { adminRoute } from './admin.route';
import { ecoCitizenRoute } from './eco-citizen.route';
import { merchantRoute } from './merchant.route';
import { studentRoute } from './student.route';

export default function getRouteByRole(role: string) {
  if (role === 'student') {
    return studentRoute;
  } else if (role === 'merchat') {
    return merchantRoute;
  } else if (role === 'eco-citizen') {
    return ecoCitizenRoute;
  } else {
    return adminRoute;
  }
}
