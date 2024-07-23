import Feed from "@/app/components/Feed";
import LeftMenu from "@/app/components/LeftMenu";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex gap-6 pt-6">
      {/* <div className="hidden xl:block w-[20%]">
        <LeftMenu type="home" />
      </div> */}
      {/* <div className="w-full lg:w-[70%] xl:w-[50%]"> */}
      <div className="flex flex-col pb-5 gap-6 max-h-screen overflow-x-auto">
        <Feed />
        {/* </div> */}
      </div>
      <div className="hidden lg:block w-[30%]">{/* <RightMenu /> */}</div>
    </div>
  );
}


