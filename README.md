# Enforce Pull Request Title Style Action

This action analyses the titles of Pull Requests to ensure they start with a Azure Board Issue.  Issue Key is an combination of the letters 'AB', Numero sign (#), and a number designating which issue it is. 

For example the following would be allowed

```
AB#1  Initialize Project
AB#1234 Second PR
```

However, the following examples would not be allowed

```
aB#1 Initialize Project
```

```
ab#1 Initialize Project
```

Valid Pull Request titles must also include a short description after the Issue Key. Therefore the following is not valid. 

```
AB#1
```

This action will allow any valid Issue Key so long as it *could* be valid. It does not check if the referenced issue exists.


❤️ Special Thanks to:
 https://github.com/ryanvade/enforce-pr-title-style-action
