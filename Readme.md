![Build](https://img.shields.io/github/actions/workflow/status/muthuishere/nginx-domain-assist/node.js.yml?branch=main)
![Coverage](https://img.shields.io/codecov/c/github/muthuishere/nginx-domain-assist)
![License](https://img.shields.io/npm/l/nginx-domain-assist)
![Version](https://img.shields.io/npm/v/nginx-domain-assist)


Nginx Domain Assist
===================

An NodeJS CLI to help you configure Nginx domains on your server with ease.
it has CLI options and a wizard to help you configure your domains. (Works only in Ubuntu  as of now

The type of virtual host might be one of the following:
- redirect domain requests to a port running on docker or kubernetes(e.g. 8080)
- redirect to statically hosted site directory


#### install

```

npm install -g nginx-domain-assist

```

can use npx as well



#### Features

- can pass options to the CLI
- has wizard mode as well to choose options
- can create a virtual host for a domain and redirect to a port
- can create a virtual host for a domain and serve from a directory
- can list all domains
- can delete domains


#### Usage



##### To create a domain and redirect to port use the following command:
```
sudo create-redirected-nginx-domain --domain "dev.test.com" --port 3456

# it will create a file in /etc/nginx/sites-available/dev.test.com to a port forwarded to 3456 ( assuming some app is watching on that port to serve http )
# and create a symlink in /etc/nginx/sites-enabled/dev.test.com
# and restart nginx
```

![create-redirect.png](assets%2Fcreate-redirect.png)

The above can also run in wizard mode , if you just run the command <i>create-redirected-nginx-domain</i> without any options


##### To create a domain and serve from a folder use the following command:
```
sudo create-static-nginx-domain --domain "static.test.com" --path "/var/www/html" 
# it will create
# > a file in /etc/nginx/sites-available/static.test.com and serve from /var/www/html
# > a symlink in /etc/nginx/sites-enabled/dev.test.com
# > restart nginx
```
![create-static.png](assets%2Fcreate-static.png)

The above can also run in wizard mode , if you just run the command <i>create-static-nginx-domain</i> without any options


##### To remove a site use the following command:
```
sudo delete-nginx-site --site "static.test.com" 
# it will remove 
# > a file in /etc/nginx/sites-available/static.test.com.conf
# > a symlink in /etc/nginx/sites-enabled/static.test.com.conf
# > SSL certificates via certbot 
# > restart nginx
```



##### To list all sites configured use the following command:
```
sudo list-all-nginx-sites
# it will list all sites available in /etc/nginx/sites-available
```

ALternatively you can use the below packages
[https://www.npmjs.com/package/nginx](https://www.npmjs.com/package/nginx)


You can also use npx to run the commands
```
npx -p nginx-domain-assist list-all-nginx-sites
```
The above will list all sites available in /etc/nginx/sites-available


#### License

