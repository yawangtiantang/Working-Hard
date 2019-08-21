
- ### 手机和电脑不是连接同一个路由器

1. #### 下载安装猎豹wifi.
   手机连接上wifi之后，查看手机的ip信息。如图：

![image](http://119.27.177.40/img/qiniu/blog-20180419155700.jpg)

2. #### 修改项目的webservice配置
两种方法：

(1). 由上图可知，我们电脑作为手机连接的路由器，ip地址是192.168.191.1 所以我们需要修改webservice相应的地址。如下所示：

```
    host: '192.168.191.1',  //原来默认是localhost
    port: 8080, 
    autoOpenBrowser: true,
```

(2). 修改package.json文件。修改如下代码即可：

```
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js"
  },
```

  修改为：

```
"scripts": {
    "dev": "webpack-dev-server --host 0.0.0.0 --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js"
  },
```


3. #### 重新启动我们的vue项目。
    启动后可以先在本地浏览器试试 。
```
http://192.168.191.1:8080/#/
```
没有问题后，把地址发送到我们微信中，就可以访问调试了。

---


- ### 手机和电脑连接同一个路由器

1. #### 查看电脑ip地址，然后修改项目的webservice配置
    如下所示：

```
    host: '192.168.10.83',  //原来默认是localhost
    port: 8080, 
    autoOpenBrowser: true,
```
或者修改package.json文件。修改如下代码即可：

```
"scripts": {
    "dev": "webpack-dev-server --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js"
  },
```

  修改为：

```
"scripts": {
    "dev": "webpack-dev-server --host 0.0.0.0 --inline --progress --config build/webpack.dev.conf.js",
    "start": "npm run dev",
    "lint": "eslint --ext .js,.vue src",
    "build": "node build/build.js"
  },
```

3. #### 重新启动我们的vue项目。
    启动后可以先在本地浏览器试试 。
```
http://192.168.10.83:8080/#/
```
没有问题后，把地址发送到我们微信中，就可以访问调试了。
