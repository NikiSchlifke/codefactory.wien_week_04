$("#showhide").click(function(event) {
    var visibility = $("#shoppingcart").css('visibility');

    if (visibility == "hidden") {
        $("#shoppingcart").css('visibility', 'visible');
    } else {
        $("#shoppingcart").css('visibility', 'hidden');
    }
});



function ItemConstructor(attrs) {
    this.itemCount = 0;
    this.name = attrs[0];
    this.imageFile = attrs[1];
    this.price = Number(attrs[2]);
    var price = $("<p>").append("€ " + this.price);


    var name = $("<h3>").append(this.name);
    this.image = $("<img>").attr({
        src: "images/" + this.imageFile,
        alt: name + " image"
    });
    this.image.wrap($("<div>").addClass('product--image'));
    this.info = $("<div>").addClass('product--info')
        .append(name)
        .append(price);



    this.catalogProduct = function() {
        var main = $("<div>").append(this.image.clone()).append(this.info.clone());
        main.addClass('catalog--product');

        var buyButton = $("<button>").append('Buy');
        // proxy to fix wrong this inside button
        buyButton.click($.proxy(this.buyItem, this));
        var buttons = $('<div>').addClass('product--buttons')
            .append(buyButton);
        main.append(buttons);
        return main;
    }

    this.cartProduct = function() {
        if (this.itemCount < 1) {
            return false;
        }
        var main = $("<div>").append(this.image.clone()).append(this.info.clone());
        main.addClass('cart--product');

        var decrementButton = $("<button>").append('-');
        // proxy to fix wrong this inside button
        decrementButton.click($.proxy(this.removeItem, this));
        var incrementButton = $("<button>").append('+');
        // proxy to fix wrong this inside button
        incrementButton.click($.proxy(this.buyItem, this));
        var deleteButton = $("<button>").append('remove');
        // proxy to fix wrong this inside button
        deleteButton.click($.proxy(this.deleteItem, this));
        var totalPrice = this.itemCount * this.price;
        var buttons = $('<div>').addClass('product--buttons')
            .append(decrementButton)
            .append(incrementButton)
            .append(deleteButton)
            .append($("<div>").addClass('cart--itemsum').text('€ ' + totalPrice))
            .append($("<div>").addClass('cart--itemcount').text(this.itemCount));
        main.append(buttons);
        return main;
    }

    this.buyItem = function() {
        mainCart.addItem(this);
    }
    this.removeItem = function() {
        mainCart.removeItem(this);
    }
    this.deleteItem = function() {
        mainCart.deleteItem(this);
    }
}

var products = [
    ["AMD Ryzen 7 1700, 8x 3.00GHz", "1582201.jpg", 348.75],
    ["Nintendo Switch Console, black/grey", "1526902.jpg", 324.49],
    ["ASUS ROG Crosshair VI Hero", "1582881.jpg", 268.95]
];

function CartConstructor() {
    this.items = {};

    this.addItem = function(item) {
        if (typeof this.items[item.name] == 'undefined') {
            this.items[item.name] = item;
        }
        this.items[item.name].itemCount++;
        this.updateCart();
    }

    this.removeItem = function(item) {
        if (typeof this.items[item.name] == 'undefined') {
            return false;
        }
        this.items[item.name].itemCount--;
        if (this.items[item.name].itemCount < 1) {
            this.deleteItem(item);
        }
        this.updateCart();

    }
    this.deleteItem = function(item) {
        if (typeof this.items[item.name] == 'undefined') {
            return false;
        }
        item.itemCount = 0;
        delete this.items[item.name];
        this.updateCart();
// 
    }

    this.updateCart = function() {
        $("#itemcontainer").empty();
        for (var index in this.items) {
            if (this.items.hasOwnProperty(index)) {
                console.log(this.items[index]);
                $("#itemcontainer").append((this.items[index]).cartProduct());
                // var productDom = this.index[index].cartProduct();
                // $("#itemcontainer").append(productDom);
            }
        }
    }
}

var mainCart = new CartConstructor();
// products.map(function(elem, index) {
//     var item = new ItemConstructor(elem);
//     allProducts[item.name] = item;
// })


// for (var i = 0; i < products.length; i++) {
//     var item = new ItemConstructor(products[i]);
//     var catalog = document.getElementById('maincatalog');
//     catalog.appendChild((item.catalogProduct())[0]);

// }
var catalogObjects = products.map(function(elem) {
    return new ItemConstructor(elem);
});


for (var i = 0; i < catalogObjects.length; i++) {
    $("#maincatalog").append(catalogObjects[i].catalogProduct());
}

// var cartObjects = [];
function rebuildCart() {
    $("#itemcontainer").empty();
    for (var i = 0; i < catalogObjects.length; i++) {
        $("#itemcontainer").append(catalogObjects[i].cartProduct());
    }
}
