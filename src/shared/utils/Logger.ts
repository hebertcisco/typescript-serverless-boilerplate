import * as crypto from "node:crypto";

export class Logger {
  private need_id: boolean;
  constructor(
    private config?: {
      context?: string;
      need_id?: boolean;
    }
  ) {
    this.need_id = config?.need_id || true;
  }
  public info(value: string) {
    return console.info(this.handleWithContext(value));
  }
  public log(value: string) {
    return console.log(this.handleWithContext(value));
  }
  public ok(value: string) {
    return console.log("\x1b[32m%s\x1b[0m", this.handleWithContext(value));
  }
  public error(value: string) {
    return console.error(this.handleWithContext(value));
  }
  private handleWithContext(value: string) {
    const log_id = `\n[LogId]: ${crypto.randomUUID()}`;
    const context = `\n(ƒ: ${this.config?.context || Logger.name}) `;
    return this.need_id ? log_id + context + value : context + value;
  }
}
export default new Logger();
