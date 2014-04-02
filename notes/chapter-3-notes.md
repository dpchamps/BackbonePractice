#Chapter 3 - Backbone Basics and Internals

##In this section: the essentials of Backbone's
+ Models
+ Views
+ Collections
+ Events, and
+ Routers

###Note: Read/Refer to the official Backbone Documentation for more depth

+ **The code in the corresponding chapter section does not contain all of the depth of this chapter, but only the last example**

##Models

+ Contain data for an application as well as the logic around this data.
e.g.
    Use a model to represent the concept of a todo item, including it's attributes.
+ Models are created by extending Backbone.Model

###Initialization

  + The `initialize()` method is called when a new instance of a model is created.
    + The use is optional, but gives greater control of the model.

###Getters & Setters

  + `Model.get()` provides easy access to it's attributes.

>   **NOTE**
>
>   To clone all of a model's attributes, use it's `toJSON()` method.
>
>   `toJSON()` returns a copy of the attributes as an object.
>
>   When `JSON.stringify` is passed to an object with a `toJSON()` method, it stringifies the return value.

  + `Model.set()`
    + Sets a hash of one of multiple attributes on the model
    + When any of these attributes alter the state of the model, a "change" event is triggered on it.
    + Change events for each attribute are also triggered and can be bound to.

####Direct Access

  Models expose an `.attributes` attribute which represents an internal hash containing the state of the model generally
  in the form of a JSON object.

  Setting values through this attribute on a model bypasses triggers bound to the model.

  Passing `{silent:true}` on a change of value for a model silences that change completely

  It's best practice to use Model.set() or direct instantiation over accessing the `.attributes` attribute

###Listening for Changes

  A convienient place to add listeners to a model is in the `initialize()` function

  It's also possible to listen for changes in individual attributes through `'change: attr'`

###Validation

  + `Model.validate()` allows checking the attribute values for a model prior to setting them
  + By default, validation occurs when the model is persisted using the `save()` method or when `set()` is called if
  `{validation:true}` is passed as in argument.
    + e.x. : `myModel.set({'name', 'Johnny Boy'}, {validation:true});`
  + If the attributes provided are valid, nothing is returned from `.validate()`. If they are invalid, and error value
  should be returned
  + If an Error is returner
    + an 'invalid' event is triggered, setting the Validation Error property on the model with the value that is returned
    by this method.
    + `.save()` will not continue & the attributes of the model will not be saved on the server. Similarly, `set()` will
    not set any invalid properties.
> NOTE
>
> The .attributes object passed to the validate function represents what they would be after completing `set()` or `save().
>
> The object is distinct from the current attributes the model and parameters.
>
> Since it's a shallow copy,
>
> Number, String and boolean attributes can not be modified. Nested Objects within the attribues can be changed.

##Views

  + Do not contain HTML markup
  + Contain logic for presenting model's data to users
    + achieved through javascript templating. (i.e. underscores default, handlebars, mustache etc..)
  + A Views render can be bound to a Models change event so as to render changes to the models data set without a page refresh.

### Creating new views

    var View = Backbone.View.extend({
        el: '#someElement',

        template : _.template('this.$el'),

        events : {
            //events hash
        },

        render: function(){
            //render logic
        },

        //any event functions
    });

    var myView = new View;

###el

  + The central property of a view is **el**
    + A reference to a DOM element
      + All views must have one.
    + Views use `el` to compose this elements content and then insert it into the DOM all at once.
  + There are two ways to associate a view with an element:
    1 A new element can be created for the view and added to the DOM.
    2 A reference can be made to an existing element on the page.

  To create a new element for a view, set any combination of the following properties:
  + tagName : defaults to `div` if not specified.
  + id
  + className

  If the element already exists in the page, el can be set with a css selector.

  *or*

  Set el to an existing element when creating the view.

### $el and $()

  **Backbone defined the $el property and $() function**

  |view.$el === $(view.el)| | view.$("#someSelector") === $(view.el).find("#someSelector)
  |---|---|---|

### setElement()

  + Applies an existing view to a different DOM element
    + changes DOM reference
    + rebinds events to new element
    + unbinds events from old element
  + The 'el' property represents the mark-up portion of the view that will be rendered.
  + To render the view to the page, it must be added as a new element or appended to an existing one.

### render()

 + An optional function
 + defines logic for a rendering template
 + _.template() compiles JS templates into functions which can be evaluated for re-rendering.

####Convention

> It is common to return `this` at the end of `render()
>
> It makes views easily reusable in parent views
>
> Something else that I don't understand.

###The events hash

  + attach event listeners to el-relative selectors or directly to el if no selector is provided.

    ```javascript
    events: {
        'click' : 'explode', //if the user clicks the el
        'dblclick .select': 'implode' //if the user double clicks '.select' within the el
    }
    ```
  + `_.bind(this.viewEvent, this)` may also be used.

##Collections

  + sets of models
  + created by `Backbone.Collection.extend();
  + Contains a property for specifying the type of model is contains.

###Adding & Removing Models

  + models can be added and removed using add() and remove()
  + add and remove accept both individual and lists of models.
  + When using `add()` on a collection, passing {merge:true} causes duplicate models to have their
  attributes merged into existing models instead of being igored

###Retrieving Models

  + `collection.get()`
    + accepts a single id, which must be set with model creation

#### id
  + a unique identifier, either a number or string.

#### cid
  + automatically generated when the model is created.

#### idAttribute
  + Identifying attribute name of the model returned from the server.
  + It maps a data field from the server to 'id'.
  + Mapping can be customized, but by default Bacbone assumes that it should be mapped to 'id'
  + Should be set by the server when the model is saved.

####Backbone.Collection contains an array of models enumerated by their ID property. When `Collection.get(id)` is called this array is checked for existence of the model instance with the corresponding id.

  + When creating a model:`var myModel = new Model`
    + myModel.cid is equal to a unique id,
    + myModel.id is equal to undefined.

###Listening for events
  + Collections can listen for add & remove events when models are added to or removed from a collection.
  + Collections can also listen for changes to any of the models.
  + jQuery style event maps can be used in the form:

        ```javasscript
        obj.on({
            'click' : 'action',
            'click' : 'action'
        });
        ```
  + Backbone also supports a `once()` method for events.
    + ensures a callback only fires once.

###Refreshing and Resetting Collections

  + `Collection.set()` takes an array of models and preforms the necessary add, remove, change operations required.
  + `Collection.reset()`
    + replaces the entire content of the collection
    + with no arguments clears the collection
    + does not fire `add` or `remove` events, a `reset` event is fired instead.
    + When listening to a `reset` event, a list of the previous models is available in options.previousModels

    ```javascript
    `.on( 'reset', function(model, options){} );
    ```

##Underscore Utility functions

###Many of underscores utility functions are available to collections

#### refer to Backbone doc, and Underscore doc respectively


##Chainable API

###Collections can also make use of underscores `chain()` method, to chain array manipulation methods

#### refer to Backbone doc, and Underscore doc respectively

##RESTful persistence

####Backbone dramatically simplifies the code needed to preform RESTful sync with the server

###Fetching Models from the server

  + Collections.feth()
    + retrieves models from the server in the form of a JSON array through a GET request to
    a specified URL in the `url` property.
    + When data is recieved, a `set()` will be executed.

###Saving Models to the Server

####Updates to models are preformed individually

  + Model.save()
    + Constructs a URL by appending a Model's ID to the collections URL and sends an HTTP PUT to the server
    + If the model is a new instance that was created in the browser, an HTTP POST is sent to the collection's URL.
  + Collections.create()
    + Can be used to create a new model, add it to the collection, and send it to the server with one method call.

####Model.isNew() - if the model does not yet have an id, it's considered new

###Deleting Models from the Server

 + Model.destroy()
   + Removes a model from the collection & seds HTTP DELETE to the collections URL

### Each RESTful API method accepts a variety of options

  + All methods accept success & error callbacks.
  + {patch:true} with Model.save()
    + uses HTTP PATCH to save only attrs that have changed
    + ex: `model.save(attrs, {patch:true});
  + {reset:true} with Collection.fetch() will result in the collection being updated using reset() instead of set().

#### refer to Backbone doc for more info

##Events

  + Backbone.Events is mixed in with:
    + Backbone
    + Backbone.Model
    + Backbone.Collection
    + Backbone.Router
    + Backbone.history
    + Backbone.View
### on(), off(), trigger()

  + Backbone.Events can give any object the ablity to bind & trigger custom events.
  + `_extend(myObj, Backbone.Events)`
    + Mixes events into an object
  + Events don't have to be declared before being bound to a callback handler

####The official Backbone docs recommend namespacing event names using colons if there are many events

    e.x.
    obj.on({
        'bake:cake': cakeRecipe,
        'bake:pie' : pieRecipe
    };

###The 'all' event

  + is fired when any event is fired
  + Takes a parameter that contains the event's name for it's callback.

### `.off()`

  + removes callback functions previous bound to the object

### `.trigger()`

  + triggers a callback for a specified event, or a space seperated list of events.
  + Can pass multiple arguments to the callback function

### `.listenTo()`

  + allows for an object to listen for events on another object

> Thing to look out for
>
> using on & off and removing views at the same time is generally safe.
>
> Problems start when a view is remmoved that was listening to events on a model that has persisted and off was not
> called on the views event handler
>
> This is a common memory leak know as Ghost Views, because the Garbage collector cannot properly do it's job.
>
> This is why stopListening() is handy.

### `.stopListening()`

  + Removes all events bound to an object with `.listenTo()`
  + Almost every on call requires an off call for garbage collection to function properly.
  + The default View.remove() calls stopListening().

## Events & Listeners

  + Two events to listen for within a view
    1 DOM Elements
    2 Events triggered by the event API

#### DOM Elements can be bound to using the view's events property or jQuery.on()

  + Callbacks within the events property, `this` refers to the view object.
  + Callbacks bound directly to the element using jQuery.on(), `this` refers to the DOM Element

#### Refer to delegateEvents() in Backbone Documentation.

## Routers

  + Provide a way to connect URL's to parts of the app.
  + Any part of the app that needs to be navigated to in one way or another needs a URL

#### An app usually has at least one route mapping a URL route to a function that determines what happens when a user reaches that route, defines as:

```javascript
'route': 'mappedFunction'
```
#### Typically only one router is needed, perhaps two.

## Backbone.history

  + handles hash change events
    + automatically handels routes that have been defined.

### `Backbone.history.start()`

  + Tells Backbone to begin monitoring 'hashchange' events.

### `.navigate()`

  + Can be used to update the URL without triggering the hashchange event.
  + Setting {trigger:true} will override this feature. **Though this is not suggested**

### 'route' event

  + triggered on the router
  + triggered on Backbone.history

##Backbone's Sync API

#### Support for RESTful persistence through
  + `fetch()` & `create()` methods on Collections
  + `save()` & `destroy()` methods on Models

#### The 'sync' method lies underneath these guys
  + Assumes a jquery like `$.ajax` method.
  + based on jQuery's API
  + Is called every time a Backbone app attempts to
    + Read
    + Save, or
    + Delete Models