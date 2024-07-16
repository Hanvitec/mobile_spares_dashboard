'use client'
import Image from "next/image";
import SideNav from "./components/SideNav";
import { useRouter } from "next/navigation";

export default function Home() {
  const router  = useRouter();
  router.push('/dashboard')
  return (
    <div >
      <div className="">
        
      </div>
    </div>
  );
}
