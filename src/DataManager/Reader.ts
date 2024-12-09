import { readFileSync } from "fs";
import { Review } from "../Review/Review";
import { exit } from "process";

export class Reader {
  private fileName: string;
  private fileContent: string;

  constructor(fileName: string) {
    this.fileName = fileName;
    this.fileContent = "";
    this.readFileContent();
  }

  private readFileContent(): void {
    try {
      this.fileContent = readFileSync(this.fileName, "utf-8");
      console.log(`\nReading "${this.fileName}" in progress...😸`);
    } catch (error) {
      console.error(
        `\nSorry, I didn't find "${this.fileName}" in the current directory. Please check the file name and try again. 😿`
      );
      exit(1);
    }
  }

  public getData(): Review[] {
    const data: string[] = this.fileContent.trim().split("\n");
    console.log(`\nParsing Review data for ${data.length - 1} records....😼`);
    const dataHeaders: string[] = data[0].prettyParse(",");
    const allParsedData: Review[] = [];

    for (let i = 1; i < data.length; i++) {
      const rowData: string[] = data[i].prettyParse(",");
      const parsedData: any = {};

      for (let j = 0; j < rowData.length; j++) {
        parsedData[dataHeaders[j]] = rowData[j];
      }

      const review = new Review(
        parseInt(parsedData.rating),
        parsedData.sitter_image,
        parsedData.end_date,
        parsedData.text,
        parsedData.owner_image,
        parsedData.dogs.split("|").join(", "),
        parsedData.sitter,
        parsedData.owner,
        parsedData.start_date,
        parsedData.sitter_phone_number,
        parsedData.sitter_email,
        parsedData.owner_phone_number,
        parsedData.owner_email,
        parseInt(parsedData.response_time_minutes)
      );

      allParsedData.push(review);
    }

    console.log("\nData extraction complete! 😻");
    return allParsedData;
  }
}
