import SignUp from "@/components/SignUp";
export default function home() {
  return (
    <div className="flex justify-center items-center h-[1100px]">
      <div className="w-full h-full flex items-center relative">
        <div className="w-[40%] h-full flex justify-center items-center">
          <SignUp />
        </div>
        <img
          src="/auth.jpg"
          className="w-[60%] h-full rounded-[20px] absolute right-10 mt-20 mb-10 bg-cover bg-no-repeat bg-center"
        />
      </div>
    </div>
  );
}
