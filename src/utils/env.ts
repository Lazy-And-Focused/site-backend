import { CreateEnv } from "fenviee";

const ENV_PATH = "../../.env" as const;

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

const env = CreateEnv({
  requiredKeys: REQUIRED,
  keys: KEYS,
  pathToEnv: ENV_PATH,
  defaultEnv: DEFAULT,
  ignoreErrors: false
});

export { env };

export default env;
