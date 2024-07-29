import { Either, left, right } from "./either";

function doSomething(shouldSuccess: boolean): Either<string, number> {
  if (shouldSuccess) {
    return right(1);
  } else {
    return left("error");
  }
}

describe("Either", () => {
  test("success result", () => {
    const result = doSomething(true);

    expect(result.value).toEqual(1);
    expect(result.isRight()).toBeTruthy();
    expect(result.isLeft()).toBeFalsy();
  });

  test("error result", () => {
    const result = doSomething(false);

    expect(result.value).toEqual("error");
    expect(result.isRight()).toBeFalsy();
    expect(result.isLeft()).toBeTruthy();
  });
});
