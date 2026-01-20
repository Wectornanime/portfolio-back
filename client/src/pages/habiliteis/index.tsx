import { StarRounded as StarRoundedIcon } from "@mui/icons-material";

import CreateHabiliteisPage from "./createHabiliteis";
import ListHabiliteisPage from "./listHabiliteis";
import InfoHabiliteisPage from "./infoHabiliteis";

import MailLayout from "@/layouts/mail";

export default function HabiliteisPage() {
  return (
    <MailLayout
      createPage={<CreateHabiliteisPage />}
      icon={StarRoundedIcon}
      infoPage={<InfoHabiliteisPage />}
      list={<ListHabiliteisPage />}
      tittle="Habilidades"
    />
  );
}
