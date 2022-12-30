# tataku-processor-split_by_displaywidth

The tataku.vim module that split strings using by vital.vim


## DEPENDENCIES

This plugin needs below:

- [denops.vim](https://github.com/vim-denops/denops.vim)
- [tataku.vim](https://github.com/Omochice/tataku.vim)

## OPTIONS

This module provides below options:

- `width`

  Width for splitting.

- `float`

  The horizontal alignment of the text.

  This option is must be `"left" | "center" | "right"`

  default: `"left"`

- `is_wrap`

  Considers line feed(LF) and does not consider wrap.

  default: `v:true`

## SAMPLES

```vim
let g:tataku_recipes = #{
  \ sample: #{
    ...
    \ processor: #{
      \ name: 'split_by_displaywidth',
      \ options: #{ 
        \ width: &columns,
        \ float: "left",
      \ }},
    ...
```
