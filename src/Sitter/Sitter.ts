import { Review } from "../Review/Review";

export class Sitter {
  email: string;
  name: string;
  profile_score: number;
  ratings_score: number;
  search_score: number;
  reviews?: Review[] | undefined;

  constructor(
    email: string,
    name: string,
    profile_score: number,
    ratings_score: number,
    search_score: number,
    reviews?: Review[]
  ) {
    this.email = email;
    this.name = name;
    this.profile_score = profile_score;
    this.ratings_score = ratings_score;
    this.search_score = search_score;
    this.reviews = reviews;
  }
}
