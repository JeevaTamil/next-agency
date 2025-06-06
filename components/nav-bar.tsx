import { ModeToggle } from "@/components/mode-toggle";
import { Box } from "@radix-ui/themes";
import { Home, ReceiptIndianRupee, Truck, Users, Users2 } from "lucide-react";
import React from "react";
import AgencySelector from "./agency-selector";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";

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
    {
      label: "Bill Entries",
      href: "/bill-entries",
      icon: ReceiptIndianRupee,
    },
    {
      label: "Banks",
      href: "/banks",
      icon: ReceiptIndianRupee,
    },
  ];

  const reports = [
    {
      id: "customer_report",
      label: "Customer Report",
      href: "/reports/customer-report",
      icon: Users,
    },
    {
      id: "supplier_report",
      label: "Supplier Report",
      href: "/reports/supplier-report",
      icon: Users2,
    },
    {
      id: "agent_commission_report",
      label: "Agent Commission Report",
      href: "/reports/agent-commission-report",
      icon: Users2,
    },
  ];

  const ListItem = React.forwardRef<
    React.ElementRef<"a">,
    React.ComponentPropsWithoutRef<"a">
  >(({ className, title, children, ...props }, ref) => {
    function cn(...classes: (string | undefined)[]): string {
      return classes.filter(Boolean).join(" ");
    }
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
              {children}
            </p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  });
  ListItem.displayName = "ListItem";

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
            {/* <item.icon width="12" height="12" /> */}
            <span className="px-3">{item.label}</span>
          </NavigationMenuLink>
        ))}
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Reports</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {reports.map((report) => (
                  <ListItem
                    key={report.id}
                    title={report.label}
                    href={report.href}
                  >
                    {report.label}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Box className="ml-auto p-5">
        <AgencySelector />
      </Box>
      <NavigationMenu className="flex-auto">
        <Box className="p-5">
          <ModeToggle />
        </Box>
      </NavigationMenu>
    </Box>
  );
};

export default NavBar;
