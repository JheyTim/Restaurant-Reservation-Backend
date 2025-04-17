import {
  Controller,
  Post,
  Get,
  Patch,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { ReservationsService } from './reservations.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Request } from 'express';
import { Req } from '@nestjs/common';
import { Reservation } from './reservation.schema';

@Controller('reservations')
export class ReservationsController {
  constructor(private readonly reservationsService: ReservationsService) {}

  // CREATE a new reservation
  @UseGuards(JwtAuthGuard) // Only logged-in users can create a reservation
  @Post()
  async createReservation(
    @Req() req: Request,
    @Body('tableId') tableId: string,
    @Body('date') date: string,
    @Body('timeSlot') timeSlot: string,
    @Body('guests') guests: number,
  ) {
    // 'req.user' was attached by the JwtStrategy
    const userId = (req.user as { userId: string }).userId;
    return this.reservationsService.createReservation(
      userId,
      tableId,
      new Date(date),
      timeSlot,
      guests,
    );
  }

  // READ all reservations (Admin-only in future)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.reservationsService.findAll();
  }

  // READ one reservation
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.reservationsService.findOne(id);
  }

  // UPDATE reservation
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateReservation(
    @Param('id') id: string,
    @Body() updates: Partial<Reservation>,
  ) {
    return this.reservationsService.updateReservation(id, updates);
  }

  // DELETE reservation
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteReservation(@Param('id') id: string) {
    return this.reservationsService.deleteReservation(id);
  }
}
