/** Inclusive month span, matching LinkedIn experience duration. */
export function formatExperienceDuration(
  start: string,
  end: string | "present" = "present",
  now = new Date(),
) {
  const [startYear, startMonth] = start.split("-").map(Number);
  const [endYear, endMonth] =
    end === "present"
      ? [now.getFullYear(), now.getMonth() + 1]
      : end.split("-").map(Number);

  const totalMonths = (endYear - startYear) * 12 + (endMonth - startMonth) + 1;
  if (totalMonths <= 0) {
    return "Less than a month";
  }

  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const parts: string[] = [];

  if (years === 1) parts.push("1 yr");
  else if (years > 1) parts.push(`${years} yrs`);

  if (months === 1) parts.push("1 mo");
  else if (months > 1) parts.push(`${months} mos`);

  return parts.join(" ");
}
