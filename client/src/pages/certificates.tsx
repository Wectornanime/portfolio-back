import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/react";

import { title } from "@/components/primitives";

export default function CertificatesPage() {
  return (
    <>
      <h1 className={title()}>Certificates</h1>
      <div className="flex gap-4 mt-4">
        <Card isFooterBlurred className="group">
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={180}
            src="https://heroui.com/images/hero-card.jpeg"
            width={250}
          />
          <CardFooter className="flex flex-col absolute items-start justify-between overflow-hidden z-10 py-1 w-full bottom-0 bg-white/10">
            <h2 className="text-white font-bold right-0">Title</h2>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
