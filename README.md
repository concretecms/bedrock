# concrete5 Bedrock
Bedrock is concrete5's front end library


### Developing Components
This repository makes use of [storybook](https://storybook.js.org/docs/basics/introduction/) to allow for a clean development environment as well as a reference for how components should be used.   
Run `npm run storybook` to begin working with storybook.

#### Adding a story
If you're working on an existing component it's worth checking for a `.stories.js` file for it in `/stories/` before creating a new one.

1. Create a new `something.stories.js` file in `/stories/` underneath a directory that makes sense
2. Copy the contents of `/stories/stories.js.sample` into your new file as a boilerplate
3. Update component name and other placeholder values to match the component you're working on