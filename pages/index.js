import Feed from "@/components/Feed";
import Login from "@/components/Login";
import Modal from "@/components/Modal";
import SideBar from "@/components/SideBar";
import Trending from "@/components/Trending";
import { AppContext } from "@/contexts/AppContext";
import { useSession } from "next-auth/react"
import { useContext } from "react";



export default function Home() {
  const { data: session } = useSession();
  const [appContext] = useContext(AppContext)

  if (!session) return <Login />
  return (
    <main className="relative max-w-[1400px] mx-auto">
      <SideBar />
      <div className="flex gap-6 ">
        <Feed />
        <Trending />
        {appContext?.isModalOpen && <Modal />}
      </div>

    </main>
  )
}
