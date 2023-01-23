# ToDo-List-Website
https://real-puce-monkey-shoe.cyclic.app    


Build a dynamic data response To-Do-List website implemented by EJS and connected to backend database MongoDB to operate get, post, delete request from front-end localhost:3000 by using Node.js, Express.   


The most challenging part to build this project was the typo in package.json, I spend lots of time to figure out why my project could not connect with heroku. And the termanl can not let me to git push heroko master and said there is some issue in my json file.
The issue is simple to solve, but it took me a while to found out where the issue was.    


After I modified my json file(key map value and do not have comma in last document), and git add* git commit -m "update" git push heroku master, and the website builds successfully by the heroku app.   

What I found interested of built a full stack website by myself is that when the webiste is sucessfully released, all the time working on the project is worth it.    


## 概述

1. 使用Express做框架。
2. 使用MongoDB來儲存所有todo list 的名稱和其中的數據。
3. 使用路由(route)來對指定的list做增、刪、改、查，然後利用模板引擎來渲染數據生成html，然後顯示到瀏覽器上。
4. 佈署todo list 在 cyclic。

## Set Up
用 npm init 來為project 創建一個 package.json，之後可以利用 npm <dependency> 來將 dependency 加到 package.json 中。
```
npm init
```
安裝 express
```
npm install express
```
安裝 mongoose
```
npm install mongoose
```
安裝 nodemon
```
npm install -g nodemon
```
使用nodemon，讓 node project 被nodemon 監視，如果project有被修改，nodemon會自動重新在本地主機上運行
```
nodemon index.js
```

    
    
https://expressjs.com/en/starter/installing.html    

https://www.npmjs.com/package/nodemon/v/1.18.10
## 實現

### 創建骨架
使用MVC軟體架構來設計網頁。     

model : 導入mongoose module來對mongodb 做操作。創建兩個collection，一個為list collection，用來儲存所有list name，裡面包含一個 item collection，用來儲存指定list中的item。
```
const mongoose = require("mongoose");
```    
view : 使用ejs模板引擎來利用模板文件渲染頁面。    
```
app.set('view engine', 'ejs');
```
controller: 路由處理器來給予不同http request對應的操作。
```    
app.get("/", function (req, res) {
    ...
    res.render(...);
    }
```    
#### 路由參數
使用路由參數讓使用者可以利用路由建立和使用不同的list。   

```javascript    
// get url 中的路由參數以指定對應的list
app.get("/:customListName", function (req, res) {

  // 保存路由參數
  const customListName = _.capitalize(req.params.customListName);

  // 查詢 List Collection 中是否有對應的 List 名稱，如果沒找到的話，在List collection 創建一個新的list document
  // ，有的話將頁面導向那個list名稱的url
  List.findOne({
    name: customListName
  }, function (err, foundList) {
    if (!err) {
      if (!foundList) {
        //Create a new list
        const list = new List({
          name: customListName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + customListName);
      } else {
        //Show an existing list
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
    }
  });

});
```
https://hackmd.io/@Heidi-Liu/note-be201-express-node
### 使用DB
1. 連接到 MongoDB
```    
mongoose.connect("mongodb+srv://123:123@cluster0.qc3xle7.mongodb.net/todolistDB", {
  useNewUrlParser: true
});
```
2. 定義Schema
items 的schema，用來儲存不同的items名稱在對應的list。
```      
const itemSchema = {
  name: String
};
```
list 的schema，用來儲存不同的list名稱於list collcetion，其中內容有包含item 的collection。
```      
const listSchema = {
  name: String,
  items: [itemSchema]
};
```      
3. 創建模型
Item的模型
```      
const Item = mongoose.model("Item", itemSchema);
```
List 的模型
```      
const List = mongoose.model("List", listSchema);
```      
4. 更新，刪除和查詢
儲存
<collection_name>.save(): 儲存更新過的的document。
插入doc
<collection_name>.insertMany(...): 插入很多doc

查詢
<collection_name>.find(...): 查詢所有 doc
<collection_name>.findOne(...): 查詢一個 doc
<collection_name>.findByIdAndRemove()
<collection_name>.findOneAndUpdate()

### host 網站

## 自動化測試
