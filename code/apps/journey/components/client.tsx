// Client Component
"use client";

import { Button } from "@repo/ui/components/ui/button";
import { useState } from "react";
import { useI18n, useScopedI18n } from "~/locales/client";

export default function ClientComponent() {
  const t = useI18n();
  const scopedT = useScopedI18n("hello");

  const [counter, setCounter] = useState(0);

  return (
    <div>
      <p>{t("hello")}</p>

      <Button onClick={() => setCounter(counter + 1)}>
        {t("counter", { count: counter })}
      </Button>

      {/* Both are equivalent: */}
      <p>{t("hello.world")}</p>
      <p>{scopedT("world")}</p>

      <p>{t("welcome", { name: "John" })}</p>
      <p>{t("welcome", { name: <strong>John</strong> })}</p>
    </div>
  );
}
