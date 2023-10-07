# Hactoberfest 2023
Welcome You all for  the contribution. Make Valid Changes in this project . 

# JS-Game

https://youtu.be/08tk0ayBEUM

![image](https://user-images.githubusercontent.com/112415152/201524172-2394a93d-e315-428b-8ea3-a4744a6834d9.png)

#### Launch instructions

Double click on `game.html` to open the game in the browser.


#### Update your Repository with main

Add the remote, call it "upstream" :

```bash
git remote add upstream https://github.com/ayushi-ras/JS-Game
```

 Fetch all the branches of that remote into remote-tracking branches,
 such as upstream/main:

```bash
git fetch upstream 
```

Make sure that you're on your main branch:

```bash
git checkout main 
```

Rewrite your main branch so that any commits of yours that
aren't already in upstream/main are replayed on top of that
other branch:

```bash
git rebase upstream/main
```

## Avoid Conflicts {Syncing your fork}

An easy way to avoid conflicts is to add an 'upstream' for your git repo, as other PR's may be merged while you're working on your branch/fork.   

```terminal
git remote add upstream https://github.com/ayushi-ras/JS-Game
```

You can verify that the new remote has been added by typing
```terminal
git remote -v
```

To pull any new changes from your parent repo simply run
```terminal
git merge upstream/master
```

This will give you any eventual conflicts and allow you to easily solve them in your repo. It's a good idea to use it frequently in between your own commits to make sure that your repo is up to date with its parent.

For more information on syncing forks [read this article from Github](https://help.github.com/articles/syncing-a-fork/).

### Project Contributors
<a href="https://github.com/ayushi-ras/JS-Game/graphs/contributors">
<img src="https://contrib.rocks/image?repo=ayushi-ras/JS-Game" />
</a>












