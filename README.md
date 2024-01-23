# Guess the Word

This is another implementation of the super popular game Wordle, created for educational perposes.

## Rules

- The game selects a five-letter noun in the singular form
- The player has up to six attempts to guess the word
- In each attempt, the player proposes a real, existing word
- After each guess, the game provides feedback indicating:
  - Whether any of the letters from the guessed word are in the hidden word
  - If any of these letters are correctly positioned within the hidden word
- If the player guesses a word where all the letters are correctly positioned in the hidden word, the player wins.

## Fearures

### Game

- [x] A user-friendly interface for players to input their guess for each attempt.
- [x] Game logic: feedback + winning conditions
- [x] Ability for the game to randomly select a five-letter noun for each round
- [x] The game must check if the entered word exists

### UI

- [x] Responsive design to ensure the game is playable and visually appealing on smartphones and desktops

### Statistics

- [x] Tracking and displaying player’s statistics, including number of games played, wins, and improvement over time.
- [x] Statistics window

### Authentication

- [x] Signing up
- [x] Logging in
- [x] Logging out
- [ ] Google account integration (later)

### Profile settings

- [x] Changing username and password
- [ ] Changing difficulty (later)
- [ ] Changing language (later)
- [ ] Adding and changing avatar (later)

### Social

- [ ] Inviting friends (later)
- [ ] Leaderboards (later)

## Technical implementation

Main library – React

### State management + data flow

Global UI state:

- game

Global remote state:

- statistics
- authentication
- profile settings

## Additional libraries

Routing: React router
Styling: Styled components
Remote state management: RTK Query
UI state management: Redux Toolkit
Forms management: React Hook Forms

### Database

Supabase
