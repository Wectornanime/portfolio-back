import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { addToast, Image, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

import { api } from "@/services/api.service";

type ProjectListType = {
  id: number;
  imageUrl: string | null;
  title: string;
  text: string;
};

export default function ListProjectsPage() {
  const [projectList, setProjectList] = useState<ProjectListType[] | null>(
    null,
  );

  const getData = async () => {
    const { data, status } = await api.get("/projects");

    if (status === 200) {
      setProjectList(data.data);
    } else {
      addToast({
        color: "warning",
        title: "Não foi possível buscar a lista de projetos",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return projectList ? (
    projectList.map((item) => (
      <Link key={item.id} className="min-w-full" href={`/projects/${item.id}`}>
        <Card className="min-w-full">
          <CardBody className="flex flex-row gap-2 items-center">
            <div className="h-[65px] w-[100px] shrink-0">
              <Image
                className="object-cover object-center"
                height={65}
                src={
                  item.imageUrl ||
                  "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg"
                }
                width={100}
              />
            </div>
            <div>
              <h2 className="font-semibold text-large line-clamp-1">
                {item.title}
              </h2>
              <p className="line-clamp-2">{item.text}</p>
            </div>
          </CardBody>
        </Card>
      </Link>
    ))
  ) : (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
}
