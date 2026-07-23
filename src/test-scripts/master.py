from steady_state_markov import calculate_steady_state_probability, generate_r
from likely_streak_markov import calculate_longest_likely_streak
from roll_sim import simulate
from helper import calculate_rolls_per_duration, normalize_probability_list
import numpy as np


def main():
    run = True
    while run:
        print("\n")
        print("(1) Run roll simulation")
        print(
            "(2) Calculate steady-state probabilities for streaks and average reward per roll/EPPM1"
        )
        print("(3) Calculate longest likely streak for given probability and duration")
        print("(4) Calculate expected reward per duration (EPPM2)")
        print("(0) Exit")
        choice = input("Enter number: ")
        match choice.strip():
            case "1":
                trials = int(input("Number of trials (int): ").strip())
                simulated_seconds = int(
                    input("Simulated seconds per trial (int): ").strip()
                )
                base_reward = int(input("Base reward (int): ").strip())
                multiplier = int(input("Streak multiplier (int): ").strip())
                dice = int(input("Number of dice (int): ").strip())
                sides = int(input("Number of sides per die (int): ").strip())
                roll_spd_s = float(input("Die roll time in seconds (float): ").strip())
                print()
                simulate(
                    show_results=True,
                    trials=trials,
                    simulated_seconds=simulated_seconds,
                    base_reward=base_reward,
                    multiplier=multiplier,
                    dice=dice,
                    sides=sides,
                    roll_spd_s=roll_spd_s,
                )
            case "2":
                max_iter = int(input("Max iterations (int): ").strip())
                base_reward = int(input("Base reward (int): ").strip())
                multiplier = int(input("Streak multiplier (int): ").strip())
                dice = int(input("Number of dice (int): ").strip())
                sides = int(input("Number of sides per die (int): ").strip())
                roll_spd_s = float(input("Die roll time in seconds (float): ").strip())
                print()
                calculate_steady_state_probability(
                    show_results=True,
                    max_iter=max_iter,
                    base_reward=base_reward,
                    multiplier=multiplier,
                    dice=dice,
                    sides=sides,
                    roll_spd_s=roll_spd_s,
                )
            case "3":
                target_probability = float(
                    input("Target probability (float): ").strip()
                )
                duration_s = int(input("Seconds of rolling (int): ").strip())
                dice = int(input("Number of dice (int): ").strip())
                sides = int(input("Number of sides per die (int): ").strip())
                roll_spd_s = float(input("Die roll time in seconds (float): ").strip())
                print()
                calculate_longest_likely_streak(
                    show_results=True,
                    target_probability=target_probability,
                    duration_s=duration_s,
                    dice=dice,
                    sides=sides,
                    roll_spd_s=roll_spd_s,
                )
            case "4":
                # take parameters
                show_progress = (
                    input("Show progress logs? (y/n): ").strip().lower() == "y"
                )
                duration_s = int(input("Seconds of rolling (int): ").strip())
                base_reward = int(input("Base reward (int): ").strip())
                multiplier = int(input("Streak multiplier (int): ").strip())
                dice = int(input("Number of dice (int): ").strip())
                sides = int(input("Number of sides per die (int): ").strip())
                roll_spd_s = float(input("Die roll time in seconds (float): ").strip())
                target_probability = float(
                    input("Probability required to consider streak (float): ").strip()
                )
                if show_progress:
                    print()
                # imported calculations (markov)
                rolls_per_duration = calculate_rolls_per_duration(
                    duration_s, dice, roll_spd_s
                )
                if show_progress:
                    print(f"Rolls in {duration_s}s = {rolls_per_duration}\n")
                steady_state_probabilities = calculate_steady_state_probability(
                    show_results=show_progress,
                    max_iter=100,
                    base_reward=base_reward,
                    multiplier=multiplier,
                    dice=dice,
                    sides=sides,
                    roll_spd_s=roll_spd_s,
                )
                if show_progress:
                    print()
                streak_probabilities = calculate_longest_likely_streak(
                    show_results=show_progress,
                    target_probability=target_probability,
                    duration_s=duration_s,
                    dice=dice,
                    sides=sides,
                    roll_spd_s=roll_spd_s,
                )
                # combine results
                likely_steady_state_probabilities: list[np.float64] = []
                for i, n in enumerate(streak_probabilities):
                    if n > target_probability and i < len(steady_state_probabilities):
                        likely_steady_state_probabilities.append(
                            steady_state_probabilities[i]
                        )
                normalized_likely_steady_state_probabilities: list[np.float64] = (
                    normalize_probability_list(likely_steady_state_probabilities)
                )
                # calculate per duration expected reward
                R = generate_r(
                    len(normalized_likely_steady_state_probabilities),
                    base_reward,
                    multiplier,
                )
                expected = np.dot(normalized_likely_steady_state_probabilities, R)
                points_per_min_expected = expected * calculate_rolls_per_duration(
                    duration_s, dice, roll_spd_s
                )
                print()
                print(
                    f"Normalized likely steady-state probabilities: {[round(p.item(), 5) for p in normalized_likely_steady_state_probabilities]}"
                )
                print(f"Expected reward per roll: {expected}")
                print(f"Expected reward per minute (V2): {points_per_min_expected}")
            case "0":
                run = False
            case _:
                print("Unknown choice.")
    print("Stopped.")


if __name__ == "__main__":
    main()
