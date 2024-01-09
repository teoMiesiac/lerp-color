import { clamp } from "../../utils/clamp";

type RGBColor = {
  r: number;
  g: number;
  b: number;
};

type LerpRGB = {
  beginRGB: RGBColor;
  endRGB: RGBColor;
  position: number;
};

/**
 * Linearly interpolates between two RGB colors.
 * Mixes two colors to generate an intermediate color using the specified interpolation factor, denoted by the "position" parameter.
 * When "position" is 0, the result equals the "begin" color, and as "position" increases, it approaches the "end" color.
 * For instance, 0.1 yields a color close to the first, 0.5 corresponds to a midpoint blend, and so forth.
 * To ensure valid color output, negative values for "position" are treated as 0, and values exceeding 1 are capped at 1.
 * This diverges from the behavior of linear interpolation (lerp) and is crucial to prevent unexpected color outcomes when "position" falls outside the interval [0, 1].
 *
 * @param {RGBColor} beginRGB - The left color.
 * @param {RGBColor} endRGB - The right color.
 * @param {number} position - The position between the left and right colors.
 * @returns {RGBColor} The interpolated color as an RGB object {r,g,b}
 */
export const lerpRGB = ({ beginRGB, endRGB, position }: LerpRGB): RGBColor => {
  const result = {} as RGBColor;
  position = clamp(position, 0, 1);

  Object.keys(beginRGB).forEach((key) => {
    const numericKey = key as keyof RGBColor;
    result[numericKey] = Math.round(
      beginRGB[numericKey] +
        (endRGB[numericKey] - beginRGB[numericKey]) * position
    );
  });

  return result;
};
