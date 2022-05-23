export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isString(obj: any) {
  return typeof obj === "string" || obj instanceof String;
}
