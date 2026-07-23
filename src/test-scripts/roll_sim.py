from random import randint
from statistics import median
from time import time
from math import inf


def roll(sides: int) -> bool:
    """Rolls a `sides`-sided die and returns if
    the roll was a success or not.
    """
    n = randint(1, sides)
    return n == 1


def running_mean(current_mean: float, next_number: float, new_count: int) -> float:
    """Calculate the mean by adding one number at a time.
    Returns new mean.
    """
    old = current_mean * (new_count - 1) / new_count
    new = next_number / new_count
    return old + new


def simulate(
    show_results: bool,
    trials: int,
    simulated_seconds: int,
    base_reward: int,
    multiplier: int,
    dice: int,
    sides: int,
    roll_spd_s: float,
) -> int:
    die_rolls_per_trial = simulated_seconds / roll_spd_s
    rolls_per_trial = int(dice * die_rolls_per_trial)
    # overall stats
    all_max_streak = 0
    all_max_points = 0
    all_min_points = inf
    all_mean = 0
    totals: list[int] = []
    log_time = 0
    start_time = time()
    for t in range(trials):
        # trial stats
        streak = 0
        max_streak = 0
        points = 0
        if show_results and log_time + 0.1 < time():
            print(f"\rTrial {t}/{trials}", end="")
            log_time = time()
        # trial
        for _ in range(rolls_per_trial):
            if roll(sides):
                streak = streak + 1
                points = points + (base_reward * multiplier ** (streak - 1))
                max_streak = max(streak, max_streak)
            else:
                streak = 0
        # store stats from trial
        all_max_streak = max(all_max_streak, max_streak)
        all_max_points = max(all_max_points, points)
        all_min_points = min(all_min_points, points)
        totals.append(points)
        all_mean = running_mean(all_mean, points, t + 1)
    median_points = int(median(totals))
    # log result
    if show_results:
        print(f"\r{trials} trials completed in {int(time()-start_time)}s:")
        print(f"Max streak: {all_max_streak}")
        print(f"Max points: {all_max_points}")
        print(f"Min points: {all_min_points}")
        print(f"Mean points: {all_mean}")
        print(f"Median points: {median_points}")
    return median_points


# Simulation settings
TRIALS = 1_000_000
SIMULATED_SECONDS = 60
# Upgrade modifiers (NOT raw level)
BASE_REWARD = 1
MULTIPLIER = 1
DICE = 1
SIDES = 6
ROLL_SPD_S = 3

if __name__ == "__main__":
    print("\n")
    simulate(
        show_results=True,
        trials=TRIALS,
        simulated_seconds=SIMULATED_SECONDS,
        base_reward=BASE_REWARD,
        multiplier=MULTIPLIER,
        dice=DICE,
        sides=SIDES,
        roll_spd_s=ROLL_SPD_S,
    )
    print("\n")
