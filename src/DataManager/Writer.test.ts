import { writeFileSync } from "fs";
import { join } from "path";
import { Writer } from "./Writer";
import { Sitter } from "../Sitter/Sitter";

jest.mock("fs");
jest.mock("path");

describe("Writer", () => {
  const mockSitters: Sitter[] = [
    {
      email: "sitter1@example.com",
      name: "Sitter One",
      profile_score: 4.56,
      ratings_score: 4.12,
      search_score: 3.98,
    },
    {
      email: "sitter2@example.com",
      name: "Sitter Two",
      profile_score: 3.45,
      ratings_score: 4.78,
      search_score: 4.32,
    },
  ];

  const mockFileName = "sitters.csv";
  let mockConsoleLog: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    mockConsoleLog = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  it("should write data to a file", () => {
    const writer = new Writer(mockSitters, mockFileName);
    const mockPath = "/mock/path";
    (join as jest.Mock).mockReturnValue(mockPath);

    writer.writeData();

    const expectedFileContents = `sitter1@example.com,Sitter One,4.56,4.12,3.98\nsitter2@example.com,Sitter Two,3.45,4.78,4.32`;
    expect(writeFileSync).toHaveBeenCalledWith(mockPath, expectedFileContents);
  });

  it("should handle errors when writing data to a file", () => {
    const writer = new Writer(mockSitters, mockFileName);
    const mockPath = "/mock/path";
    (join as jest.Mock).mockReturnValue(mockPath);
    (writeFileSync as jest.Mock).mockImplementation(() => {
      throw new Error("Mock error");
    });

    const exitSpy = jest
      .spyOn(process, "exit")
      .mockImplementation((() => {}) as any);

    const mockConsoleError = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    writer.writeData();

    expect(writeFileSync).toHaveBeenCalledWith(mockPath, expect.any(String));
    expect(console.error).toHaveBeenCalledWith(
      `\nError: File "${mockFileName}" could not be generated. Please try again.`
    );
    expect(exitSpy).toHaveBeenCalledWith(1);

    exitSpy.mockRestore();
  });
});
