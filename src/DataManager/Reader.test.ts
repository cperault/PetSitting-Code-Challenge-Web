import { Reader } from "./Reader";
import { Review } from "../Review/Review";
import { readFileSync } from "fs";
import "../Utility/stringExtensions";

jest.mock("fs");

describe("Reader", () => {
  const mockFileName = "testFile.csv";
  const mockFileContent = `rating,sitter_image,end_date,text,owner_image,dogs,sitter,owner,start_date,sitter_phone_number,sitter_email,owner_phone_number,owner_email,response_time_minutes
5,image1.jpg,2021-01-01,Great service!,image2.jpg,dog1|dog2,Sitter1,Owner1,2020-12-25,1234567890,sitter1@example.com,0987654321,owner1@example.com,30`;
  let mockConsoleLog: jest.SpyInstance;

  beforeEach(() => {
    (readFileSync as jest.Mock).mockReturnValue(mockFileContent);
    mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should read file content during initialization", () => {
    const reader = new Reader(mockFileName);

    expect(readFileSync).toHaveBeenCalledWith(mockFileName, "utf-8");
    expect(reader["fileContent"]).toBe(mockFileContent);
  });

  it("should exit if file reading fails", () => {
    const mockExit = jest.spyOn(process, "exit").mockImplementation(() => {
      throw new Error("process.exit called");
    });

    const mockConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    (readFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("File not found");
    });

    expect(() => new Reader(mockFileName)).toThrow("process.exit called");
    expect(mockExit).toHaveBeenCalledWith(1);

    mockExit.mockRestore();
  });

  it("should parse file content and return Review objects", () => {
    const reader = new Reader(mockFileName);
    const reviews = reader.getData();

    expect(reviews.length).toBe(1);
    expect(reviews[0]).toBeInstanceOf(Review);
    expect(reviews[0]).toEqual(
      expect.objectContaining({
        rating: 5,
        sitter_image: "image1.jpg",
        end_date: "2021-01-01",
        text: "Great service!",
        owner_image: "image2.jpg",
        dogs: "dog1, dog2",
        sitter: "Sitter1",
        owner: "Owner1",
        start_date: "2020-12-25",
        sitter_phone_number: "1234567890",
        sitter_email: "sitter1@example.com",
        owner_phone_number: "0987654321",
        owner_email: "owner1@example.com",
        response_time_minutes: 30,
      })
    );
  });
});
