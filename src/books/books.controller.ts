import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
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
      statusCode: 200,
      data: books,
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Res() res: Response) {
    const result = books.find((b) => b.id === Number(id));
    return res.status(200).json({
      statusCode: 200,
      data: result,
    });
  }

  @Post()
  create(@Res() res: Response, @Body() body: Book) {
    const title = String(body.title.trim());
    const duplicate = books.find(
      (b) => b.title.toLowerCase() === title.toLowerCase(),
    );
    if (duplicate) {
      return res.status(400).json({
        statusCode: 400,
        message: 'Book duplicate',
      });
    }
    const id = Math.floor(Math.random() * 1000000);
    const description = String(body.description.trim());
    const createdAt = new Date();
    const isDone = Boolean(body.isDone);

    books.push({
      id,
      title,
      description,
      isDone,
      createdAt,
      updatedAt: createdAt,
    });
    return res.status(200).json({
      statusCode: 201,
      message: 'Book created',
    });
  }
}
