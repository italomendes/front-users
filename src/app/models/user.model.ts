import { Department } from './department.model';
import { Role } from './role.model';

export class User {
  id: string;
  name: string;
  username: string;
  department: Department;
  role: Role;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.username = data.username;
    this.department = data.department;
    this.role = data.role;
  }
}
