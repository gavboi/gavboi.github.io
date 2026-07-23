import numpy as np


def normalize_probability_list(p: list[np.float64]) -> list[np.float64]:
    total = sum(p)
    if total == 1 or total == 0:
        return p
    return [i / total for i in p]


def calculate_rolls_per_duration(
    duration_s: int, dice: int, sec_per_roll: float
) -> int:
    die_rolls = duration_s / sec_per_roll
    total_rolls = int(dice * die_rolls)
    return total_rolls
