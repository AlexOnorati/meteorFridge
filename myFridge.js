Products = new Mongo.Collection('products');
if (Meteor.isClient) {
  
    Template.fridge.helpers({
        products: function () {
            return Products.find({place: 'fridge'});
        }
    });
    
    Template.productList.helpers({
        products: function () {
            return Products.find({ place: 'supermarket'});
        }
    });
    
    Template.fridge.onRendered({
        var templateInstance = this;
        templateInstance.$('#fridge').droppable({
            drop: function(evt, ui){
                var query = {_id: ui.draggable.data('id')};
                var changes = {$set:{place: 'fridge'}};
                Products.update(query, changes);
            }
        });
    });

    Template.productList.onRendered({
        var templateInstance = this;
        templateInstance.$('#supermarket').droppable({
            drop: function(evt, ui){
                var query = {_id: ui.draggable.data('id')};
                var changes = {$set:{place: 'supermarket'}};
                Products.update(query, changes);
            }
        });
    });

    Template.productListItem.onRendered({
        var templateInstance = this;
        templateInstance.$('.draggable').draggable({
        cursor: 'move',
        helper: 'clone'
        });
    });


 
}

if (Meteor.isServer) {
    Meteor.startup(function () {
        Products.remove({});
        
        Products.insert({
            name: 'Milk',
            img: '/images/milk.png',
            place: 'supermarket'
        });
        Products.insert({
            name: 'Bread',
            img: '/images/bread.png',
            place: 'fridge'
        });
        /*Products.insert({
        
        });
        Products.insert({
        
        });*/
    
    });
}
