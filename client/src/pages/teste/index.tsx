import TesteCreatePage from "./testeCreate";
import TesteInfoPage from "./testeInfo";
import TesteListPage from "./testeList";

import MailLayout from "@/layouts/mail";

import { MailRounded as MailRoundedIcon} from "@mui/icons-material";

export default function TestePage() {
  return (
    <MailLayout
      createPage={<TesteCreatePage />}
      icon={MailRoundedIcon}
      infoPage={<TesteInfoPage />}
      list={<TesteListPage />}
      tittle="Teste"
    />
  );
}
