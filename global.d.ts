declare global {
  interface String {
    prettyParse(withDelimeter: string): string[];
    truncate(length: number): string;
  }
}

export {};
