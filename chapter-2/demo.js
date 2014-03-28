/**
 * Created by Dave on 3/27/2014.
 */
//define a ToDo Model
var Todo = Backbone.Model.extend({
    //default attribute values
    defaults: {
        title: '',
        completed: false
    }
});

//Instantiate the Todo Model with a title,
// and completed attribute defaulting on false

var myTodo = new Todo({
    title: 'check attributes property of the logged models in the console.'
});

var TodoView = Backbone.View.extend({
    tagName: 'li',
    //cache the template function for a single item
    todoTpl: _.template($('#item-template').html()),

    events: {
        'dblclick label': 'edit',
        'keypress .edit': 'updateOnEnter',
        'blur .edit': 'close'
    },

    //Called when the view is first created
    initialize: function(){
        this.$el = $('#todo');
        //later, we'll look at:
        //this.listenTo(someCollection, 'all', this.render);
        //but for now calling todoView.render will run the example
    },

    //re-render the titles of the todo item.
    render: function(){
        this.$el.html( this.todoTpl( this.model.toJSON() ));
        //$el here is a reference to the Jquery element
        //associated with the view, todoTpl to an Underscore template
        //and toJSON() returns an object containing the models attributes
        //Altogether, the statement is replacing the HTML of a DOM element
        //with the result of instantiating a template with the model's attributed.
        this.input = this.$('.edit');
        return this;
    },

    edit: function(){
        //executed when todo label is double clicked
    },

    close: function(){
        //executed when todo loses focus
    },

    updateOnEnter: function(e){
        //executed on each keypress when in todo edit mode,
        //but we'll wait for enter to get in action
    }

});

//create a view for TodoView

var todoView = new TodoView({model: myTodo});