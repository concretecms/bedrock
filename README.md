# Concrete CMS Bedrock
Bedrock is Concrete's front end library. It is used to support Concrete itself, Concrete's backend (the "Dashboard" theme that's built-in to Concrete CMS), Concrete's shipping theme (Atomik) and third party themes that want to ensure that they remain compatible with all major Concrete features. It is a superset of Bootstrap 5.

## More Information
https://documentation.concretecms.org/tutorials/submitting-user-interface-pull-requests-for-concrete-cms-version-9

## Storybook
[View our storybook](https://concretecms.github.io/bedrock/?path=/docs/docs--docs) for examples of how to use each 
component

See [/stories/ExampleStories.js](stories/ExampleStories.js) for an example for how to add stories and 
[/stories/Docs.mdx](stories/Docs.mdx) to see how to add documentation pages.

## Githooks
To run the provided [.githooks](.githooks) in your local repository, run:
```bash
git config --local core.hooksPath .githooks
```