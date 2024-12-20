import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import * as React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearAuthorizedUser } from "@/lib/features/authorization/authorization-slice";
import { useRouter } from "next/navigation";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { ROUTES } from "@/constants/route-contants";
import { useCalendarExportMutation } from "@/api/calendar/calendar-mutation";

const LogoutAlert = ({
  open,
  onOpenChange,
  onLogout,
}: {
  open: boolean;
  onOpenChange: (value: boolean) => void;
  onLogout: () => void;
}) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Za chwilę nastąpi wylogowanie z konta
          </AlertDialogTitle>
          <AlertDialogDescription>
            Czy na pewno chcesz kontynuować?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Anuluj</AlertDialogCancel>
          <AlertDialogAction
            className={buttonVariants({ variant: "destructive" })}
            onClick={onLogout}
          >
            Kontynuuj
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

function DropdownForAvatar({
  name,
  surname,
  email,
  pictureUrl,
}: {
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  pictureUrl: string | undefined;
}) {
  const [isOpen, setIsOpen] = React.useState(false);
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.authorization.user);
  const exportCalendar = useCalendarExportMutation();
  const router = useRouter();
  const handleLogout = () => {
    router.push(ROUTES.LOGIN);
    dispatch(clearAuthorizedUser());
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="size-10">
            <AvatarImage src={pictureUrl} alt="Profile picture" />
            <AvatarFallback>{name?.at(0) + "" + surname?.at(0)}</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Moje konto</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => router.push(ROUTES.PROFILE)}>
              Profil
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem>
              Ustawienia
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                Udostępnij kalendarz
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>Email</DropdownMenuItem>
                  <DropdownMenuItem>Message</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>More...</DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem
              onClick={() => exportCalendar.mutate(user.userId)}
            >
              Eksportuj kalendarz
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Co nowego? </DropdownMenuItem>
          <DropdownMenuItem disabled>Statystyki</DropdownMenuItem>
          <DropdownMenuItem>Pomoc</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            Wyloguj się
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutAlert
        open={isOpen}
        onOpenChange={setIsOpen}
        onLogout={handleLogout}
      />
    </>
  );
}

export default function AvatarWithName({
  name,
  surname,
  email,
  pictureUrl,
}: {
  name: string | undefined;
  surname: string | undefined;
  email: string | undefined;
  pictureUrl: string | undefined;
}) {
  return (
    <div className="flex flex-row items-center gap-x-2.5">
      <small>{`${name ?? ""} ${surname ?? ""}`}</small>
      <DropdownForAvatar
        name={name}
        surname={surname}
        email={email}
        pictureUrl={pictureUrl}
      />
    </div>
  );
}
