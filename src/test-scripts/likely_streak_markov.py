from helper import calculate_rolls_per_duration
import numpy as np
from numpy.typing import NDArray


def generate_p(absorbing_streak: int, sides: int) -> NDArray[np.float64]:
    arr_list: list[NDArray[np.float64]] = []
    for i in range(absorbing_streak):
        arr = np.zeros(absorbing_streak + 1, dtype=np.float64)
        arr[0] = (sides - 1) / sides
        arr[i + 1] = 1 / sides
        arr_list.append(arr)
    absorbing_arr = np.zeros(absorbing_streak + 1, dtype=np.float64)
    np.put(absorbing_arr, -1, 1)
    arr_list.append(absorbing_arr)
    p = np.array(arr_list)
    return p


def calculate_longest_likely_streak(
    show_results: bool,
    target_probability: float,
    duration_s: int,
    dice: int,
    sides: int,
    roll_spd_s: float,
) -> list[np.float64]:
    # Determine how many rolls will be made in the given duration
    total_rolls = calculate_rolls_per_duration(duration_s, dice, roll_spd_s)
    # Incrementally check probability of streak being reached
    probability_exceeded = False
    absorbing_streak = 0
    results = [np.float64(1)]
    while not probability_exceeded:
        absorbing_streak += 1
        pi = np.zeros(absorbing_streak + 1, dtype=np.float64)
        pi[0] = 1
        P = generate_p(absorbing_streak, sides)
        Pn = np.linalg.matrix_power(P, total_rolls)
        pi_n = np.dot(pi, Pn)
        probability_exceeded = pi_n[-1] < target_probability
        results.append(pi_n[-1])
    if show_results:
        print(
            f"Probability of reaching streak: {[round(i.item(), 5) for i in results]}"
        )
        print(
            f"After {duration_s}s, longest streak with probability "
            + f"greater than {target_probability} is {absorbing_streak - 1}."
        )
    return results


TARGET_PROBABILITY = 0.5
DURATION_S = 60
DICE = 1
SIDES = 6
ROLL_SPD_S = 3

if __name__ == "__main__":
    print("\n")
    calculate_longest_likely_streak(
        show_results=True,
        target_probability=TARGET_PROBABILITY,
        duration_s=DURATION_S,
        dice=DICE,
        sides=SIDES,
        roll_spd_s=ROLL_SPD_S,
    )
    print("\n")
