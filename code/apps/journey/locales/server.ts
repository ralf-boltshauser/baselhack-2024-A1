import { createI18nServer } from "next-international/server";

export const { getI18n, getScopedI18n, getStaticParams }: any =
  createI18nServer({
    en: () => import("./en"),
    de: () => import("./de"),
  });
