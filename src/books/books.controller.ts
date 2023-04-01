import { Body, Controller, Get, Param, Post, Res } from '@nestjs/common';
import { Response } from 'express';

interface Book {
  id: number;
  title: string;
  description: string;
  isDone: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const books: Array<Book> = [
  {
    id: 1,
    title: 'Test',
    description: 'This is a test Tod',
    isDone: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: 2,
    title: 'Test2',
    description: 'This is a test Tod',
    isDone: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

@Controller('books')
export class BooksController {
  @Get()
  findAll(@Res() res: Response) {
    return res.status(200).json({
      success: true,
      data: books,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const result = books.find((b) => b.id === Number(id));
    return res.status(200).json({
      success: true,
      data: result,
    });
  }

  @Post()
  create(@Res() res: Response, @Body() body: Book) {
    const id = Math.floor(Math.random() * 1000000);
    const createdAt = new Date();

    books.push({
      id,
      title: body.title,
      description: body.description,
      isDone: body.isDone,
      createdAt,
      updatedAt: createdAt,
    });
    return res.status(200).json({
      success: true,
      message: 'Book created',
    });
  }
}
