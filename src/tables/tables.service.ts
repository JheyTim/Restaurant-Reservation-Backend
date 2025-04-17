import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Table, TableDocument } from './table.schema';

@Injectable()
export class TablesService {
  constructor(
    @InjectModel(Table.name) private tableModel: Model<TableDocument>,
  ) {}

  async createTable(tableNumber: number, capacity: number): Promise<Table> {
    const newTable = new this.tableModel({ tableNumber, capacity });
    return newTable.save();
  }

  async findAll(): Promise<Table[]> {
    return this.tableModel.find().exec();
  }

  async findOne(id: string): Promise<Table | null> {
    return this.tableModel.findById(id).exec();
  }

  async updateTable(
    id: string,
    updates: Partial<Table>,
  ): Promise<Table | null> {
    return this.tableModel.findByIdAndUpdate(id, updates, { new: true }).exec();
  }

  async deleteTable(id: string): Promise<Table | null> {
    return this.tableModel.findByIdAndDelete(id).exec();
  }
}
