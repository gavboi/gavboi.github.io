import argparse

from play import PlayerType, create_players, play


def main():
    # Set up argument parser
    parser = argparse.ArgumentParser(description="Play the baseball card game.")
    parser.add_argument(
        "mode", help="One of (e)asy, (m)edium, (h)ard, (s)olo, (t)wo Player"
    )
    parser.add_argument(
        "-r",
        "--rounds",
        type=int,
        default="9",
        help="Number of rounds to play (default: %(default)s)",
    )
    parser.add_argument(
        "-p",
        "--peek-count",
        type=int,
        default="2",
        help="Number of cards to peek at in hand (default: %(default)s)",
    )
    parser.add_argument(
        "-c",
        "--card-count",
        type=int,
        default="4",
        help="Number of cards per hand (default: %(default)s)",
    )
    parser.add_argument(
        "-q",
        "--quiet",
        action="store_true",
        help="Suppress mid-game output (default: %(default)s)",
    )
    parser.add_argument(
        "-b",
        "--bots-only",
        action="store_true",
        help="Play a game with only AI players (default: %(default)s)",
    )

    # Parse arguments and validate
    args = parser.parse_args()
    if args.rounds < 1:
        print("Error: Number of rounds must be at least 1.")
        return
    if args.card_count < 1:
        print("Error: Card count must be at least 1.")
        return
    if args.peek_count < 0 or args.peek_count > args.card_count:
        print(
            "Error: Peek count must be non-negative and less than or equal to the card count."
        )
        return

    # Handle specific case that doesn't make sense
    if args.bots_only and args.mode == "t":
        args.mode = (
            "h"  # Default to hard mode if bots-only is selected with two-player mode
        )

    # Create players
    count = 1 if args.mode == "s" else 2
    bot_diff = {
        "e": PlayerType.AI_LOW,
        "m": PlayerType.AI_MEDIUM,
        "h": PlayerType.AI_HIGH,
    }
    bot_with_diff = bot_diff.get(args.mode, PlayerType.AI_HIGH)
    if args.bots_only:
        player_types = [bot_with_diff] * count
    elif args.mode == "t":
        player_types = [PlayerType.HUMAN, PlayerType.HUMAN]
    else:
        player_types = [PlayerType.HUMAN] + [bot_with_diff] * (count - 1)
    players = create_players(player_types, args.peek_count, 0 if args.quiet else 1.0)

    # Play
    play(players, args.rounds, args.card_count, args.quiet)


if __name__ == "__main__":
    main()
