import Main from "~/components/main";
import GenderPicker from "~/components/pre-premium/steps/gender-picker";
import Intro from "~/components/pre-premium/steps/testing-comp";

export default function Page() {
  const elements = [
    {
      key: "intro",
      component: <Intro />,
    },
    {
      key: "genderPicker",
      component: <GenderPicker />,
    },
  ];
  return <Main elements={elements} />;
}
