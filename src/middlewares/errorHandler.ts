import { Request, Response, NextFunction } from "express";

// Error handling middleware
export function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if (err.code === "23505") { // Check for PostgreSQL unique violation
        res.status(409).send("A record with the same unique constraint already exists.");
    } else {
        //responiding with the error or a generic message
        res.send({
            message: err.message,
            error: req.app.get('env') === 'development' ? err : {},
        })
    }
}
