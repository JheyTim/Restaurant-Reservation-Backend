import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TableDocument = Table & Document;

@Schema()
export class Table {
  @Prop({ required: true })
  tableNumber: number;

  @Prop({ required: true })
  capacity: number;
}

export const TableSchema = SchemaFactory.createForClass(Table);
