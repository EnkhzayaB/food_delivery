"use client";
import { CldUploadButton, CldImage } from "next-cloudinary";
import { Header, Banner, Footer } from "@/components";
import { Menu } from "@/components/menu/Menu";

export default function home() {
  return (
    <div>
      <Header />
      <Banner />

      <main className="p-4 bg-gray-100 px-10">
        {/* <h2 className="text-3xl font-semibold mb-4">Appetizers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5"></div> */}
        <Menu />
      </main>

      <footer>
        <Footer />
      </footer>

      {/* <CldUploadButton
        className="border border-yellow-300"
        uploadPreset="food_delivery"
        onSuccess={(results) => {
          console.log(results);
        }}
      /> */}

      {/* <div className="flex justify-center">
        <CldImage
          width="360"
          height="300"
          src="onyuftvaauz2nca2zvgo"
          sizes="100vw"
        />
      </div> */}
    </div>
  );
}
