import * as MessageModel from './messages';
import { NotFoundError, ValidationError, ForbiddenError } from './errors';
import { Prisma } from '@prisma/client';
import { cleanRichText } from './sanitize';
import { messageSchema } from './schemas';
import { ZodError } from 'zod';

export async function createMessage(raw: any) {
  let data;
  try {
    data = messageSchema.parse(raw);
  } catch (err) {
    if (err instanceof ZodError) throw new ValidationError(err.issues[0].message);
    throw err;
  }
  
  data.message = cleanRichText(data.message);

  try {
    return await MessageModel.addMessage(data);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2002') {
      throw new ValidationError('อีเมลนี้ถูกใช้แล้ว');
    }
    throw err;
  }
}

export async function listMessages() {
  // main branch comment
  return await MessageModel.getMessages();
}

export async function getMessageById(id: string) {
  const message = await MessageModel.getMessageById(id);
  if (!message) {
    throw new NotFoundError('ไม่พบข้อความนี้');
  }
  return message;
}

export async function editMessage(id: string, updates: any, sessionUserId: string) {
  const message = await getMessageById(id);
  if (message.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์แก้ไขข้อความนี้');
  }

  if (updates.message !== undefined && updates.message.trim() === '') {
    throw new ValidationError('ข้อความห้ามเป็นค่าว่าง');
  }
  
  if (updates.message) {
    updates.message = cleanRichText(updates.message);
  }

  try {
    return await MessageModel.updateMessage(id, updates);
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return null;
    }
    throw err;
  }
}

export async function removeMessage(id: string, sessionUserId: string) {
  const message = await getMessageById(id);
  if (message.authorId !== sessionUserId) {
    throw new ForbiddenError('คุณไม่มีสิทธิ์ลบข้อความนี้');
  }

  try {
    await MessageModel.deleteMessage(id);
    return true;
  } catch (err) {
    if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === 'P2025') {
      return false;
    }
    throw err;
  }
}