import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET;

class Token {
  static create(payload: string) {
    const token = jwt.sign(payload, secret as string);

    return token;
  }

  static verify(token: string) {
    try {
      const decoded = jwt.verify(token, secret as string);
      return decoded;
    } catch (err) {
      return undefined;
    }
  }
}

export default Token;
