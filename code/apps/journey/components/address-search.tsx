import { useState } from "react";
import { Combobox } from "@headlessui/react";
import { debounce } from "lodash";

interface Props {
  onSelect: (address: string) => void;
}

interface SearchResult {
  display_name: string;
  place_id: number;
}

export default function AddressSearch({ onSelect }: Props) {
  const [query, setQuery] = useState("");
  const [addresses, setAddresses] = useState<SearchResult[]>([]);

  const MOCK_ADDRESSES: SearchResult[] = [
    {
      place_id: 1,
      display_name: "In den Schleifen 12, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 2,
      display_name: "In den Schleifen 14, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 3,
      display_name: "In den Schleifen 16, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 4,
      display_name: "In den Schleifen 18, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 5,
      display_name: "In den Schleifen 20, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 6,
      display_name: "In der Rheinfelderstrasse 2, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 7,
      display_name: "In der Rheinfelderstrasse 4, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 8,
      display_name: "Inzlingerstrasse 1, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 9,
      display_name: "Inzlingerstrasse 3, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 10,
      display_name: "Industriestrasse 5, Biel-Benken 4105, Schweiz",
    },
    {
      place_id: 11,
      display_name: "Industriestrasse 7, Biel-Benken 4105, Schweiz",
    },
  ];

  const searchAddresses = debounce((searchQuery: string) => {
    if (searchQuery.length < 2) {
      setAddresses([]);
      return;
    }

    const filteredAddresses = MOCK_ADDRESSES.filter((address) =>
      address.display_name.toLowerCase().startsWith(searchQuery.toLowerCase()),
    );
    setAddresses(filteredAddresses);
  }, 300);

  return (
    <Combobox
      value={query}
      onChange={(value: string) => {
        setQuery(value);
        onSelect(value);
      }}
    >
      <Combobox.Input
        className="w-full rounded-md border border-input bg-background px-3 py-2"
        onChange={(event) => {
          setQuery(event.target.value);
          searchAddresses(event.target.value);
        }}
        placeholder="Search for your address"
      />
      <Combobox.Options className="mt-1 max-h-60 overflow-auto rounded-md border bg-white py-1 shadow-lg">
        {addresses.map((address) => (
          <Combobox.Option
            key={address.place_id}
            value={address.display_name}
            className={({ active }) =>
              `cursor-default select-none px-3 py-2 ${
                active ? "bg-primary text-white" : "text-gray-900"
              }`
            }
          >
            {address.display_name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
}
