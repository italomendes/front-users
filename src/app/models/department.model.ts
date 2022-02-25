import { CostCenter } from './cost-center.model';

export class Department {
  id: string;
  name: string;
  costCenter: CostCenter;

  constructor(data: any) {
    this.id = data.id;
    this.name = data.name;
    this.costCenter = data.costCenter;
  }
}
