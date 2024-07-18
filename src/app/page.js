"use client";
import Image from "next/image";
import SideNav from "./components/SideNav";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/dashboard");
  }, [router]);
  return (
    <div>
      <div className=""></div>
    </div>
  );
}
