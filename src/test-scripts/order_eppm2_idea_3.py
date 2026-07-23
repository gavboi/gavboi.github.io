from collections.abc import Callable
from likely_streak_markov import calculate_longest_likely_streak
from steady_state_markov import calculate_steady_state_probability, generate_r
from helper import calculate_rolls_per_duration, normalize_probability_list
import numpy as np

TARGET_PROBABILITY = 0.3
DURATION_S = 60


def calculate_eppm2(
    base_reward: int,
    multiplier: int,
    dice: int,
    sides: int,
    roll_spd_s: float,
    show_result: bool = False,
):
    # individual calculations
    steady_state_probabilities = calculate_steady_state_probability(
        show_results=False,
        max_iter=100,
        base_reward=base_reward,
        multiplier=multiplier,
        dice=dice,
        sides=sides,
        roll_spd_s=roll_spd_s,
    )
    streak_probabilities = calculate_longest_likely_streak(
        show_results=False,
        target_probability=TARGET_PROBABILITY,
        duration_s=DURATION_S,
        dice=dice,
        sides=sides,
        roll_spd_s=roll_spd_s,
    )
    # combine results
    likely_steady_state_probabilities: list[np.float64] = []
    for i, n in enumerate(streak_probabilities):
        if n > TARGET_PROBABILITY and i < len(steady_state_probabilities):
            likely_steady_state_probabilities.append(steady_state_probabilities[i])
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
        DURATION_S, dice, roll_spd_s
    )
    if show_result:
        print(
            f"{base_reward=} {multiplier=} {dice=} {sides=} {roll_spd_s=} | {points_per_min_expected:.6f}"
        )
    return points_per_min_expected


class Upgrade:
    def __init__(self, name: str, lvl_to_effect: Callable[[int], float], max_lvl: int):
        self.name = name
        self.lvl_to_effect = lvl_to_effect
        self.max_lvl = max_lvl
        self.eppm2_result = [-1.0 for _ in range(max_lvl + 1)]

    def get_level_below_eppm2(self, target_eppm2: float, ref_lvl: int) -> int:
        for lvl in range(self.max_lvl + 1):
            lvl_eppm2 = self.eppm2_result[lvl]
            if lvl_eppm2 < 0:
                # change this value to alter first-time calculation
                return lvl
            if lvl_eppm2 >= target_eppm2:
                return max(0, lvl - 1)
        return self.max_lvl

    def get_effect_below_eppm2(self, target_eppm2: float, ref_lvl: int) -> float:
        lvl = self.get_level_below_eppm2(target_eppm2, ref_lvl)
        return self.lvl_to_effect(lvl)

    def set_eppm2(self, lvl: int, eppm2: float) -> bool:
        """Sets EPPM2 for given level. Returns True if value changed, False if not."""
        if lvl < 0 or lvl > self.max_lvl:
            raise ValueError(f"Level {lvl} is out of bounds for upgrade {self.name}")
        if abs(self.eppm2_result[lvl] - eppm2) > 1e-6:
            self.eppm2_result[lvl] = eppm2
            return True
        return False

    def print(self):
        """Display calculated EPPM2 values for each level of the upgrade."""
        print(f"Upgrade: {self.name}")
        for lvl in range(self.max_lvl + 1):
            eppm2 = self.eppm2_result[lvl]
            print(f"  Level {lvl}: EPPM2 = {eppm2:.6f}")

    def copy(self):
        """Creates new Upgrade instance with all the same attributes and values."""
        new_upgrade = Upgrade(self.name, self.lvl_to_effect, self.max_lvl)
        new_upgrade.eppm2_result = self.eppm2_result.copy()
        return new_upgrade


if __name__ == "__main__":
    # prep upgrade classes
    base_reward_upgrade = Upgrade("Base Reward", lambda lvl: 1 + lvl, 4)
    multiplier_upgrade = Upgrade("Multiplier", lambda lvl: 1 + lvl, 4)
    more_dice_upgrade = Upgrade("More Dice", lambda lvl: 1 + lvl, 4)
    less_numbers_upgrade = Upgrade("Less Numbers", lambda lvl: 6 - lvl, 4)
    faster_rolling_upgrade = Upgrade("Faster Rolling", lambda lvl: 3 - 0.5 * lvl, 5)
    # calculate
    max_iter = 30
    broke = False
    for i in range(max_iter):
        # make copies so changes can happen in sync across upgrades
        base_reward_upgrade_temp = base_reward_upgrade.copy()
        multiplier_upgrade_temp = multiplier_upgrade.copy()
        more_dice_upgrade_temp = more_dice_upgrade.copy()
        less_numbers_upgrade_temp = less_numbers_upgrade.copy()
        faster_rolling_upgrade_temp = faster_rolling_upgrade.copy()
        print(f"\n===== Iteration {i + 1}/{max_iter} =====")
        changed = False
        # base reward
        for lvl in range(base_reward_upgrade.max_lvl + 1):
            this_eppm2 = base_reward_upgrade.eppm2_result[lvl]
            base_reward = base_reward_upgrade.lvl_to_effect(lvl)
            multiplier = multiplier_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            dice = more_dice_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            sides = less_numbers_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            roll_spd_s = faster_rolling_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            eppm2 = calculate_eppm2(
                base_reward=int(base_reward),
                multiplier=int(multiplier),
                dice=int(dice),
                sides=int(sides),
                roll_spd_s=roll_spd_s,
            )
            changed = base_reward_upgrade_temp.set_eppm2(lvl, eppm2) or changed
        # multiplier
        for lvl in range(multiplier_upgrade.max_lvl + 1):
            this_eppm2 = multiplier_upgrade.eppm2_result[lvl]
            base_reward = base_reward_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            multiplier = multiplier_upgrade.lvl_to_effect(lvl)
            dice = more_dice_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            sides = less_numbers_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            roll_spd_s = faster_rolling_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            eppm2 = calculate_eppm2(
                base_reward=int(base_reward),
                multiplier=int(multiplier),
                dice=int(dice),
                sides=int(sides),
                roll_spd_s=roll_spd_s,
                show_result=True,
            )
            changed = multiplier_upgrade_temp.set_eppm2(lvl, eppm2) or changed
        # more dice
        for lvl in range(more_dice_upgrade.max_lvl + 1):
            this_eppm2 = more_dice_upgrade.eppm2_result[lvl]
            base_reward = base_reward_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            multiplier = multiplier_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            dice = more_dice_upgrade.lvl_to_effect(lvl)
            sides = less_numbers_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            roll_spd_s = faster_rolling_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            eppm2 = calculate_eppm2(
                base_reward=int(base_reward),
                multiplier=int(multiplier),
                dice=int(dice),
                sides=int(sides),
                roll_spd_s=roll_spd_s,
            )
            changed = more_dice_upgrade_temp.set_eppm2(lvl, eppm2) or changed
        # less numbers
        for lvl in range(less_numbers_upgrade.max_lvl + 1):
            this_eppm2 = less_numbers_upgrade.eppm2_result[lvl]
            base_reward = base_reward_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            multiplier = multiplier_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            dice = more_dice_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            sides = less_numbers_upgrade.lvl_to_effect(lvl)
            roll_spd_s = faster_rolling_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            eppm2 = calculate_eppm2(
                base_reward=int(base_reward),
                multiplier=int(multiplier),
                dice=int(dice),
                sides=int(sides),
                roll_spd_s=roll_spd_s,
            )
            changed = less_numbers_upgrade_temp.set_eppm2(lvl, eppm2) or changed
        # faster rolling
        for lvl in range(faster_rolling_upgrade.max_lvl + 1):
            this_eppm2 = faster_rolling_upgrade.eppm2_result[lvl]
            base_reward = base_reward_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            multiplier = multiplier_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            dice = more_dice_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            sides = less_numbers_upgrade.get_effect_below_eppm2(this_eppm2, lvl)
            roll_spd_s = faster_rolling_upgrade.lvl_to_effect(lvl)
            eppm2 = calculate_eppm2(
                base_reward=int(base_reward),
                multiplier=int(multiplier),
                dice=int(dice),
                sides=int(sides),
                roll_spd_s=roll_spd_s,
            )
            changed = faster_rolling_upgrade_temp.set_eppm2(lvl, eppm2) or changed
        # sync upgrades
        base_reward_upgrade = base_reward_upgrade_temp
        multiplier_upgrade = multiplier_upgrade_temp
        more_dice_upgrade = more_dice_upgrade_temp
        less_numbers_upgrade = less_numbers_upgrade_temp
        faster_rolling_upgrade = faster_rolling_upgrade_temp
        # print
        print()
        base_reward_upgrade.print()
        multiplier_upgrade.print()
        more_dice_upgrade.print()
        less_numbers_upgrade.print()
        faster_rolling_upgrade.print()
        print()
        # break check
        if not changed and i > 0:
            print(
                f"\rNo change surpassed tolerance after {i + 1}/{max_iter} iterations"
            )
            broke = True
            break
    # print results
    if not broke:
        print(f"\rCompleted {max_iter}/{max_iter} iterations without breaking")
