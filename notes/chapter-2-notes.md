#Chapter 2 - MVC

##The Evolution of the Model - View - Controller

###An Architectural design pattern, for improved application organization

Business Data | User Interfaces | logic/coordination
--- | --- | ---
**Models** | **Views** | **Controllers**

Originally designed by Tryque Reenskaug while working on smalltalk-80,
It was originally called Model-View-Controller-Editor

####Salltalk-80 MVC

Back in the 70's, GUI's weren't much used. An approach known as seperated presentation came around.
Seperated presentation was developed and used to divide

Domain Objects | from | Presentation Objects
--- | --- | ---
models of things in the real world | | rendered to the users screen

The smalltalk MVC took this further:

Application Logic | from | User Interface
--- | --- | ---

The idea was to allow the reuse of Models for other interfaces

  + Domain Element -> Model
    + ignorant of user interface
  + Presentation taken care of by View and Controller
    + View-controller pair required for each element displayed on the screen
    +  separation between them
  + Controller handled user input and did something with them.
  + The observer-pattern was used to update the view whenever the model changed.

####Example: Ruby on Rails, a framework that attempts MVC

url -> Rails Router

           |

           \/

View <-> Controller <-> Model <-> Data Source

            |

            \/

            Browser

####In Rails:

  + Models represent the data in an application and are typically used to manage rules for
  interacting with specific database tables. Generally, one table, one model with business logic,
  living within these models.
  + Views represent your U.I.
    + HTML that will be sent to the browser.
    +  Present application data to anything making requests from your application.
  + Controllers process requests from the browser, query models for data and supply data to views.

###The S.P.A. (**S**ingle **P**age **A**pplication)

After initial page load, navigations and requests for data handled with out complete reload.

As SPA's become more complex, the need for organization increases. Hence, M.V.C!

##Client Side MVC, Backbone style

  **[reference code in /chapter-2](../../chapter-2/index.html)**

####The Simple To-Do Application

This example will increase in complexity as the tutorial continues

In the Todo application (demo.js), Backbone.Model instances are used to hold the data for each todo item.

The Todo model extends Backbone.Model and simply defines values for two data attributes

(From the code), Backbone models provide many more poweful features, but this illustrates that
a model is a data container.

Each Todo instance will be rendered by a TodoView

TodoView extends Backbone.View, instantiated with an associated model

  ```javascript
  render()
  ```
  + Uses a template to construct the HTML
  + Each call to render() well replace the content of the li element using the current model data.

**Instead of having a controller, the responsibility is handled in the view**

#####Events can be
  + traditional user input (clicks, mousedown etc...)
  + internal application events (model data changing)

Backbone.Event is a fundemental component which is mixed in with both Model & View

##Implementation Specifics

1. A SPA is loaded to the browser using normal HTTP request / response

2. The page could be an HTML file, or a view constructed by a server-side MVC implementation

3. URL routing, DOM events and Model events trigger handling logic in the view.

4. Models are synced with Data Sources which may involve communicating with back-end servers.

##Models

1. Vary across frameworks, but commonly support attribute validation.

2. In the wild, we need a way of persisting Models, either in a browsers local-storage or synced with the server.

3. May (*read: can, **or** might*) have multiple views observing it.

4. Not uncommon to provide a means of grouping models together. These groups are called **collections** in backbone.

##Views

1. Users interact with views, which generally means reading and editing Model Data.

2. render() within View is responsible for rendering contents of the model using a templating engine.

3. Updating the contents of the view is referenced by this.$el.

##Navigation & State

With single page javascript applications, once data is fetched from the server via ajax, it can be dynamically rendered
in a new view within the same page.

Since the URL isn't automatically updated, the role of navigation falls to a **"Router"** which assists in managing
application state

**Routers are neither a part of MVC or present in MVC-frameworks like Backbone.**
Routers will be discussed later in the tutorial

