import { Denops } from "https://deno.land/x/denops_std@v5.1.0/mod.ts";
import { is } from "https://deno.land/x/unknownutil@v3.11.0/mod.ts";
import {
  $boolean,
  $const,
  $number,
  $object,
  $opt,
  $union,
  access,
  type Infer,
} from "https://esm.sh/lizod@0.2.7/";

const isOption = $object({
  width: $number,
  float: $opt($union([$const("left"), $const("center"), $const("right")])),
  is_wrap: $opt($boolean),
});

type Option = Infer<typeof isOption>;

type VimOption = {
  width: number;
  float: 1 | 0 | -1;
  is_wrap: boolean;
};

const float = {
  left: -1,
  center: 0,
  right: 1,
} as const satisfies {
  [key: string]: number;
};

function convertOption(x: Option): VimOption {
  return {
    width: x.width,
    float: float[x.float ?? "left"],
    is_wrap: (x.is_wrap ?? true),
  };
}

const processor = (denops: Denops, option: unknown) => {
  const ctx = { errors: [] };
  if (!isOption(option, ctx)) {
    throw new Error(
      ctx.errors
        .map((e) => `error at ${e} ${access(option, e)}`)
        .join("\n"),
    );
  }
  return new TransformStream<string[]>({
    transform: async (chunk: string[], controller) => {
      const splitted = await denops.call(
        "tataku#processor#split_by_displaywidth#split",
        [
          chunk,
          convertOption(option),
        ],
      );
      if (!is.ArrayOf(is.ArrayOf(is.String))(splitted)) {
        throw new Error(
          `Error occured in splitting: ${JSON.stringify(splitted)}`,
        );
      }

      controller.enqueue(splitted.flat().map((e: string) => e.trimEnd()));
    },
  });
};

export default processor;
