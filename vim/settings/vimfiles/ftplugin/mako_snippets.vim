if !exists('loaded_snippet') || &cp
    finish
endif

let st = g:snip_start_tag
let et = g:snip_end_tag
let cd = g:snip_elem_delim

exec "Snippet <%def <%def name=\"".st.et."\"".st.et."><CR>".st.et."<CR></%def>"
exec "Snippet <%call <%call expr=\"".st.et."\"".st.et."><CR><Tab>".st.et."<CR><BS><BS><BS><BS></%expr>"
exec "Snippet <%doc <%doc><CR><Tab>".st.et."<CR><BS><BS><BS><BS></%doc>"
exec "Snippet <%text <%text".st." ".et."><CR><Tab>".st.et."<CR><BS><BS<BS><BS></%text>"

exec "Snippet %for % for ".st.et." in ".st.et.":<CR><Tab>".st.et."<CR><BS><BS><BS><BS>% endfor"
exec "Snippet %if % if ".st.et.":<CR><Tab>".st.et."<CR><BS><BS><BS><BS>% endif"
exec "Snippet %try % try:<CR><Tab>".st.et."<CR><BS><BS><BS><BS>% except".st.et.":<CR><Tab>".st.et."<CR><BS><BS><BS><BS>% endtry"
exec "Snippet %else % else:<CR><Tab>".st.et
exec "Snippet %while % while ".st.et.":<CR><Tab>".st.et."<CR><BS><BS><BS><BS>% endwhile"
exec "Snippet %elif % elif ".st.et.":<CR><Tab>".st.et

exec "Snippet ${ ${ ".st.et." }"
exec "Snippet <% <%<CR><Tab>".st.et."<CR><BS><BS><BS><BS>%>"
exec "Snippet <%! <%!<CR><Tab>".st.et."<CR><BS><BS><BS><BS>%>"

for ctag in ['page', 'namespace', 'include', 'inherit']
    exec "Snippet <%".ctag." <%".ctag." ".st.et."/>"
endfor
