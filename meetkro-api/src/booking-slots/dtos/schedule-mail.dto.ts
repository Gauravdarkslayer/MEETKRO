export interface IScheduleMail {
    name: string;
    start_time: Date
    end_time: Date
    location: string
    subject: string
    meeting_link: string
    to: string,
    body: string
}