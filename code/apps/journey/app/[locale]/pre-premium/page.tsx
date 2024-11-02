import Main from "~/components/main";
import BirthdayPicker from "~/components/pre-premium/steps/birthday-picker";
import CoveragePicker from "~/components/pre-premium/steps/coverage-picker";
import DurationPicker from "~/components/pre-premium/steps/duration-picker";
import GenderPicker from "~/components/pre-premium/steps/gender-picker";
import SmokerPicker from "~/components/pre-premium/steps/smoker-picker";
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
    {
      key: "birthdayPicker",
      component: <BirthdayPicker />,
    },
    {
      key: "smokerPicker",
      component: <SmokerPicker />,
    },
    {
      key: "coveragePicker",
      component: <CoveragePicker />,
    },
    {
      key: "durationPicker",
      component: <DurationPicker />,
    },
  ];
  return <Main elements={elements} />;
}
