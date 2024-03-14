"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/lib/hooks";

function CheckboxWrapper(prop: { text: string }) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {prop.text}
      </label>
    </div>
  );
}

function Events() {
  let labels = ["Studia", "Prywatne", "Praca"];
  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["item-1", "item-2"]}
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Wydarzenia</AccordionTrigger>
        <AccordionContent>
          <CheckboxWrapper text="Wszystkie wydarzenia" />
        </AccordionContent>
        {labels.map((label) => (
          <AccordionContent key={label}>
            <CheckboxWrapper text={label} />
          </AccordionContent>
        ))}
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Zadania</AccordionTrigger>
        <AccordionContent>
          <CheckboxWrapper text="Wszystkie zadania" />
        </AccordionContent>
        {labels.map((label) => (
          <AccordionContent key={label}>
            <CheckboxWrapper text={label} />
          </AccordionContent>
        ))}
      </AccordionItem>
    </Accordion>
  );
}

export default function SideBar() {
  const isOpen = useAppSelector((state) => state.sidebar.isToggled);
  return (
    <div
      className={cn(
        "relative top-0 left-0 px-2 overflow-hidden transition-all duration-500 ease-in-out",
        isOpen ? "w-[300px]" : "w-[0px]",
      )}
    >
      <div className="flex flex-col gap-y-5 text-clip overflow-hidden text-nowrap">
        <Events />
        <small className="text-clip overflow-hidden text-nowrap">
          Zadania na dziś
        </small>
      </div>
    </div>
  );
}
