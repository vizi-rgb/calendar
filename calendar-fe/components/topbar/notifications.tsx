import { Button } from "@/components/ui/button";
import { BellIcon } from "@radix-ui/react-icons";
import * as React from "react";

export default function Notifications() {
  return (
    <Button variant="ghost" size="icon">
      <BellIcon className="size-4 rotate-0" />
    </Button>
  );
}
