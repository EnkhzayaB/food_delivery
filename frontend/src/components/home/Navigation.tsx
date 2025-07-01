const Navigation = () => {
  return (
    <div className="bg-black h-[172px] flex items-center self-stretch gap-3 justify-between">
      <div className="flex gap-2.5  mr-12 ml-12">
        <img src="/logo.svg" alt="" />
        <div className="flex flex-col gap-1.5">
          <div className="flex text-[28px] font-semibold w-[88px] h-[28px]">
            <p className="text-white">Nom</p>
            <p className="text-[#EF4444]">Nom</p>
          </div>
          <p className="text-[#F4F4F5]">Swift delivery</p>
        </div>
      </div>

      <div className="flex gap-3  mr-12 ml-12">
        {/* delivery section */}
        {/* <div className="flex pt-2 pb-2 pl-3 pr-3 gap-1 border rounded-full bg-white items-center">
            <img
              src="/Location icon.svg"
              alt="address"
              className="w-[20px] h-[20px]"
            />
            <p className="text-[#EF4444] text-sm font-normal">
              Delivery address:
            </p>
            <p className="text-[#71717A] text-sm font-normal">Add Location</p>
          </div> */}

        <div className="flex h-[36px] pt-2 pb-2 pl-3 pr-3 items-center justify-center gap-2 rounded-full bg-[#F4F4F5]">
          <p className="text-sm font-medium">Sign-Up</p>
        </div>
        <div className="flex h-[36px] pt-2 pb-2 pl-3 pr-3 items-center justify-center gap-2 rounded-full bg-[#EF4444]">
          <p className="text-sm font-medium text-white">Log-In</p>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
