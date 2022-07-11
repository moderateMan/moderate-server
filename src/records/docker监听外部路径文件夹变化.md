# 博客服务器的自动化部署，我感觉需要调整
首先问题就是，服务器和文档应该分离，否则，每当我更新文章的时候，就会重新启动服务，这样没有必要的，仅仅通过前端请求动态获取即可


--- 
# 解决问题：git 提交然后用命令不好使，没办法只能通过手动修改的方式了

常用的配置如下

```
[user]
        name = test
        email = test@163.com
[credential]
        helper = cache --timeout=8640000
[push]
        default = simple
[color]
        ui = true
        status = auto
        branch = auto
[alias]
        st = status -s
        br = branch
			  df = diff
        ci = commit
        co = checkout
        lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
[filter "lfs"]
        required = true
        clean = git-lfs clean -- %f
        smudge = git-lfs smudge -- %f
        process = git-lfs filter-process
[difftool "sourcetree"]
        cmd = opendiff \"$LOCAL\" \"$REMOTE\"
        path = 
[mergetool "sourcetree"]
        cmd = /Applications/Sourcetree.app/Contents/Resources/opendiff-w.sh \"$LOCAL\" \"$REMOTE\" -ancestor \"$BASE\" -merge \"$MERGED\"
        trustExitCode = true
[core]
        excludesfile = /Users/rain/.gitignore_global
[commit]
        template = /Users/rain/.stCommitMsg

```

其中
```
[push]
        default = simple
```
才是问题的解决方法，这个git push就不会总提示问题了

---

