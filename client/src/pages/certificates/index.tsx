import { SchoolRounded as SchoolRoundedIcon } from "@mui/icons-material";

import CreateCertificatesPage from "./createCertificates";
import ListCertificatesPage from "./listCertificates";
import InfoCertificatesPage from "./infoCertificates";

import MailLayout from "@/layouts/mail";

export default function CertificatesPage() {
  return (
    <MailLayout
      createPage={<CreateCertificatesPage />}
      icon={SchoolRoundedIcon}
      infoPage={<InfoCertificatesPage />}
      list={<ListCertificatesPage />}
      tittle="Certificados"
    />
  );
}
