export class PageConfig {
  pageNumber = 0;
  pageSize = 5;
  sortName: string;
  orderDesc: 'desc' | 'asc';

  constructor(sortName: string) {
    this.orderDesc = 'asc';
    this.sortName = sortName;
  }

  changeOrder() {
    this.orderDesc = (this.orderDesc === 'asc') ? 'desc' : 'asc';
  }
}
