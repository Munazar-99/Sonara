import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select";
import { CalendarIcon } from "lucide-react";
  
  const getCurrentMonthIndex = () => new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  interface MonthSelectProps {
    value: string;
    onValueChange: (value: string) => void;
  }
  
  export function MonthSelect({ value, onValueChange }: MonthSelectProps) {
    const currentMonthIndex = getCurrentMonthIndex() + 1;
  
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[180px] rounded-xl dark:bg-zinc-800/80 dark:border-gray-600 border-gray-300">
          <CalendarIcon className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <SelectValue placeholder={`Select month ${currentYear}`} />
        </SelectTrigger>
        <SelectContent>
          {months.slice(0, currentMonthIndex).map((month, index) => (
            <SelectItem key={index} value={(index + 1).toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  }
  