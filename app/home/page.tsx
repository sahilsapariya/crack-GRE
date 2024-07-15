"use client"

import { getData } from "@/actions/api";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const Home: React.FC = () => {
  const router = useRouter();

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
    <div>
      This is the protectdd route. in gujarat
      <Button type="button" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  );
};

export default Home;
