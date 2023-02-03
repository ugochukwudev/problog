import Iframe from "sanity-plugin-iframe-pane";
import type { DefaultDocumentNodeResolver } from "sanity/desk";
import { SanityDocument } from "sanity";

export const defaultDocumentNode: DefaultDocumentNodeResolver = (
  S,
  { schemaType }
) => {
  if (schemaType === "post") {
    return S.document().views([
      S.view.form(),
      S.view
        .component(Iframe)
        .options({
          url: `${
            process.env.NEXT_PUBLIC_VERCEL_URL || "http://localhost:3000"
          }/api/preview`,
          defaultSize: "desktop",
          reload: {
            button: true,
          },
          attributes: {},
        })
        .title("Preview"),
    ]);
  } else {
    return S.document().views([S.view.form()]);
  }
};
