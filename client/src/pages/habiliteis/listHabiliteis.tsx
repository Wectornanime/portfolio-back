import { Card, CardBody } from "@heroui/card";
import { Link } from "@heroui/link";
import { addToast, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

import { api } from "@/services/api.service";

type skillListType = {
  id: number;
  title: string;
  iconUrl: string;
};

export default function ListHabiliteisPage() {
  const [skillList, setSkillList] = useState<skillListType[] | null>(null);

  const getData = async () => {
    const { data, status } = await api.get("/skills");

    if (status === 200) {
      setSkillList(data.data);
    } else {
      addToast({
        color: "warning",
        title: "Não foi possível carregar a lista de habilidades",
      });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return skillList ? (
    skillList.map((item) => (
      <Link
        key={item.id}
        className="min-w-full"
        href={`/habiliteis/${item.id}`}
      >
        <Card className="min-w-full">
          <CardBody className="flex flex-row gap-2 items-center">
            <i className={`text-large ${item.iconUrl}`} />
            <div>
              <h2 className="font-semibold text-large line-clamp-1">
                {item.title}
              </h2>
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
