#!/usr/bin/env node

import { Command } from "commander";
import { Reader } from "./DataManager/Reader";
import "./Utility/stringExtensions";
import { Processor } from "./DataManager/Processor";
import { Writer } from "./DataManager/Writer";
import { createInterface } from "readline";
import { exec } from "child_process";
import { exit } from "process";

const program = new Command();

program
  .version("1.0.0")
  .description("Generate Sitter ranking data")
  .requiredOption("-f, --file <filename>", "file name to parse")
  .parse(process.argv);

const { file } = program.opts();
const fileReader = new Reader(file);
const reviewData = fileReader.getData();
const dataProcessor = new Processor(reviewData);
const sitterData = dataProcessor.getAggregateData();
const writer = new Writer(sitterData, "sitters.csv");
writer.writeData();
console.log("\nReview data has been processed successfully! 😻");

const reader = createInterface({
  input: process.stdin,
  output: process.stdout,
});

reader.question(
  "\nWould you like me to open the generated CSV file? (y/n): ",
  (answer) => {
    if (answer.toLowerCase() === "y") {
      exec(`open sitters.csv`, (err) => {
        if (err) {
          console.error(
            "Sorry, I wasn't able to open the file. Please try again or open it manually. 😿"
          );
          exit(1);
        }
      });
    }
    reader.close();
    console.log("\nThank you for using the PetSitting.com sitter ranking CLI! 🐶🐾");
    exit(1);
  }
);
