import Navigation from "@/components/home/Navigation";
import BannerSection from "@/components/home/Banner";
import Banner from "@/components/home/Banner";
import Menu from "@/components/home/Menu";

export const MainHome = () => {
  return (
    <div>
      <Navigation />
      <div className="flex pt-6 overflow-x-scroll">
        <Banner />
      </div>
      <div className="w-full flex flex-col items-center gap-[88px] bg-[#404040] ">
        <Menu />
      </div>
    </div>
  );
};
