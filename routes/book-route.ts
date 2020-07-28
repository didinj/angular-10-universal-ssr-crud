import { Request, Response, NextFunction } from 'express';
import Book from '../models/book';

export class BookRoute {

  public bookRoute(app: any): void {
    app.route('/book/').get((req: Request, res: Response, next: NextFunction) => {
      Book.find((err, books) => {
        if (err) { return next(err); }
        res.json(books);
      });
    });

    app.route('/book/:id').get((req: Request, res: Response, next: NextFunction) => {
      Book.findById(req.params.id, (err, book) => {
        if (err) { return next(err); }
        res.json(book);
      });
    });

    app.route('/book/').post((req: Request, res: Response, next: NextFunction) => {
      console.log(req.body);
      Book.create(req.body, (err, book) => {
        if (err) { return next(err); }
        res.json(book);
      });
    });

    app.route('/book/:id').put((req: Request, res: Response, next: NextFunction) => {
      Book.findByIdAndUpdate(req.params.id, req.body, (err, book) => {
        if (err) { return next(err); }
        res.json(book);
      });
    });

    app.route('/book/:id').delete((req: Request, res: Response, next: NextFunction) => {
      Book.findByIdAndRemove(req.params.id, req.body, (err, book) => {
        if (err) { return next(err); }
        res.json(book);
      });
    });
  }
}
