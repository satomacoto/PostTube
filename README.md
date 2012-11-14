PostTube
========

1. Create a new repository.

2. Clone the repository.

```
git clone git@github.com:satomacoto/PostTube.git
```

3. Create a `gh-pages` branch.

```
git branch gh-pages
```

4. Create a hook.

```
vim .git/hooks/post-commit 
chmod 755 .git/hooks/post-commit
```

```
cat .git/hooks/post-commit 
#!/bin/sh
git checkout gh-pages
git rebase master
git checkout master
```

5. Push

```
echo 'Hello world' > index.html
git add index.html
git commit -m 'add index.html'
git push --all
```
