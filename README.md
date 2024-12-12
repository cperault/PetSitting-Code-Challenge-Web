# Coding Challenge

The PetSitting.com codebase was irreversibly corrupted in a terrible accident!
Thankfully, no pets were harmed, but we will have to rebuild using data retrieved from the Google search index.
The task is to recreate a search ranking algorithm and compute search scores for sitters.

## Recreating the Search Ranking Algorithm

The data retrieved from the Google index containing all of the reviews customers have left for their stays is included in the `reviews.csv` file.

This CLI program will use the data to recreate the original search algorithm.

Here's how the search ranking algorithm works:

- For each sitter, we first calculate a Profile Score and a Ratings Score. These are then used to calculate the overall Search Score, which is used for search rankings.

- The Profile Score is five times the fraction of the English alphabet comprised by the distinct letters in what was recovered of the sitter's name. For example, the sitter name `Leilani R.` has six distinct letters.

- The Ratings Score is the average of their stay ratings.

- The Search Score is a weighted average of the Profile Score and Ratings Score. When a sitter has no stays, their Search Score is equal to the Profile Score. When a sitter has 10 or more stays, their Search Score is equal to the Ratings Score. The idea is that as a sitter gets more reviews, we will weigh the Ratings Score more heavily.

- Scores should contain exactly two decimal places.

## Generating the Ranked List of Sitters

The program should output a CSV called `sitters.csv`, containing the following columns:

- Sitter email (`email`)
- Sitter name (`name`)
- Profile Score (`profile_score`)
- Ratings Score (`ratings_score`)
- Search Score (`search_score`)

The CSV should be sorted by Search Score (descending), sorting alphabetically on the sitter name as a tie-breaker.

## Project Setup Instructions

You must have Node installed on your machine to run this project. If you do not, complete the following steps in Terminal, otherwise you can skip to the next section:

```bash
# install nvm (Node Version Manager)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.0/install.sh | bash

# download and install Node.js (you may need to reload Terminal)
nvm install 20 # most recent LTS version as of writing this documentation

# verify the right Node.js version is in the environment
node -v # should print your current node version

# verify the right npm version is in the environment
npm -v # should print your current npm version
```

In Terminal, switch to the root of the `PetSitting-Code-Challenge-Web` directory and run `npm i` to install project dependencies.

Once the dependencies have been installed, build the project with `npm run build` and run it via `node build/main.js -f reviews.csv`

This will generate a CSV file named `sitters.csv`.

Once you run the CLI program, you should see the following output in Terminal:

```
Reading "reviews.csv" in progress...😸

Parsing Review data for 500 records....😼

Data extraction complete! 😻

Writing to "sitters.csv" in progress...😼

Review data has been processed successfully! 😻

Would you like me to open the generated CSV file? (y/n):
```

To run unit tests, run `npm run test` and you should see a total of 4 test suites and 12 tests that passed.
