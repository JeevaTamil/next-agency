import React from "react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Home, Truck, Users, Users2 } from "lucide-react";
import { Box } from "@radix-ui/themes";
import { Separator } from "./ui/separator";
const NavBar = () => {
  const navItems = [
    {
      label: "Customer",
      href: "/customers",
      icon: Users,
    },
    {
      label: "Suppliers",
      href: "/suppliers",
      icon: Users2,
    },
    {
      label: "Transports",
      href: "/transports",
      icon: Truck,
    },
  ];

  return (
    <Box className="flex">
      <NavigationMenu className="mr-10 px-3">
        <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
          <Home />
        </NavigationMenuLink>
      </NavigationMenu>
      <NavigationMenu className="p-3 flex space-x-4">
        {navItems.map((item) => (
          <NavigationMenuLink
            key={item.href}
            href={item.href}
            className={navigationMenuTriggerStyle()}
          >
            <item.icon width="12" height="12" />
            <span className="px-3">{item.label}</span>
          </NavigationMenuLink>
        ))}
      </NavigationMenu>
    </Box>
  );
};

export default NavBar;
