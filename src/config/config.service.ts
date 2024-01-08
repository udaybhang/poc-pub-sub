import * as dotenv from "dotenv";
import * as fs from "fs";

export class ConfigService {
  private readonly envConfig: { [key: string]: string };

  constructor(filePath: string) {
      this.envConfig = dotenv.parse(fs.readFileSync(".env"));
  }

  get(key: string): string {
    return this.envConfig[key];
  }
  set(key: string, value: string): string {
    this.envConfig[key] = value
    return this.envConfig[key];
  }
}