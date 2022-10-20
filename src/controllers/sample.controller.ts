import { Request, Response } from 'express';

const greetings = (req: Request, res: Response) => {
  res.send('Greetings');
};

export default { greetings };
