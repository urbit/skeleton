/+  *server
/=  index
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/skeleton/index
  /|  /html/
      /~  ~
  ==
/=  script
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/skeleton/js/index
  /|  /js/
      /~  ~
  ==
/=  style
  /^  octs
  /;  as-octs:mimes:html
  /:  /===/app/skeleton/css/index
  /|  /css/
      /~  ~
  ==
/=  skeleton-png
  /^  (map knot @)
  /:  /===/app/skeleton/img  /_  /png/
::
|%
::
+$  move  [bone card]
::
+$  card
  $%  [%http-response =http-event:http]
      [%connect wire binding:http-server term]
      [%peer wire dock path]
      [%quit ~]
  ==
::
--
::
|_  [bol=bowl:gall ~]
::
++  this  .
::
++  prep
  |=  old=(unit ~)
  ^-  (quip move _this)
  ?~  old
    :_  this
    [ost.bol %connect / [~ /'~skeleton'] %skeleton]~
  [~ this]
::
++  bound
  |=  [wir=wire success=? binding=binding:http-server]
  ^-  (quip move _this)
  [~ this]
::
::
++  poke-handle-http-request
  %-  (require-authorization:app ost.bol move this)
  |=  =inbound-request:http-server
  ^-  (quip move _this)
  ::
  =+  request-line=(parse-request-line url.request.inbound-request)
  =/  name=@t
    =+  back-path=(flop site.request-line)
    ?~  back-path
      ''
    i.back-path
  ?+  site.request-line
    :_  this
    [ost.bol %http-response not-found:app]~
  ::
  ::  styling
  ::
      [%'~skeleton' %css %index ~]
    :_  this
    [ost.bol %http-response (css-response:app style)]~
  ::
  ::  javascript
  ::
      [%'~skeleton' %js %index ~]
    :_  this
    [ost.bol %http-response (js-response:app script)]~
  ::
  ::  images
  ::
      [%'~skeleton' %img *]
    =/  img  (as-octs:mimes:html (~(got by skeleton-png) `@ta`name))
    :_  this
    [ost.bol %http-response (png-response:app img)]~
  ::
  ::  inbox page
  ::
     [%'~skeleton' *]
    :_  this
    [ost.bol %http-response (html-response:app index)]~
  ==
::
--
