import { Slug } from "./slug";

test("should be able to create a slug from test", () => {
  const slug = Slug.createFromText("An example title");

  expect(slug.value).toEqual("an-example-title");
});
