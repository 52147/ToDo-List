# ToDo-List-Website
https://real-puce-monkey-shoe.cyclic.app    


Build a dynamic data response To-Do-List website implemented by EJS and connected to backend database MongoDB to operate get, post, delete request from front-end localhost:3000 by using Node.js, Express.   


The most challenging part to build this project was the typo in package.json, I spend lots of time to figure out why my project could not connect with heroku. And the termanl can not let me to git push heroko master and said there is some issue in my json file.
The issue is simple to solve, but it took me a while to found out where the issue was.    


After I modified my json file(key map value and do not have comma in last document), and git add* git commit -m "update" git push heroku master, and the website builds successfully by the heroku app.   

What I found interested of built a full stack website by myself is that when the webiste is sucessfully released, all the time working on the project is worth it.    


## 概述

1. 使用Express做框架。
2. 使用MongoDB來儲存todo list 中的數據。
3. 是用路由(route)來要求不同的數據，然後利用引擎來生成html。
4. 部屬todo list 在 cyclic。



