import Main from "~/components/main";
import BirthdayPicker from "~/components/pre-premium/steps/birthday-picker";
import CoveragePicker from "~/components/pre-premium/steps/coverage-picker";
import DurationPicker from "~/components/pre-premium/steps/duration-picker";
import GenderPicker from "~/components/pre-premium/steps/gender-picker";
import SmokerPicker from "~/components/pre-premium/steps/smoker-picker";
import Intro from "~/components/pre-premium/steps/testing-comp";

type ElementConfig<T = Record<string, unknown>> = {
  key: string;
  component: React.ReactElement;
  stepProperties: T;
};

export default function Page() {
  const elements: ElementConfig[] = [
    {
      key: "intro",
      component: <Intro />,
      stepProperties: {},
    },
    {
      key: "genderPicker",
      component: <GenderPicker />,
      stepProperties: {},
    },
    {
      key: "birthdayPicker",
      component: <BirthdayPicker />,
      stepProperties: {},
    },
    {
      key: "smokerPicker",
      component: <SmokerPicker />,
      stepProperties: {},
    },
    {
      key: "coveragePicker",
      component: <CoveragePicker />,
      stepProperties: {},
    },
    {
      key: "durationPicker",
      component: <DurationPicker />,
      stepProperties: {},
    },
  ];

  return (
    <Main
      elements={elements.map((el) => ({
        ...el,
        stepProperties: {
          question: "",
        },
      }))}
    />
  );
}
