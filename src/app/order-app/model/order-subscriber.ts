export class OrderSubscriber {

  id: number;
  name: string;
  address: string;
  sector: string;
  group: string;
  area: string;
  block: string;
  state: string;
  branch: string;
  nationalId: string;
  phoneNumber: string;
  facilityName: string;
  balance: number;
  secondPhoneNumber: string;

  constructor(orderSubscriber: any) {
    this.id = orderSubscriber.id;
    this.name = orderSubscriber.name;
    this.address = orderSubscriber.address;
    this.sector = orderSubscriber.sector;
    this.group = orderSubscriber.group;
    this.area = orderSubscriber.area;
    this.block = orderSubscriber.block;
    this.state = orderSubscriber.state;
    this.branch = orderSubscriber.branch;
    this.nationalId = orderSubscriber.nationalId;
    this.phoneNumber = orderSubscriber.phoneNumber;
    this.facilityName = orderSubscriber.facilityName;
    this.balance = orderSubscriber.balance;
    this.secondPhoneNumber = orderSubscriber.secondPhoneNumber;
  }
}

