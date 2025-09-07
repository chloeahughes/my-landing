export type NormalizedEmail = {
    provider: 'gmail'|'outlook';
    providerMessageId: string;
    threadId: string;
    subject: string;
    snippet: string;
    from: { name?: string; email: string };
    to: { name?: string; email: string }[];
    cc: { name?: string; email: string }[];
    bcc: { name?: string; email: string }[];
    dateReceived: string;     // ISO
    isUnread: boolean;
    labels: string[];
    rawSize?: number;
    attachments: { id: string; filename?: string; mimeType?: string; size?: number }[];
  };
  
  export interface MailProvider {
    startWatch(conn: any): Promise<{ watchExpiresAt?: Date; nextCursor?: string }>;
    stopWatch?(conn: any): Promise<void>;
    refreshToken(conn: any): Promise<any>;
    fetchDeltas(conn: any): Promise<{ emails: NormalizedEmail[]; nextCursor?: string; eventKeys: string[] }>;
    fetchFullMessage?(conn: any, messageId: string): Promise<NormalizedEmail>;
  }
  