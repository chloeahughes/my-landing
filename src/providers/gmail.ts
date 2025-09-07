// src/providers/gmail.ts
import type { MailProvider } from '@/providers/types';
import { startGmailWatch, getGmailDeltas } from '@/lib/gmail';

export const GmailProvider: MailProvider = {
  async startWatch(conn) {
    const { watchExpiresAt, nextCursor } = await startGmailWatch(conn);
    return { watchExpiresAt, nextCursor };
  },
  async refreshToken(conn) {
    return conn; // if you're not refreshing here
  },
  async fetchDeltas(conn) {
    const { emails, nextCursor, eventKeys } = await getGmailDeltas(conn);
    return { emails, nextCursor, eventKeys };
  },
};
