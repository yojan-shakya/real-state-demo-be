import { createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const ADMIN_FLAG = 'x-admin';

export const IsAdmin = createParamDecorator((_: undefined, ctx) => {
  const request = ctx.switchToHttp().getRequest<Request>();

  if (request.headers[ADMIN_FLAG] === 'true') {
    return true;
  }
  return false;
});
