Activiti-AngularApp
===================
![alt tag](http://media1.alfrescoblog.com/2014/06/tasks.angular.png)


## How to run ?

* npm -g update
* npm install -g yo grunt-cli bower
* npm install -g generator-angular generator-karma
* npm install && bower install
* grunt server

## How to connect activiti-rest with angular and not have cross origin problem?

Activiti-angularapp expects that activiti-rest is located at /service, one of the solutions is to setup apache with url_proxy like this :
```
ProxyPass /service/ http://localhost:8081/activiti-rest/service/ retry=0 timeout=30
ProxyPass / http://localhost:9000/ retry=0 timeout=30
```

Then access the angular app at

```
http://localhost/
```

it is assumend that:
* Grunt runs on port 9000
* Activiti tomcat runs on 8081
* Apache runs on port 80 
 
## How does this app look like ?
You can find all of the images here 
http://alfrescoblog.com/2014/09/04/angular-js-activiti-webapp-part-iii-final/

## What use cases are supported ?
* login
* logout
* listing groups
* listing users
* managing groups and users
* listing processes and process instances
* starting  process
* listing tasks
* task forms are supported for text, number, boolean, date, user 




