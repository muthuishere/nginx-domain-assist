![Build](https://img.shields.io/github/actions/workflow/status/muthuishere/nginx-domain-assist/node.js.yml?branch=main)
![Coverage](https://img.shields.io/codecov/c/github/muthuishere/nginx-domain-assist)
![License](https://img.shields.io/npm/l/nginx-domain-assist)
![Version](https://img.shields.io/npm/v/nginx-domain-assist)


Nginx Domain Assist
===================

An NodeJS CLI to help you configure Nginx domains on your server with ease.
it has CLI options and a wizard to help you configure your domains.

The type of virtual host might be one of the following:
- redirect domain requests to a port running on docker or kubernetes(e.g. 8080)
- redirect to statically hosted site directory



#### Features

> can pass options to the CLI

> has wizard mode as well to choose options


#### Usage



To redirect to port use the following command:
```
sudo create-redirected-virtual-domain --domain "dev.test.com" --port 3456

# it will create a file in /etc/nginx/sites-available/dev.test.com to a port forwarded to 3456 ( assuming some app is watching on that port to serve http )
# and create a symlink in /etc/nginx/sites-enabled/dev.test.com
# and restart nginx
```




To redirect to a directory use the following command:
```
sudo create-static-virtual-domain --domain "dev.test.com" --directory "/var/www/html"