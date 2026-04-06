# My personal website kenan.fyi

> Beware of an overkill setup for a personal blog! 

- Built with Astro v6
- Uses Keystatic headless CMS for in-browser authoring experience.

Codebase gets deployed two times, once to my own server instance so that node runtime can run Keystatic routes, and second, main branch gets deployed on push to a Bunny CDN. 

On Bunny deploy, there is no SSR, routes are conditionally stripped out for SSG, thus resulting in a pure static website. 

On my own server though, the Astro builds with `output: 'server'`, thus allowing /keystatic route to run. 

# Why this approach

Simply because I use custom components during authoring posts, which is cumbersome with Markdown/MDX. I wanted to have a web UI where I can write content using a visual immediate feedback. This could also be solved by running Keystatic locally, which many people do, but since I already have a server anyway, why not run it there and be able to reach it wherever I am and from any computer I use, right?

## Advantages

- In-browser content authoring
- Keystatic gives a simple branch management in its UI too, where I can author content in a dedicated branch and have a Commit -> PR -> Merge lifecycle. 
- Theoretically possible preview routes during editing, though I have not implemented this for now for couple of reasons: 
  - Astro renders content from the disk, where it uses the Content Collection and schemas based on your integrations, which is MarkDoc in this case. This means static build is fine when you use .astro components, since they live on the local disk and freely available. During dynamic rendering though, since content comes from somewhere else, like from GitHub or an API endpoint, Astro can not use the content schema and the .astro components. So it might fetch .mdoc documents from somewhere else, but any additional .astro components which is matched to MarkDoc tags will not exist and all the MarkDoc tags will be rendered as pure HTML without any style scoping. This results in a theoretical mismatch even if you use the same .mdoc file for a route. In this case you need to use the MarkDoc renderer on-the-go and render the HTML elements by yourself. What's possible is using the same stylesheet and attaching it also during the build time. I decided not to go this route atm, because I already have an editor UI which is enough for previewing posts. I might implement this later, but syncing all these styles sounds hell of an effort to manage.

## Disadvantages

- You need a nodejs runtime for in-browser editing, whether a server or some kind of edge computing.
- Managing 2 deployments, although this is straightforward since SSR and SSG variations are controlled by a simple env variable.
- If server goes down, you need to do your edits on local computer.
- MarkDoc, but I am getting used to it. Keystatic uses MarkDoc for content editing and its syntax is a little different than traditional MDX. I find it pleasing though. Instead of writing code and content together, you use handlebars-like templating for custom stuff and match them to Astro components using the markdoc.config.mjs.
- Keystatic uses React, which I need to ship the renderer on the SSR build.
