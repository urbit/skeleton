# skeleton
a boilerplate for building an Urbit app

## Using
Create a new repo on Github

Copy and rename directory to your app name. Make sure repo and directory have identical names.

```
git clone git@github.com:urbit/skeleton.git <your-app-name>
```

Point the remote to the new repo

```
git remote set-url origin git@github.com:urbit/<your-app-name>.git
```

Publish and sync your directory with the new repo

```
git push origin master
```

### Choosing app type
The generic boilerplate is `full-app`. If your want to build a subordinate app, you'll use `tile-app`.
Both contain their respective dependencies. All you need to do is `npm install`
