import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SelectOption {
  value: string;
  label: string;
}

interface PropType {
  onChange: (value: string) => void;
  value: string;
  selectOptions: SelectOption[];
}

const EventFrequencySelect = (field: PropType) => {
  return (
    <Select onValueChange={field.onChange} value={field.value}>
      <SelectTrigger>
        <SelectValue placeholder="Wybierz" />
      </SelectTrigger>
      <SelectContent>
        {field.selectOptions.map((option: SelectOption, index: number) => (
          <SelectItem value={option.value} key={index}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default EventFrequencySelect;
