export interface MailDto {
    from: string;
    to: string;
    subject: string;
    template?: string;
    html?: string;
    context?: any;
}
