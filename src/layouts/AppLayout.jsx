import React from "react";
import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import { Button } from "@/components/ui/button";

function AppLayout() {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>

      <footer className="p-10 text-center bg-gray-800 mt-10">
        <Link to="/about">
          <Button variant="outline" className="mb-4">
            About Developer
          </Button>
        </Link>

        <p>Made with ❤️ by Lovish 😎</p>
      </footer>
    </div>
  );
}

export default AppLayout;