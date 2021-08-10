export type SelectOption = readonly [key: string, value: string];

interface SelectProps {
  options: ReadonlyArray<SelectOption>;
  value?: string;
  onValueChange: (value: string) => void;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onValueChange = () => {},
  ...rest
}) => {
  return (
    <select
      value={value}
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
