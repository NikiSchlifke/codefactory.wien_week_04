$("#showhide").click(function(event) {
    var visibility = $("#shoppingcart").css('visibility');

    if (visibility == "hidden") {
        $("#shoppingcart").css('visibility', 'visible');
    } else {
        $("#shoppingcart").css('visibility', 'hidden');
    }
});


function ItemConstructor(attrs) {
    var name = attrs[0];
    var imageFile = attrs[1];
    var price = attrs[2];
    price = $("<p>").append("€ " + price);


    name = $("<h3>").append(name);
    this.image = $("<img>").attr({
        src: "images/" + imageFile,
        alt: name + " image"
    });
    this.image.wrap($("<div>").addClass('product--image'));
    this.info = $("<div>").addClass('product--info')
        .append(name)
        .append(price);



    this.catalogProduct = function() {
        var main = $("<div>").append(this.image).append(this.info);
        main.addClass('catalog--product');
        var buyButton = $("<button>").append('Buy');
        var buttons = $('<div>').addClass('product--buttons')
            .append(buyButton);
        main.append(buttons);
        return main;
    }

    this.cartProduct = function() {
        var main = $("<div>").append(this.image).append(this.info);
        main.addClass('cart--product');

        var decrementButton = $("<button>").append('-');
        var incrementButton = $("<button>").append('+');
        var removeButton = $("<button>").append('remove');
        var buttons = $('<div>').addClass('product--buttons')
            .append(decrementButton)
            .append(incrementButton)
            .append(removeButton);
        main.append(buttons);
        return main;
    }
}

function CatalogProductConstructor(item) {
    this.item = item;
}

function CartProductConstructor(item) {
    this.item = item;

}

var products = [
    ["AMD Ryzen 7 1700, 8x 3.00GHz", "1582201.jpg", 348.75],
    ["Nintendo Switch Console, black/grey", "1526902.jpg", 324.49],
    ["ASUS ROG Crosshair VI Hero", "1582881.jpg", 268.95]
];

for (var i = 0; i < products.length; i++) {
    var item = new ItemConstructor(products[i]);
    var catalog = document.getElementById('maincatalog');
    catalog.appendChild((item.catalogProduct())[0]);

}
products.map(function(elem) {
    var item = new ItemConstructor(elem);
    $("#maincatalog").append(item.catalogProduct());
})
