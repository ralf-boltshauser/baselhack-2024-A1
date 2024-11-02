import ConfigurationForm from "./configurationForm";

export default async function ConfigurationPage() {
  return (
    <div className="w-full">
      <div className="flex justify-start items-start bg-background mb-8 flex-col gap-y-2">
        <h1 className="text-3xl">Configurations</h1>
        <p className="text-sm text-foreground">
          Adjust the multipliers to align the risk appetite you're comfortable
          with in your insurance pool.
        </p>
      </div>
      <ConfigurationForm currentWeights={undefined} />
    </div>
  );
}
