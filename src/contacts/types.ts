import { NotFoundException, BadRequestException } from '@nestjs/common';

type ResponseException = NotFoundException | BadRequestException;

export type CustomResponse<T> = Promise<T | ResponseException>;
