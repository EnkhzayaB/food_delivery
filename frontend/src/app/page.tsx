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
