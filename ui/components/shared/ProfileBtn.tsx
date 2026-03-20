import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  CreditCard,
  LogOut,
  Palette,
  PanelRight,
  UserRound,
} from "lucide-react";
import { useTheme } from "../ui/ThemeBtn";
import { useSidebar } from "../ui/sidebar";
import { useAppSelector } from "@/providers/redux/redux-provider";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogAction,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogHeader,
  AlertDialogFooter,
} from "../ui/alert-dialog";
import { logoutAction } from "@/actions/logout";
import { useDispatch } from "react-redux";
import { setUser } from "@/store/slice/user-slice";
import { useRouter } from "next/navigation";
import { useKeyPress } from "@/hooks/use-keyPress";
import { CKbd } from "../custom/CKbd";

const ProfileBtn = ({
  className,
  onlyAvatar = false,
}: {
  className?: string;
  onlyAvatar?: boolean;
}) => {
  const dispatch = useDispatch();

  const router = useRouter();

  const { user } = useAppSelector((state) => state.user);

  const { isDark, setTheme } = useTheme();

  const themeValue = isDark ? "dark" : "light";

  const handleThemeChange = (value: string) => {
    if (value === "dark") setTheme(true);
    else if (value === "light") setTheme(false);
  };

  const { toggleSidebar, open } = useSidebar();

  const handleLogout = async () => {
    dispatch(setUser(undefined));
    logoutAction();
    router.refresh();
  };

  useKeyPress("t", () => {
    handleThemeChange(themeValue === "dark" ? "light" : "dark");
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        className={cn("h-10 w-full cursor-pointer px-2", className)}
      >
        <div className="flex items-center gap-2">
          <Avatar className="size-7">
            <AvatarImage src={user?.photo || ""} />
            <AvatarFallback>
              {user?.name.slice(0, 1).toUpperCase() || <UserRound />}
            </AvatarFallback>
          </Avatar>
          {!onlyAvatar && (
            <div className="flex flex-col -space-y-0.5 text-xs">
              <span className="line-clamp-1">{user?.name || ""}</span>
              <span className="text-muted-foreground line-clamp-1">
                {user?.email || ""}
              </span>
            </div>
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-full" align="end">
        <DropdownMenuGroup>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuItem>
            <UserRound />
            Profile
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>View</DropdownMenuLabel>
          {!onlyAvatar && (
            <DropdownMenuItem onSelect={toggleSidebar}>
              <PanelRight className="rotate-180" />
              {open ? "Hide" : "Show"} Sidebar
              <DropdownMenuShortcut>
                <CKbd>s</CKbd>
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          )}
          <DropdownMenuSub>
            <DropdownMenuSubTrigger showArrow={false}>
              <Palette />
              Theme
              <DropdownMenuShortcut>
                <CKbd>t</CKbd>
              </DropdownMenuShortcut>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuRadioGroup
                  value={themeValue}
                  onValueChange={handleThemeChange}
                >
                  <DropdownMenuLabel>Appearance</DropdownMenuLabel>
                  <DropdownMenuRadioItem value="dark">
                    Dark
                  </DropdownMenuRadioItem>
                  <DropdownMenuRadioItem value="light">
                    Light
                  </DropdownMenuRadioItem>
                </DropdownMenuRadioGroup>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem
                onSelect={(e) => e.preventDefault()}
                variant="destructive"
              >
                <LogOut />
                Sign out
              </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Sign out</AlertDialogTitle>
                <AlertDialogDescription>
                  Are you sure you want to sign out? After signing out, you will
                  be redirected to the login page.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <div className="flex justify-center gap-2">
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Sign out
                  </AlertDialogAction>
                </div>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ProfileBtn;
