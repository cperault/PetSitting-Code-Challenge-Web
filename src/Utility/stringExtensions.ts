declare global {
  interface String {
    prettyParse(withDelimeter: string): string[];
    truncate(length: number): string;
  }
}

String.prototype.prettyParse = function (withDelimeter: string): string[] {
  return this.split(withDelimeter).map((text) => text.trim());
};

String.prototype.truncate = function (length: number): string {
  return this.length > length
    ? this.substring(0, length) + "..."
    : String(this);
};

export {};
