# How to add more transcript types

Before adding more transcript types, let's first see
how the currently available ones are configured

1. Goto `transcript-backend/transcripts/standard`. Here is where the 
logic for the standard transcript is defined.
2. Goto `transcript-backend/converters/mappers/standard`. Here is where
the mapping from composite to standard transcript takes place
3. Goto `transcript-backend/renderer/`. Here is where the standard transcript
is rendered to pdf. The model.js convert the standard transcript to a form that
makes it convenient to render using handlebars
4. Goto `transcript-backend/renderer/templates`. Here is handlebars template for
rendering the pdf file


So to add a new transcript type

1. Define a new transcript data logic in `transcript-backend/transcripts/`
2. Define new mappings in `transcript-backend/converters/mappers`
3. Define new renderer model in `transcript-backend/renderer/`
4. Configure new pdf template in `transcript-backend/renderer`

You may also want to add new constants in 
`transcript-api\src\constants\transcript-type`

and lastly on the web application

`web-client\src\constants\data.js` 

