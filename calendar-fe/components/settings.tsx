import { GearIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import * as React from "react";

export default function Settings() {
  return (
    <Button variant="ghost" size="icon">
      <GearIcon className="size-4 rotate-0" />
    </Button>
  );
}
