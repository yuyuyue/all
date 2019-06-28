// This file is created by egg-ts-helper@1.25.5
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportCustomer from '../../../app/model/customer';

declare module 'egg' {
  interface IModel {
    Customer: ReturnType<typeof ExportCustomer>;
  }
}
