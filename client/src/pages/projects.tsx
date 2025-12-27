import { Button } from "@heroui/button";
import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/react";

import { title } from "@/components/primitives";

export default function ProjectsPage() {
  return (
    <>
      <h1 className={title()}>Projects</h1>
      <div className="flex gap-4 mt-4">
        <Card isFooterBlurred className="group">
          <Image
            alt="Woman listing to music"
            className="object-cover"
            height={250}
            src="https://heroui.com/images/hero-card.jpeg"
            width={300}
          />
          <CardFooter className="flex flex-col absolute items-start justify-between overflow-hidden z-10 py-1 w-full bottom-0 bg-white/10">
            <h2 className="text-white font-bold right-0">Title</h2>
            <p className="line-clamp-3 h-0 group-hover:h-19 text-white overflow-hidden transition-all duration-300">Lorem ipsum dolor sit amet consectetur adipisicing elit. Fuga, accusamus magnam voluptas molestias hic quod ducimus quaerat quo ex harum saepe, maiores provident blanditiis! Voluptates ut cupiditate animi dignissimos at?.</p>
            <div className="flex gap-2 justify-center w-full">
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
              >
                Notify me
              </Button>
              <Button
                className="text-tiny text-white bg-black/20"
                color="default"
                radius="lg"
                size="sm"
                variant="flat"
              >
                Notify me
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
