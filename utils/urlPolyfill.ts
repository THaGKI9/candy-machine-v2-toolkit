export class URLPolyfill extends URL {
  constructor(url: string, base?: string) {
    if (base) {
      base = base.toString();
      const splitterPos = base.indexOf("://");
      const schema = base.substring(0, splitterPos);
      switch (schema) {
        case "https":
        case "http":
          break;
        default: {
          super(url, "http" + base.substring(splitterPos));
          this.protocol = schema;
          return;
        }
      }
    }

    super(url, base);
  }
}
