export type SelectOption = readonly [key: string, value: string];

interface SelectProps {
  options: ReadonlyArray<SelectOption>;
  onValueChange: (value: string) => void;
  selectedValue?: string;
}

const Select: React.FC<SelectProps> = ({
  options,
  onValueChange = () => {},
  selectedValue,
  ...rest
}) => {
  return (
    <select
      defaultValue={selectedValue}
      onChange={({ target: { value } }) => onValueChange(value)}
      {...rest}
    >
      {options.map(([value, text]) => (
        <option key={value} value={value}>
          {text}
        </option>
      ))}
    </select>
  );
};

export default Select;
