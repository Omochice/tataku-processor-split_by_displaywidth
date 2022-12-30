import { Denops } from "https://deno.land/x/denops_std@v3.12.0/mod.ts";
import {
  isArray,
  isBoolean,
  isNumber,
  isObject,
  isString,
  isUndefined,
} from "https://deno.land/x/unknownutil@v2.1.0/mod.ts";
import { Processor } from "https://raw.githubusercontent.com/Omochice/tataku.vim/master/denops/tataku/interface.ts";

export default class implements Processor {
  #option: Option;
  constructor(option: Record<string, undefined>) {
    if (!isOption(option)) {
      throw new Error(
        `ERROR: ${JSON.stringify(option)}`,
      );
    }
    this.#option = option;
  }

  async run(
    denops: Denops,
    source: string[],
  ): Promise<string[]> {
    const splited = await denops.call(
      "tataku#processor#split_by_displaywidth#split",
      [
        source,
        convertOption(this.#option),
      ],
    );
    if (
      !isArray(splited, (x: unknown): x is string[] => isArray(x, isString))
    ) {
      throw new Error(
        `Error occured in splitting: ${JSON.stringify(splited)}`,
      );
    }
    return splited.flat().map((e: string) => e.trimEnd());
  }
}

type Option = {
  width: number;
  float?: "left" | "center" | "right";
  is_wrap?: boolean;
};

type VimOption = {
  width: number;
  float: 1 | 0 | -1;
  is_wrap: boolean;
};

function isOption(x: unknown): x is Option {
  if (!isObject(x)) {
    return false;
  }
  return isNumber(x.width) &&
    ((isUndefined(x.float) || isString(x.float)) &&
      Object.keys(float).includes(x.float as string)) &&
    (isUndefined(x.is_wrap) || isBoolean(x.is_wrap));
}

function convertOption(x: Option): VimOption {
  return {
    width: x.width,
    float: float[x.float || "left"],
    is_wrap: (x.is_wrap === undefined || x.is_wrap),
  };
}

const float = {
  left: -1,
  center: 0,
  right: 1,
} as const satisfies {
  [key: string]: number;
};
