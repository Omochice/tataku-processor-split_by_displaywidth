let s:save_cpo = &cpo
set cpo&vim

let s:S = vital#split_by_displaywidth#import('Data.String')

function! tataku#processor#split_by_displaywidth#split(arg) abort
  let [l:expr, l:option] = a:arg
  return l:expr
        \ ->map({-> s:S.split_by_displaywidth(v:val, l:option.width, l:option.float, l:option.is_wrap)})
endfunction


let &cpo = s:save_cpo
unlet s:save_cpo
" vim:set et:
