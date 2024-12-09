import { Review } from "../Review/Review";
import { Sitter } from "../Sitter/Sitter";

export class Processor {
  private data: Review[];

  constructor(data: Review[]) {
    this.data = data;
  }

  public getAggregateData(): Sitter[] {
    const sitterMap: Map<string, Sitter> = new Map();

    this.data.forEach((review: Review) => {
      const key = `${review.sitter}-${review.sitter_email}`;

      if (!sitterMap.has(key)) {
        sitterMap.set(key, {
          name: review.sitter,
          email: review.sitter_email,
          reviews: [],
          ratings_score: 0,
          profile_score: 0,
          search_score: 0,
        });
      }

      const sitter = sitterMap.get(key);

      if (sitter) {
        if (sitter.reviews) {
          sitter.reviews.push(review);
        }
      }
    });

    sitterMap.forEach((sitterData) => {
      if (sitterData.reviews) {
        const totalRatings = sitterData.reviews.reduce(
          (sum, review) => sum + review.rating,
          0
        );

        const sitterName = sitterData.name.toLowerCase();
        const distinctLetters = new Set<string>();

        for (const letter of sitterName) {
          if (letter >= "a" && letter <= "z") {
            distinctLetters.add(letter);
          }
        }

        sitterData.profile_score = (5 * distinctLetters.size) / 26;
        sitterData.ratings_score = totalRatings / sitterData.reviews.length;

        const numberOfStays = sitterData.reviews.length;

        if (numberOfStays === 0) {
          sitterData.search_score = sitterData.profile_score;
        } else if (numberOfStays >= 10) {
          sitterData.search_score = sitterData.ratings_score;
        } else {
          const weight = numberOfStays / 10;

          sitterData.search_score =
            sitterData.profile_score * (1 - weight) +
            sitterData.ratings_score * weight;
        }

        sitterData.profile_score = parseFloat(
          sitterData.profile_score.toFixed(2)
        );
        sitterData.ratings_score = parseFloat(
          sitterData.ratings_score.toFixed(2)
        );
        sitterData.search_score = parseFloat(
          sitterData.search_score.toFixed(2)
        );
      }
    });

    return Array.from(sitterMap.values()).sort(
      (left: Sitter, right: Sitter) => {
        if (left.search_score !== right.search_score) {
          return right.search_score - left.search_score;
        }

        return left.name.localeCompare(right.name);
      }
    );
  }
}
