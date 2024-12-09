import { Processor } from "./Processor";
import { Review } from "../Review/Review";
import { Sitter } from "../Sitter/Sitter";

describe("Processor", () => {
  it("should aggregate data correctly", () => {
    const reviews: Review[] = [
      {
        sitter: "Alice",
        sitter_email: "alice@example.com",
        rating: 5,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Alice",
        sitter_email: "alice@example.com",
        rating: 4,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Bob",
        sitter_email: "bob@example.com",
        rating: 3,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Bob",
        sitter_email: "bob@example.com",
        rating: 4,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Charlie",
        sitter_email: "charlie@example.com",
        rating: 5,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
    ];

    const processor = new Processor(reviews);
    const result = processor.getAggregateData();

    expect(result).toHaveLength(3);

    const alice = result.find((sitter) => sitter.name === "Alice");
    const bob = result.find((sitter) => sitter.name === "Bob");
    const charlie = result.find((sitter) => sitter.name === "Charlie");

    expect(alice).toBeDefined();
    expect(alice?.ratings_score).toBe(4.5);
    expect(alice?.profile_score).toBe(0.96);
    expect(alice?.search_score).toBe(1.67);

    expect(bob).toBeDefined();
    expect(bob?.ratings_score).toBe(3.5);
    expect(bob?.profile_score).toBe(0.38);
    expect(bob?.search_score).toBe(1.01);

    expect(charlie).toBeDefined();
    expect(charlie?.ratings_score).toBe(5);
    expect(charlie?.profile_score).toBe(1.35);
    expect(charlie?.search_score).toBe(1.71);
  });

  it("should sort sitters by search score descending and name as tie-breaker", () => {
    const reviews: Review[] = [
      {
        sitter: "Alice",
        sitter_email: "alice@example.com",
        rating: 5,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Alice",
        sitter_email: "alice@example.com",
        rating: 4,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Bob",
        sitter_email: "bob@example.com",
        rating: 3,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Bob",
        sitter_email: "bob@example.com",
        rating: 4,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Charlie",
        sitter_email: "charlie@example.com",
        rating: 5,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Charlie",
        sitter_email: "charlie@example.com",
        rating: 5,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
      {
        sitter: "Charlie",
        sitter_email: "charlie@example.com",
        rating: 5,
        sitter_image: "",
        end_date: "",
        text: "",
        owner_image: "",
        dogs: "",
        owner: "",
        start_date: "",
        sitter_phone_number: "",
        owner_phone_number: "",
        owner_email: "",
        response_time_minutes: 0,
      },
    ];

    const processor = new Processor(reviews);
    const result = processor.getAggregateData();

    expect(result).toHaveLength(3);

    expect(result[0].name).toBe("Charlie");
    expect(result[1].name).toBe("Alice");
    expect(result[2].name).toBe("Bob");
  });
});
