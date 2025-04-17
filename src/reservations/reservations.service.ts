// src/reservations/reservations.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reservation, ReservationDocument } from './reservation.schema';
import { Table, TableDocument } from 'src/tables/table.schema';

@Injectable()
export class ReservationsService {
  constructor(
    @InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>,
    @InjectModel(Table.name)
    private tableModel: Model<TableDocument>, // optional if you want to do table checks
  ) {}

  // CREATE
  async createReservation(
    userId: string,
    tableId: string,
    date: Date,
    timeSlot: string,
    guests: number,
  ): Promise<Reservation> {
    // 1. Check table capacity (optional validation)
    const table = await this.tableModel.findById(tableId).exec();
    if (!table) {
      throw new BadRequestException('Invalid table ID');
    }
    if (guests > table.capacity) {
      throw new BadRequestException('Number of guests exceeds table capacity');
    }

    // 2. Check for overlapping reservations
    // (In Phase 4, you’ll refine overlap logic with exact constraints.)
    const existingReservation = await this.reservationModel.findOne({
      table: tableId,
      date,
      timeSlot,
    });
    if (existingReservation) {
      throw new BadRequestException(
        'Time slot is already booked for this table',
      );
    }

    // 3. Create the reservation
    const newRes = new this.reservationModel({
      user: userId,
      table: tableId,
      date,
      timeSlot,
      guests,
    });
    return newRes.save();
  }

  // READ
  async findAll(): Promise<Reservation[]> {
    return this.reservationModel
      .find()
      .populate('user')
      .populate('table')
      .exec();
  }

  async findOne(id: string): Promise<Reservation | null> {
    return this.reservationModel
      .findById(id)
      .populate('user')
      .populate('table')
      .exec();
  }

  // UPDATE
  async updateReservation(
    id: string,
    updates: Partial<Reservation>,
  ): Promise<Reservation | null> {
    // e.g. change timeSlot, guests, etc.
    return this.reservationModel
      .findByIdAndUpdate(id, updates, { new: true })
      .exec();
  }

  // DELETE
  async deleteReservation(id: string): Promise<Reservation | null> {
    return this.reservationModel.findByIdAndDelete(id).exec();
  }
}
