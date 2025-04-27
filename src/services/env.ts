import { config } from "dotenv";

config();

const REQUIRED = [
  "TELEGRAM_BOT_TOKEN",
  "TELEGRAM_NEWS_CHANNEL_ID"
] as const;

type Required = (typeof REQUIRED)[number];

const KEYS = [
  ...REQUIRED,

  "IGNORE_TELEGRAM_DEPLOY_COMMANDS_ERRORS"
] as const;

type Keys = (typeof KEYS)[number];

type Unrequired = Exclude<Keys, Required>;
const DEFAULT: Record<Unrequired, string> = {
  IGNORE_TELEGRAM_DEPLOY_COMMANDS_ERRORS: "false"
};

class Env {
  private readonly _env = process.env;
  private readonly _keys = Object.keys(process.env);

  public constructor() {
    this.init();
  }

  public readonly get = <
    T extends boolean = false,
    DefaultIncludes extends boolean = false,
    Key extends T extends false
      ? DefaultIncludes extends true ? Unrequired : Keys
      : string = T extends false
        ? DefaultIncludes extends true ? Unrequired : Keys
        : string
  >(
    key: Key,
    defaultIncludes: DefaultIncludes = false as DefaultIncludes
  ): Key extends Required ? string : DefaultIncludes extends true ? string : string|false => {
    return (
      this._env[key] || (
        defaultIncludes == true
          ? DEFAULT[key as Unrequired]
          : false
      )
    ) as any;
  }

  public get env() {
    return this._env;
  }

  private init() {
    for (const key of REQUIRED) {
      const keys = []

      if (!this._keys.includes(key)) {
        keys.push(key)
      };

      if (keys.length !== 0) {
        throw new Error(`keys in your .env are not defined. Define next keys:\n${keys.join(", ")}`)
      };
    }
  }
}

export default Env;
