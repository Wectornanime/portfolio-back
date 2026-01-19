import { Card, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

import { api } from "@/services/api.service";

type certificatesListType = {
  id: number;
  imageUrl: string | null;
  link: string | null;
  title: string;
};

export default function ListCertificatesPage() {
  const [certificatesList, setCertificatesList] = useState<
    certificatesListType[] | null
  >(null);

  const getData = async () => {
    const { data, status } = await api.get("/certificates");

    if (status === 200) {
      setCertificatesList(data.data);
    } else {
      window.alert("Não foi possível buscar os dados.");
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return certificatesList ? (
    <div className="grid grid-cols-2 gap-2">
      {certificatesList.map((item) => (
        <Link key={item.id} href={`/certificates/${item.id}`}>
          <Card isFooterBlurred>
            <div className="aspect-video w-full overflow-hidden">
              <img
                alt={`Imagem do certificado: ${item.title}`}
                className="h-full w-full object-cover"
                src={
                  item.imageUrl ||
                  "https://static.vecteezy.com/ti/vetor-gratis/p1/5720408-icone-imagem-cruzado-imagem-nao-disponivel-excluir-imagem-simbolo-gratis-vetor.jpg"
                }
              />
            </div>
            <CardFooter className="flex shrink-0 flex-col absolute items-start justify-between overflow-hidden z-10 py-1 w-full bottom-0 bg-white/10">
              <h2 className="text-zinc-700 font-bold right-0">{item.title}</h2>
            </CardFooter>
          </Card>
        </Link>
      ))}
    </div>
  ) : (
    <div className="flex justify-center">
      <Spinner />
    </div>
  );
}
