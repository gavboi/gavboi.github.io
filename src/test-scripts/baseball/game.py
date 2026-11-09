import random
import time
from abc import ABC, abstractmethod
from enum import Enum

# ============================================================================
# Game constants
# ============================================================================


class DrawAction(Enum):
    """Enum for possible draw actions."""

    TAKE_FROM_DISCARD = 0
    DRAW_FROM_DECK = 1


# ============================================================================
# Card representation and point calculation functions
# ============================================================================


def get_card(v: int) -> str:
    """Gets string representing a card given a card number v (0-51)."""
    suit = ["♠", "♥", "♣", "♦"][v // 13]
    val = v % 13
    display = {0: "A", 10: "J", 11: "Q", 12: "K"}
    return suit + display.get(val, str(val + 1))


def val_to_points(v: int) -> int:
    """Converts a card number v (0-51) to its point value."""
    v2 = (v % 13) + 1
    if v2 == 13:
        return 0
    if v2 >= 10:
        return 10
    return v2


def get_hand_score(hand: list[int]) -> int:
    """Calculates the score of a hand of cards."""
    unpaired: set[int] = set()
    for c in hand:
        val = c % 13
        if val in unpaired:
            unpaired.remove(val)
        else:
            unpaired.add(val)
    points = 0
    for c in unpaired:
        points += val_to_points(c)
    return points


# ============================================================================
# Scoresheet
# ============================================================================


class ScoreSheet:
    """Keeps track of the scores for each player across rounds
    and handles stats calculations."""

    _scores: list[int]
    _won: list[bool]

    def __init__(self):
        self._scores = []
        self._won = []

    def add_win(self, points: int):
        """Adds a win with the given points to the scoresheet."""
        self._scores.append(points)
        self._won.append(True)

    def add_loss(self, points: int):
        """Adds a loss with the given points to the scoresheet."""
        self._scores.append(points)
        self._won.append(False)

    def get_total_points(self) -> int:
        """Returns the total points accumulated."""
        return sum(self._scores)

    def get_total_wins(self) -> int:
        """Returns the total number of wins."""
        return sum(self._won)

    def get_average_points_per_round(self) -> float:
        """Returns the average points per round."""
        if not self._scores:
            return 0.0
        return sum(self._scores) / len(self._scores)

    def get_best_round(self) -> tuple[int, int]:
        """Returns the best round score and how many times it was achieved."""
        if not self._scores:
            return (0, 0)
        best_score = min(self._scores)
        return (best_score, self._scores.count(best_score))

    def get_worst_round(self) -> tuple[int, int]:
        """Returns the worst round score and how many times it was achieved."""
        if not self._scores:
            return (0, 0)
        worst_score = max(self._scores)
        return (worst_score, self._scores.count(worst_score))

    def get_highest_win(self) -> int | None:
        """Returns the highest score from winning rounds. Returns None if no wins."""
        winning_scores = [score for score, won in zip(self._scores, self._won) if won]
        return max(winning_scores, default=None)

    def get_lowest_loss(self) -> int | None:
        """Returns the lowest score from losing rounds. Returns None if no losses."""
        losing_scores = [
            score for score, won in zip(self._scores, self._won) if not won
        ]
        return min(losing_scores, default=None)

    def print_stats(self):
        """Prints the statistics of the scoresheet."""
        print(f"Total Points: {self.get_total_points()}")
        print(f"Total Wins: {self.get_total_wins()}")
        print(f"Average Points per Round: {self.get_average_points_per_round():.2f}")
        best_score, best_count = self.get_best_round()
        print(f"Best Round Score: {best_score} (achieved {best_count}x)")
        worst_score, worst_count = self.get_worst_round()
        print(f"Worst Round Score: {worst_score} (achieved {worst_count}x)")
        highest_win = self.get_highest_win()
        if highest_win is not None:
            print(f"Highest Win Score: {highest_win}")
        else:
            print("No wins recorded.")
        lowest_loss = self.get_lowest_loss()
        if lowest_loss is not None:
            print(f"Lowest Loss Score: {lowest_loss}")
        else:
            print("No losses recorded.")


# ============================================================================
# Players
# ============================================================================


class Player(ABC):
    """Handles the player actions and attributes in the game."""

    name: str
    _hand: list[int]
    _revealed: list[bool]
    _peek_count: int
    _think_time: float
    _scoresheet: ScoreSheet

    def __init__(self, name: str, peek_count: int, think_time: float = 1.0):
        self.name = name
        self._hand = []
        self._revealed = []
        self._peek_count = peek_count
        self._think_time = think_time
        self._scoresheet = ScoreSheet()

    @abstractmethod
    def pick_card(self, visible_card: int) -> DrawAction:
        """Determines if the top discard card should be taken,
        or if a card should be drawn from the deck. Returns action choice."""

    @abstractmethod
    def reveal_card(self, option_card: int) -> int:
        """Reveals a card in the player's hand, or places the option_card
        revealed at an index. Returns discarded card; option card if an existing
        card was revealed, or a card from the hand if option card was taken."""

    def _think(self) -> None:
        """Simulates thinking time for AI players."""
        if self._think_time <= 0:
            return
        quarter_time = self._think_time / 4
        print(f"{self.name} is thinking", end="", flush=True)
        time.sleep(quarter_time)
        for _ in range(3):
            print(".", end="", flush=True)
            time.sleep(quarter_time)
        print()

    def set_hand(self, hand: list[int]) -> None:
        """Deals a hand of cards to the player."""
        self._hand = hand
        self._revealed = [False] * len(hand)

    def _replace_slot(self, slot: int, new_card: int) -> int:
        """Replaces a card in the player's hand at the specified slot with a new card.
        Returns the discarded card."""
        if 0 <= slot < len(self._hand):
            if self._revealed[slot]:
                raise ValueError("Cannot replace a revealed card.")
            discarded_card = self._hand[slot]
            self._hand[slot] = new_card
            self._revealed[slot] = True
            return discarded_card
        raise IndexError("Slot index out of range.")

    def _reveal_slot(self, slot: int) -> None:
        """Reveals a card in the player's hand at the specified slot."""
        if 0 <= slot < len(self._hand):
            if self._revealed[slot]:
                raise ValueError("Card at this slot is already revealed.")
            self._revealed[slot] = True
        else:
            raise IndexError("Slot index out of range.")

    def is_finished(self):
        """Checks if the player has finished all possible turns."""
        return all(self._revealed)

    def get_hand_str(self, private: bool = False):
        """Prints the player's hand, showing revealed cards and hiding unrevealed ones."""
        h: list[str] = []
        for i in range(len(self._hand)):
            r = self._revealed[i]
            s1 = "" if r else "("
            s2 = (
                get_card(self._hand[i])
                if (r or (i < self._peek_count and not private))
                else "?"
            )
            s3 = "" if r else ")"
            h.append((s1 + s2 + s3).center(5))
        return " ".join(h)

    def get_hand_points(self):
        """Calculates the total points of the player's hand."""
        return get_hand_score(self._hand)

    def score_hand(self, is_win: bool):
        """Scores the player's hand and updates the total points."""
        pts = self.get_hand_points()
        self._scoresheet.add_win(pts) if is_win else self._scoresheet.add_loss(pts)

    def get_points(self):
        """Returns a player's total points from all previous hands."""
        return self._scoresheet.get_total_points()

    def print_stats(self):
        """Prints the player's statistics."""
        print(f"\nStats for {self.name}:")
        self._scoresheet.print_stats()


class HumanPlayer(Player):
    """Represents a human player in the game."""

    def pick_card(self, visible_card: int) -> DrawAction:
        """Prompts the human player to choose between taking the visible card or drawing from the deck."""
        action = input(
            f"Do you want to take {get_card(visible_card)} from discard? (y/n) : "
        )
        if action.strip().lower() == "y":
            return DrawAction.TAKE_FROM_DISCARD
        return DrawAction.DRAW_FROM_DECK

    def reveal_card(self, option_card: int) -> int:
        """Prompts the human player to choose a card to reveal or replace with the option card."""
        s = input(
            f"Place {get_card(option_card)} in slot 1-{len(self._hand)} (blank for discard) : "
        )
        if s.isdigit() and 1 <= int(s) <= len(self._hand):
            # replace card
            slot = int(s) - 1
            if self._revealed[slot]:
                print(f"Slot {slot + 1} is already revealed.")
                return self.reveal_card(option_card)  # Prompt again
            return self._replace_slot(slot, option_card)
        else:
            # turn over existing
            while True:
                s = input(f"Select slot to flip (1-{len(self._hand)}) : ")
                if s.isdigit() and 1 <= int(s) <= len(self._hand):
                    slot = int(s) - 1
                    if self._revealed[slot]:
                        print(f"Slot {slot + 1} is already revealed.")
                    else:
                        self._reveal_slot(slot)
                        return option_card
                else:
                    print("Invalid input. Please try again.")


class AIRandomPlayer(Player):
    """Represents an AI player that makes random decisions.

    Averages score of ~19, perfect scores in ~1% of games in testing."""

    def pick_card(self, visible_card: int) -> DrawAction:
        """Randomly decides whether to take the visible card or draw from the deck."""
        self._think()  # Simulate thinking time
        return random.choice(list(DrawAction))

    def reveal_card(self, option_card: int) -> int:
        """Randomly chooses a card to reveal or replace with the option card."""
        self._think()  # Simulate thinking time
        replacing = random.choice([True, False])
        unrevealed_indices = [
            i for i, revealed in enumerate(self._revealed) if not revealed
        ]
        if not unrevealed_indices:
            return option_card  # No unrevealed cards left
        slot = random.choice(unrevealed_indices)
        if replacing:
            return self._replace_slot(slot, option_card)
        else:
            self._reveal_slot(slot)
            return option_card


class AILowPlayer(Player):
    """Represents an AI player that prioritizes low-value cards.

    Averages score of ~14, perfect scores in ~1% of games in testing."""

    def pick_card(self, visible_card: int) -> DrawAction:
        """Chooses to take the visible card if it's low value, otherwise draws from the deck.

        Median card is 6, so if visible is lower than 6, take it. Otherwise, draw from deck.
        """
        self._think()  # Simulate thinking time
        if val_to_points(visible_card) < 6:
            return DrawAction.TAKE_FROM_DISCARD
        return DrawAction.DRAW_FROM_DECK
        # TODO: check for pairs

    def reveal_card(self, option_card: int) -> int:
        """Tries calculating score for every possible action option and chooses
        the one that results in the lowest score.
        """
        self._think()  # Simulate thinking time
        unrevealed_indices = [
            i for i, revealed in enumerate(self._revealed) if not revealed
        ]
        if not unrevealed_indices:
            return option_card  # No unrevealed cards left
        has_unpeeked = max(unrevealed_indices) > self._peek_count - 1
        is_low = val_to_points(option_card) < 6
        if has_unpeeked:
            slot = max(
                unrevealed_indices
            )  # easiest way to pick definitely unpeeked card
            if is_low:  # replace
                return self._replace_slot(slot, option_card)
            else:  # is high; reveal
                self._reveal_slot(slot)
                return option_card
        else:  # all unrevealed are known
            slot = max(unrevealed_indices, key=lambda i: val_to_points(self._hand[i]))
            if self._hand[slot] > option_card:  # replace
                return self._replace_slot(slot, option_card)
            else:  # reveal
                self._reveal_slot(slot)
                return option_card
        # TODO: avoid replacing known cards if non-peeked cards are available


class AIPairPlayer(Player):
    """Represents an AI player that prioritizes pairing cards.

    Averages score of ~7, perfect scores in ~15% of games in testing."""

    def _get_known_values(self) -> list[int]:
        """Returns a set of known values in the player's hand."""
        return [
            self._hand[i] % 13
            for i in range(len(self._hand))
            if (self._revealed[i] or i < self._peek_count)
        ]

    def _get_unpaired_vals(self) -> set[int]:
        """Returns a list of known to be unpaired cards in the player's hand."""
        known_vals = self._get_known_values()
        unpaired_vals: set[int] = set()
        for v in known_vals:
            if known_vals.count(v) % 2 == 1:
                unpaired_vals.add(v)
        return unpaired_vals

    def pick_card(self, visible_card: int) -> DrawAction:
        """Chooses to take the visible card if it can pair with an existing card, otherwise draws from the deck."""
        self._think()  # Simulate thinking time
        unpaired_vals = self._get_unpaired_vals()
        if visible_card % 13 in unpaired_vals:
            return DrawAction.TAKE_FROM_DISCARD
        return DrawAction.DRAW_FROM_DECK

    def reveal_card(self, option_card: int) -> int:
        """Check every combination for revealing a new card, or replacing an
        existing unrevealed card with the option card and choose the solution
        that ends with the lowest points. Assume unknown cards are valued at 6.
        """
        self._think()  # Simulate thinking time
        best_index = 0
        replace_for_best = False
        best_score = float("inf")
        # Try combos
        for i in range(len(self._hand)):
            if self._revealed[i]:
                continue
            for swap in [True, False]:
                test_hand = self._hand.copy()
                test_revealed = self._revealed.copy()
                if swap:  # simulate replacing card at index i with option_card
                    test_hand[i] = option_card
                    test_revealed[i] = True
                else:  # simulate revealing card at index i
                    test_revealed[i] = True
                # Calculate known/assumed score
                known_test_hand = [
                    v
                    for j, v in enumerate(test_hand)
                    if (test_revealed[j] or j < self._peek_count)
                ]
                score = get_hand_score(known_test_hand)
                score += sum(
                    [
                        6
                        for j in range(len(test_hand))
                        if (not test_revealed[j] and j >= self._peek_count)
                    ]
                )
                # Check if new best
                if score < best_score:
                    best_score = score
                    best_index = i
                    replace_for_best = swap
        # Return the best option
        if replace_for_best:
            return self._replace_slot(best_index, option_card)
        else:
            self._reveal_slot(best_index)
            return option_card


# ============================================================================
# Deck
# ============================================================================


class Deck:
    """Represents a deck of cards for the game.
    Shuffles and adds one card to discard pile on initialization.

    Cards are represented as integers from 0 to 51, where:
    - Suit is range of 13 consecutive numbers (i.e. 0-12 are a suit A-K)
    - Suits ordered as: Spades, Hearts, Clubs, Diamonds
    """

    def __init__(self, reshuffle_on_loop: bool = False):
        self._draw_pile = list(range(52))
        random.shuffle(self._draw_pile)
        self._discard_pile = [self._draw_pile.pop()]
        self._reshuffle_on_loop = reshuffle_on_loop

    def deal(self, num_hands: int, num_cards: int) -> list[list[int]]:
        """Deals a number of hands with a specified number of cards each."""
        hands: list[list[int]] = []
        for _ in range(num_hands):
            hand: list[int] = []
            for _ in range(num_cards):
                hand.append(self.draw())
            hands.append(hand)
        return hands

    def draw(self) -> int:
        """Draws the card from the top of the deck."""
        if not self._draw_pile:
            self.refill_draw()
        return self._draw_pile.pop()

    def is_empty(self) -> bool:
        """Checks if the deck is empty."""
        return len(self._draw_pile) == 0

    def discard(self, card: int):
        """Discards a card to the discard pile."""
        self._discard_pile.append(card)

    def check_top_discard(self) -> int:
        """Returns the top card of the discard pile without removing it."""
        if not self._discard_pile:
            raise ValueError("Discard pile is empty.")  # Should not happen
        return self._discard_pile[-1]

    def take_top_discard(self) -> int:
        """Takes the top card of the discard pile and removes it from the pile."""
        if not self._discard_pile:
            raise ValueError("Discard pile is empty.")  # Should not happen
        return self._discard_pile.pop()

    def refill_draw(self):
        """Puts all cards in the discard pile (except the top card) back into the draw pile."""
        self._draw_pile = self._discard_pile[-2::-1] + self._draw_pile
        self._discard_pile = [self._discard_pile[-1]]
        if self._reshuffle_on_loop:
            random.shuffle(self._draw_pile)
