from helper import calculate_rolls_per_duration
import math
import numpy as np
from numpy.typing import NDArray


def generate_p(n: int, sides: int) -> NDArray[np.float64]:
    arr_list: list[NDArray[np.float64]] = []
    for i in range(n):
        arr = np.zeros(n, dtype=np.float64)
        arr[0] = (sides - 1) / sides
        arr[min(i + 1, n - 1)] = 1 / sides
        arr_list.append(arr)
    p = np.array(arr_list)
    return p


def generate_r(s: int, base: float, mult: float) -> list[float]:
    r: list[float] = [0.0]
    for i in range(s - 1):
        r.append(base * math.pow(mult, i))
    return r


def steady_state_power_method(
    show_results: bool, P: NDArray[np.float64], tol: float, max_iter: int
) -> NDArray[np.float64]:
    n = P.shape[0]
    pi = np.zeros(n, dtype=np.float64)
    pi[0] = 1
    iter_completed = 0

    for i in range(max_iter):
        new_pi = np.dot(pi, P)
        iter_completed = i + 1
        if np.linalg.norm(new_pi - pi) < tol:
            if show_results:
                print(f"Change did not surpass tolerance at iteration {i}.")
            break
        pi = new_pi

    if show_results:
        print(f"{iter_completed - 1}/{max_iter} iterations completed.")
    return pi


def calculate_steady_state_probability(
    show_results: bool,
    max_iter: int,
    base_reward: int,
    multiplier: int,
    dice: int,
    sides: int,
    roll_spd_s: float,
) -> NDArray[np.float64]:
    P = generate_p(max_iter, sides)
    R = generate_r(max_iter, base_reward, multiplier)

    steady_probs = steady_state_power_method(
        show_results, P, tol=1e-9, max_iter=max_iter
    )
    steady_preview = [round(i.item(), 5) for i in steady_probs[:5]] + ["..."]
    if show_results:
        print(f"Steady-State Probabilities (Power Method): {steady_preview}")

    expected = np.dot(steady_probs, R)
    if show_results:
        print(f"Expected reward per roll: {expected}")

    per_min = calculate_rolls_per_duration(60, dice, roll_spd_s) * expected
    if show_results:
        print(f"Expected reward per minute (V1): {per_min}")

    return steady_probs


# GO
MAX_ITER = 100
BASE_REWARD = 3
MULTIPLIER = 4
DICE = 3
SIDES = 4
ROLL_SPD_S = 1

if __name__ == "__main__":
    print("\n")
    calculate_steady_state_probability(
        show_results=True,
        max_iter=MAX_ITER,
        base_reward=BASE_REWARD,
        multiplier=MULTIPLIER,
        dice=DICE,
        sides=SIDES,
        roll_spd_s=ROLL_SPD_S,
    )
    print("\n")
