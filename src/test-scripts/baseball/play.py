from enum import Enum

from game import (
    AILowPlayer,
    AIPairPlayer,
    AIRandomPlayer,
    Deck,
    DrawAction,
    HumanPlayer,
    Player,
    get_card,
)

# ============================================================================
# Setup
# ============================================================================


class PlayerType(Enum):
    HUMAN = 1
    AI_LOW = 2
    AI_MEDIUM = 3
    AI_HIGH = 4


def create_players(
    player_types: list[PlayerType], peek_count: int, think_time: float
) -> list[Player]:
    """Creates a list of Player objects based on the provided player types."""
    players: list[Player] = []
    for i, ptype in enumerate(player_types):
        if ptype == PlayerType.HUMAN:
            name = input(f"Enter name for Player {i + 1}: ")
            players.append(HumanPlayer(name, peek_count))
        elif ptype == PlayerType.AI_LOW:
            players.append(AIRandomPlayer(f"P{i + 1} (BOT)", peek_count, think_time))
        elif ptype == PlayerType.AI_MEDIUM:
            players.append(AILowPlayer(f"P{i + 1} (BOT)", peek_count, think_time))
        elif ptype == PlayerType.AI_HIGH:
            players.append(AIPairPlayer(f"P{i + 1} (BOT)", peek_count, think_time))
    return players


# ============================================================================
# Print Helpers
# ============================================================================


def show_scoreboard(players: list[Player]) -> None:
    """Prints the scoreboard with player names and their total points."""
    print("\nScoreboard:")
    for player in sorted(players, key=lambda p: p.get_points()):
        print(f"{player.name}: {player.get_points()} points")


def show_round_title(round_num: int, max_round: int) -> None:
    """Prints the title for the current round."""
    print(f"\n\n=== Round {round_num}/{max_round} ===")


# ============================================================================
# Play
# ============================================================================


def play(players: list[Player], rounds: int, card_count: int, quiet: bool) -> None:
    """Plays a game of baseball with the players and parameters provided."""
    for round_num in range(1, rounds + 1):
        # Setup for the round
        if not quiet:
            show_round_title(round_num, rounds)
        deck = Deck()
        hands = deck.deal(len(players), card_count)
        for i in range(len(players)):
            players[i].set_hand(hands[i])
        # Play the round
        for _ in range(card_count):
            for i in range(len(players)):
                player = players[
                    (i + round_num) % len(players)
                ]  # start different player each round
                if not quiet:
                    private = player.name.endswith("(BOT)")
                    print(f"\n{player.name}'s turn: {player.get_hand_str(private)}")
                visible_card = deck.check_top_discard()
                action = player.pick_card(visible_card)
                drawn_card: int
                if action == DrawAction.DRAW_FROM_DECK:
                    drawn_card = deck.draw()
                    if not quiet:
                        print(f"{player.name} drew a card from the deck.")
                else:  # action == DrawAction.TAKE_FROM_DISCARD
                    drawn_card = deck.take_top_discard()
                    if not quiet:
                        print(
                            f"{player.name} took {get_card(drawn_card)} from the discard pile."
                        )
                discarded_card = player.reveal_card(drawn_card)
                deck.discard(discarded_card)
                if not quiet:
                    print(f"{player.name} discarded {get_card(discarded_card)}")
        # Score the round
        winning_score = min(player.get_hand_points() for player in players)
        for i in range(len(players)):
            player = players[(i + round_num) % len(players)]
            if not quiet:
                print(
                    f"\n{player.name}'s final hand: {player.get_hand_str()} | Score: {player.get_hand_points()}"
                )
            if player.get_hand_points() == winning_score:
                player.score_hand(is_win=True)
            else:
                player.score_hand(is_win=False)
        if not quiet:
            show_scoreboard(players)
    # Announce the winner
    for player in players:
        player.print_stats()  # Print stats for each player
    winner = min(players, key=lambda p: p.get_points())
    print(
        f"\n\n=== Game Over ===\nWinner: {winner.name} with {winner.get_points()} points!"
    )
