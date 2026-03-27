import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

const ADMIN_FLAG = 'X-ADMIN';

const IsAdmin = createParamDecorator((_: undefined, ctx) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  if (request.headers[ADMIN_FLAG] === 'true') {
    return true;
  }
  return false;
});

export default IsAdmin;
