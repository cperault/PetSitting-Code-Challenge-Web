import { writeFileSync } from "fs";
import { join } from "path";
import { Sitter } from "../Sitter/Sitter";
import { exit } from "process";

export class Writer {
  private data: any[];
  private fileName: string;

  constructor(data: Sitter[], fileName: string) {
    this.data = data;
    this.fileName = fileName;
  }

  public writeData(): void {
    const fileContents: string = this.data
      .map((sitter) => {
        return `${sitter.email},${sitter.name},${sitter.profile_score.toFixed(
          2
        )},${sitter.ratings_score.toFixed(2)},${sitter.search_score.toFixed(
          2
        )}`;
      })
      .join("\n");

    try {
      writeFileSync(join(process.cwd(), this.fileName), fileContents);
      console.log(`\nWriting to "${this.fileName}" in progress...😼`);
    } catch (error) {
      console.error(
        `\nError: File "${this.fileName}" could not be generated. Please try again.`
      );
      exit(1);
    }
  }
}
