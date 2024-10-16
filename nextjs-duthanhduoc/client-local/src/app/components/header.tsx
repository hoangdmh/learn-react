import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import Link from 'next/link'
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <>
      <div className="flex justify-between">      
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Link href="/">Home</Link>
            </MenubarTrigger>
          </MenubarMenu>

          <MenubarMenu>
            <MenubarTrigger>Author</MenubarTrigger>
            <MenubarContent>
              <MenubarItem>
                <Link href="/register">Register</Link>
              </MenubarItem>
              <MenubarItem>
                <Link href="/login">Login</Link>
              </MenubarItem>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Profiles</MenubarTrigger>
            <MenubarContent>
              <MenubarSeparator />
              <MenubarItem inset>Edit...</MenubarItem>
              <MenubarSeparator />
              <MenubarItem inset>Add Profile...</MenubarItem>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        <ModeToggle />
      </div>
    </>
  )
}
export default Header;