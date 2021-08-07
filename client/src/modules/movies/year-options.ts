import { SelectOption } from '../../common/components/Select';

const MIN_YEAR = 1900;
const MAX_YEAR = new Date().getFullYear() + 20;

export function createYearOptions(): SelectOption[] {
  const count = MAX_YEAR - MIN_YEAR;
  return Array.from({ length: count }, (_, i) => {
    const y = (MIN_YEAR + i).toString();
    return [y, y];
  });
}
