import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { Image } from "@heroui/react";

export default function TesteListPage() {
  return (
    <>
    {/* <Link href="/teste/1">
        <Card>
          <CardBody className="flex flex-row gap-2 items-center">
            <div className="h-[65px] w-[100px] shrink-0">
              <Image
                alt="Album cover"
                className="object-cover"
                height={65}
                shadow="md"
                src="https://heroui.com/images/album-cover.png"
                width={100}
              />
            </div>
            <div>
              <h2 className="font-semibold text-large line-clamp-1">Title</h2>
              <p className="line-clamp-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi perferendis dolorem cupiditate magnam, velit voluptate odio? Cupiditate quis animi aut, ab non reprehenderit deserunt expedita veniam voluptas saepe maxime reiciendis.
              </p>
            </div>
          </CardBody>
        </Card>
      </Link>
       */}

      <Link href="/teste/1">
        <Card>
          <CardBody className="flex flex-row gap-2 items-center">
            <div className="h-[65px] w-[100px] shrink-0">
              <Image
                alt="HeroUI hero Image"
                className="full object-cover"
                radius="md"
                src="https://heroui.com/images/hero-card-complete.jpeg"
              />
            </div>
            <div>
              <h2 className="font-semibold text-large line-clamp-1">Title</h2>
              <p className="line-clamp-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi perferendis dolorem cupiditate magnam, velit voluptate odio? Cupiditate quis animi aut, ab non reprehenderit deserunt expedita veniam voluptas saepe maxime reiciendis.
              </p>
            </div>
          </CardBody>
        </Card>
      </Link>

      <Link href="/teste/1">
        <Card>
          <CardBody className="flex flex-row gap-2 items-center">
            <div className="h-[65px] w-[100px] shrink-0">
              <Image
                alt="Album cover"
                className="object-cover"
                height={65}
                shadow="md"
                src="https://heroui.com/images/album-cover.png"
                width={100}
              />
            </div>
            <div>
              <h2 className="font-semibold text-large line-clamp-1">Title</h2>
              <p className="line-clamp-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quasi perferendis dolorem cupiditate magnam, velit voluptate odio? Cupiditate quis animi aut, ab non reprehenderit deserunt expedita veniam voluptas saepe maxime reiciendis.
              </p>
            </div>
          </CardBody>
        </Card>
      </Link>
    </>
  );
}
