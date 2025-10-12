import { useState } from "react";
import { Search, ChevronDown, User, Settings, LogOut } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";

const mockStocks = [
  { symbol: "ENGRO", name: "Engro Corporation Limited" },
  { symbol: "HBL", name: "Habib Bank Limited" },
  { symbol: "OGDC", name: "Oil & Gas Development Company" },
  { symbol: "PSO", name: "Pakistan State Oil Company" },
  { symbol: "LUCK", name: "Lucky Cement Limited" },
];

export function Header({ onStockSelect }) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  return (
    <header className="border-b bg-card">
      <div className="max-w-[1440px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-medium">SF</span>
            </div>
            <h1 className="text-xl font-medium">Smart Finance Advisor</h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-full justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">
                      {searchValue || "Search stocks (ticker + company name)..."}
                    </span>
                  </div>
                  <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput 
                    placeholder="Search stocks..." 
                    value={searchValue}
                    onValueChange={setSearchValue}
                  />
                  <CommandList>
                    <CommandEmpty>No stocks found.</CommandEmpty>
                    <CommandGroup>
                      {mockStocks
                        .filter(stock => 
                          stock.symbol.toLowerCase().includes(searchValue.toLowerCase()) ||
                          stock.name.toLowerCase().includes(searchValue.toLowerCase())
                        )
                        .map((stock) => (
                          <CommandItem
                            key={stock.symbol}
                            value={stock.symbol}
                            onSelect={() => {
                              setSearchValue(`${stock.symbol} - ${stock.name}`);
                              setOpen(false);
                              onStockSelect({
                                symbol: stock.symbol,
                                companyName: stock.name,
                                currentPrice: Math.floor(Math.random() * 500) + 100,
                                dailyChange: (Math.random() * 20) - 10,
                                dailyChangePercent: (Math.random() * 10) - 5,
                                volume: `${(Math.random() * 5 + 1).toFixed(1)}M`,
                                marketCap: `PKR ${(Math.random() * 100 + 20).toFixed(1)}B`,
                                sector: "Technology",
                              });
                            }}
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{stock.symbol}</span>
                              <span className="text-sm text-muted-foreground">{stock.name}</span>
                            </div>
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/avatars/01.png" alt="@user" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}