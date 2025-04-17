import {
  Controller,
  Post,
  Get,
  Param,
  Patch,
  Delete,
  Body,
} from '@nestjs/common';
import { TablesService } from './tables.service';
import { Table } from './table.schema';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Post()
  async createTable(
    @Body('tableNumber') tableNumber: number,
    @Body('capacity') capacity: number,
  ) {
    return this.tablesService.createTable(tableNumber, capacity);
  }

  @Get()
  async findAll() {
    return this.tablesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.tablesService.findOne(id);
  }

  @Patch(':id')
  async updateTable(@Param('id') id: string, @Body() updates: Partial<Table>) {
    return this.tablesService.updateTable(id, updates);
  }

  @Delete(':id')
  async deleteTable(@Param('id') id: string) {
    return this.tablesService.deleteTable(id);
  }
}
