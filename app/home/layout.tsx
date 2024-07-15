"use client";

import "../globals.css";
import toast, { Toaster } from "react-hot-toast";

import Link from "next/link";
import {
  BookOpenCheck,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Search,
  Swords,
} from "lucide-react";

// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { usePathname, useRouter } from "next/navigation";
import { getData } from "@/actions/api";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const pathname = usePathname();
  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await getData("/api/v1/auth/logout");

    if (res.success) {
      toast.success("Logout Successful");
      router.push("/login");
    } else {
      toast.error(res.error);
    }
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="grid min-h-screen w-full ">
        <div className="flex flex-col">
          <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="shrink-0">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="flex flex-col">
                <nav className="grid gap-2">
                  <span className="text-slate-500 mt-2 text-sm">Home</span>

                  <SheetTrigger asChild>
                    <Link
                      href="/home"
                      className={`${
                        pathname !== "/home"
                          ? "text-foreground"
                          : "text-muted-foreground bg-muted"
                      } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground`}
                    >
                      <Home className="h-5 w-5" />
                      Home
                    </Link>
                  </SheetTrigger>

                  <span className="text-slate-500 mt-2 text-sm">Words</span>
                  <SheetTrigger asChild>
                    <Link
                      href="/words"
                      className={`${
                        pathname !== "/words"
                          ? "text-foreground"
                          : "text-muted-foreground bg-muted"
                      } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground`}
                    >
                      <BookOpenCheck className="h-5 w-5" />
                      Word list
                      {/* <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                          6
                        </Badge> */}
                    </Link>
                  </SheetTrigger>

                  <SheetTrigger asChild>
                    <Link
                      href="/words/add-words"
                      className={`${
                        pathname !== "/words/add-words"
                          ? "text-foreground"
                          : "text-muted-foreground bg-muted"
                      } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground`}
                    >
                      <BookOpenCheck className="h-5 w-5" />
                      Add words
                    </Link>
                  </SheetTrigger>

                  <span className="text-slate-500 mt-2 text-sm">Test</span>
                  <SheetTrigger asChild>
                    <Link
                      href="/tests"
                      className={`${
                        pathname !== "/tests"
                          ? "text-foreground"
                          : "text-muted-foreground bg-muted"
                      } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground`}
                    >
                      <Swords className="h-5 w-5" />
                      Practice test
                    </Link>
                  </SheetTrigger>

                  <SheetTrigger asChild>
                    <Link
                      href="/tests"
                      className={`${
                        pathname !== "/tests"
                          ? "text-foreground"
                          : "text-muted-foreground bg-muted"
                      } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground`}
                    >
                      <Swords className="h-5 w-5" />
                      Mock test
                    </Link>
                  </SheetTrigger>

                  <SheetTrigger asChild>
                    <Link
                      href="/tests"
                      className={`${
                        pathname !== "/tests"
                          ? "text-foreground"
                          : "text-muted-foreground bg-muted"
                      } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground`}
                    >
                      <LineChart className="h-5 w-5" />
                      Test Scores
                    </Link>
                  </SheetTrigger>

                  <span className="text-slate-500 mt-2 text-sm">Master</span>

                  <SheetTrigger asChild>
                    <Link
                      href="/master/add-section"
                      className={`${
                        pathname !== "/master/add-section"
                          ? "text-foreground"
                          : "text-muted-foreground bg-muted"
                      } mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2  hover:text-foreground`}
                    >
                      <LineChart className="h-5 w-5" />
                      Add Section
                    </Link>
                  </SheetTrigger>
                </nav>
                {/* <div className="mt-auto">
                <Card>
                  <CardHeader>
                    <CardTitle>Upgrade to Pro</CardTitle>
                    <CardDescription>
                      Unlock all features and get unlimited access to our
                      support team.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button size="sm" className="w-full">
                      Upgrade
                    </Button>
                  </CardContent>
                </Card>
              </div> */}
              </SheetContent>
            </Sheet>
            <div className="w-full flex-1">
              <form>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search products..."
                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                  />
                </div>
              </form>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <CircleUser className="h-5 w-5" />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
