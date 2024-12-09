export class Review {
  rating: number;
  sitter_image: string;
  end_date: string;
  text: string;
  owner_image: string;
  dogs: string;
  sitter: string;
  owner: string;
  start_date: string;
  sitter_phone_number: string;
  sitter_email: string;
  owner_phone_number: string;
  owner_email: string;
  response_time_minutes: number;

  constructor(
    rating: number,
    sitter_image: string,
    end_date: string,
    text: string,
    owner_image: string,
    dogs: string,
    sitter: string,
    owner: string,
    start_date: string,
    sitter_phone_number: string,
    sitter_email: string,
    owner_phone_number: string,
    owner_email: string,
    response_time_minutes: number
  ) {
    this.rating = rating;
    this.sitter_image = sitter_image;
    this.end_date = end_date;
    this.text = text;
    this.owner_image = owner_image;
    this.dogs = dogs;
    this.sitter = sitter;
    this.owner = owner;
    this.start_date = start_date;
    this.sitter_phone_number = sitter_phone_number;
    this.sitter_email = sitter_email;
    this.owner_phone_number = owner_phone_number;
    this.owner_email = owner_email;
    this.response_time_minutes = response_time_minutes;
  }
}
