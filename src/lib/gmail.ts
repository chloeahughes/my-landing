import type { MailProvider, NormalizedEmail } from '@/providers/types';
import { startGmailWatch, getGmailDeltas } from '@/lib/gmail'; // from the canvas version
// ^ If you used different function names, import those.

export const GmailProvider: MailProvider = {
  async startWatch(conn) {
    const { watchExpiresAt, nextCursor } = await startGmailWatch(conn);
    return { watchExpiresAt, nextCursor };
  },
  async refreshToken(conn) {
    // If you centralized token refresh elsewhere, just return conn here.
    return conn;
  },
  async fetchDeltas(conn) {
    const { emails, nextCursor, eventKeys } = await getGmailDeltas(conn);
    return { emails, nextCursor, eventKeys };
  }
};
