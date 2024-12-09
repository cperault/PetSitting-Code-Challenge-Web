import "../Utility/stringExtensions";

describe("String.prototype.prettyParse", () => {
  it("should split the string by the given delimiter and trim each part", () => {
    const str = "  hello  ,  world  ,  test  ";
    const result = str.prettyParse(",");
    expect(result).toEqual(["hello", "world", "test"]);
  });

  it("should return an array with one trimmed element if delimiter is not found", () => {
    const str = "  hello world  ";
    const result = str.prettyParse(",");
    expect(result).toEqual(["hello world"]);
  });
});

describe("String.prototype.truncate", () => {
  it('should truncate the string and add "..." if it exceeds the specified length', () => {
    const str = "hello world";
    const result = str.truncate(5);
    expect(result).toBe("hello...");
  });

  it("should return the original string if it does not exceed the specified length", () => {
    const str = "hello";
    const result = str.truncate(10);
    expect(result).toBe("hello");
  });

  it("should handle edge case where length is zero", () => {
    const str = "hello";
    const result = str.truncate(0);
    expect(result).toBe("...");
  });
});
