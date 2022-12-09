import handlebars from '@config/handlebars';
import { logger } from '@config/logger';
import { createTransport, Transporter } from 'nodemailer';
import nodemailerhbs from 'nodemailer-express-handlebars';

export default class MailService {
  private transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      port: Number(process.env.MAIL_PORT),
      host: process.env.MAIL_HOST,
      from: process.env.MAIL_FROM,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    this.transporter.verify((err) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info('Server is ready to take our messages');
      }
    });

    this.transporter.use('compile', nodemailerhbs(handlebars));
  }

  sendMailWithToAndCC = async (
    to: string | string[],
    cc: string | string[],
    subject: string,
    template: string,
    context: any,
  ): Promise<any> => {
    const data = {
      to,
      cc,
      subject,
      template,
      context,
    };

    await this.transporter.sendMail(data);
  };

  sendMailWithTo = async (to: string | string[], subject: string, template: string, context: any): Promise<any> => {
    const data = {
      to,
      subject,
      template,
      context,
    };

    await this.transporter.sendMail(data);
  };
}
