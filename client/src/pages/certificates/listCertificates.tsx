import { Card, CardFooter } from "@heroui/card";
import { Link } from "@heroui/link";
import { addToast, Spinner } from "@heroui/react";
import { useEffect, useState } from "react";

import { api } from "@/services/api.service";
import Image from "@/components/image";
import { generatePdfImagePreview } from "@/utils/generatePdfImagePreview";

type certificatesListType = {
  id: number;
  imageUrl: string | null;
  link: string | null;
  title: string;
  pdfFileUrl: string;
  previewUrl: string | undefined;
};

export default function ListCertificatesPage() {
  const [certificatesList, setCertificatesList] = useState<
    certificatesListType[] | null
  >(null);

  const getData = async () => {
    const { data, status } = await api.get("/certificates");

    if (status === 200) {
      const certificatesWithPreview = await Promise.all(
        data.data.map(async (item: any) => ({
          ...item,
          previewUrl: await generatePdfImagePreview(item.pdfFileUrl),
        })),
      );

      setCertificatesList(certificatesWithPreview);
    } else {
      addToast({
        color: "warning",
        title: "Não foi possível carregar a lista de certificados",
      });
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
            <Image
              alt={`Imagem do certificado: ${item.title}`}
              src={item.previewUrl || ""}
            />
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
