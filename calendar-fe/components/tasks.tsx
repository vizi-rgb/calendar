import { Button } from "@/components/ui/button";
import { CheckboxIcon } from "@radix-ui/react-icons";
import * as React from "react";

export default function Tasks() {
  return (
    <Button variant="ghost" size="icon">
      <CheckboxIcon className="size-4 rotate-0" />
    </Button>
  );
}
