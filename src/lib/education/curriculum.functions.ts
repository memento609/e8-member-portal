import { createServerFn } from "@tanstack/react-start";
import { loadCurriculum } from "./curriculum.server";

export const getCurriculum = createServerFn({ method: "GET" }).handler(async () => {
  return await loadCurriculum();
});
