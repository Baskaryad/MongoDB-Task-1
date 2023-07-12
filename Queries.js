// Questions

// 1. Find all the information about each products

db.products.find({}).pretty() 
//or 
db.products.find({}).toArray() 


// 2. Find the product price which are between 400 to 800
db.products.find({
    product_price: {$gt: 400, $lt:800}
}).toArray()


// 3. Find the product price which are not between 400 to 600
db.products.find({
    product_price: {$nin:[400, 600]}
}).toArray()


// 4. List the four product which are grater than 500 in price 
db.products.find({
    product_price: {$gt:500}
}).limit(4).toArray(); 


// 5. Find the product name and product material of each products
db.products.find({},{
    product_name:1, product_material:1
}).toArray()


// 6. Find the product with a row id of 10
db.products.find({
    "id":"10"
}).toArray()


// 7. Find only the product name and product material
db.products.find({},{
    _id:0, product_name:1, product_material:1
}).toArray() 

// 8. Find all products which contain the value of soft in product material
db.products.find({product_material: "Soft"}).toArray() 


// 9. Find products which contain product color indigo  and product price 492.00
db.products.find({ 
    $or:[
        {product_price: 492.00},
        {product_color: "indigo"}
    ]}).toArray() 

// 10. Delete the products which product price value are same

db.products.aggregate([
    { $group: { _id: "$product_price", count: { $count: {} } } },
    { $match: { _id: { $ne: null }, count: { $gt: 1 } } }
  ]); // result is [36, 47] so will be deleting them from the database using below command

// after using below command, the duplicated has been deleted and updated with remaining data
db.products.deleteMany({ product_price: { $in: [36, 47] } });