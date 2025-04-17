import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from 'src/users/user.schema';
import { Table } from 'src/tables/table.schema';

export type ReservationDocument = Reservation & Document;

@Schema()
export class Reservation {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User', required: true })
  user: User;

  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Table', required: true })
  table: Table;

  @Prop({ required: true })
  date: Date; // e.g. 2025-05-15

  @Prop({ required: true })
  timeSlot: string; // e.g. "19:00-20:00"

  @Prop({ required: true })
  guests: number; // number of guests
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
