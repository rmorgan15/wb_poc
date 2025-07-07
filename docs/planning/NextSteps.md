
### Update Database Schema

CustomerProject: This is the central model the User will interact with. It contains the project's name and links to the project tenants.

We should decouple the piiFields array on the Project.
We will want a more flexible method for configuration.   
There will be multiple aspects of a project that a User may want to configure.  
Some configurations may be common across projects. 
Some configurations may NOT be common even within a single customer's Tenants.
A configuration can be saved at multiple levels, user profile, customer project, tenant endpoint.
For a given configuration category, configuration values will be checked first at a tenant enpooint level, then the customer project level, then the User's Profile.

### Frontend UI/UX Evolution (React)
The React SPA will need a more sophisticated layout and component set to handle the new features.

The primary Appolicaiton Window should have a Left-hand sidebar, a central panel and a tool bar across the top of the screen, by default. 
the left hand side bar should be a tree-structre, like a file directory browser such as the Mac Finder or Windows Explorer.
This side bar will have node - locked to the top of the tree - labeled 'Profiles' nested under that node will be the User's profiles.  
The toolbar will have icon buttons for functionality or choosing workspace modes.  this toolbar will be collapsable.
User should always have at least one Profile, And User will be created with a default profile.   
At same root level as Profiles, there should be Customer Projects, with Tenant Enpoints nested within them.
The applicaiton wil also support collapsable or 'hideable' tool bars for the right hand side, or bottom of screen.
There should be icons to expand all nodes, and collapse all nodes.
The overall UI aesthetic should be similar to those of popular IDEs like IntelliJ or Visual Studio Code 
The side bar and panels should be allowed to be resized by the user by click-dragging the navbar border (e.g. make side bar wider or narrower)
We will want the nodes in our left side-bar tree structure to support right-click context menu.

Workspace View:
When a user selects a node from the left-hand sidebar, then in the central workspace panel the page to interact with the node in the default manner will be loaded. This panel is tabbed, and can support pages for multiple nodes or different modes or views for the same node.  
Tabs of a workspace page have the Name of the Node, then, A clear, color-coded badge (e.g., 🔴 PROD, 🟡 STAGING, 🟢 DEV) correlating to the tenant of the record shown in the central panel.

This Central View will support muliple types of pages depending on the mode of operation.
Some examples follow

API Workbench UI:  User to directly interact with Single Tenant Endpoint.
User will construct API Calls, execute the calls agains the endpoint and be Review and Act upon the results of the call.  
User will need a text input area to construct API calls either by typing or pasting directly into area.
User will want to save API Calls - storing the full message, as well as a name field and a description field.
  Saved API Calls are stored at the Tenant Endpoint level and can be copied to other Tenant Endpoints.
User will want a text area to review API Call results.  The text area should allow for copying.
Persisting Results will also be supported under multiple methods.
Workbench Save - Create a 'SavedAPIResult' record in db and a node associated with the tenant endpoint.
FileSystem Save - save the response as a text file to the servers local file system (provide file name and perhaps directory)
Mock Database Save - transform the api response and save to a tenant specific mock database.  Example Use case - User calls tentant endpoint querying for all Widgets.  In our applications database we store the records in a 'Widgets' table.

-- For Discussion - how to architect this mock database.  differently labled tables in main applicaiton DB, or sepeate DB for all of a customers mock objects.

Record Mode UI: This page is List of the database fields, data type and current values for the selected node.

Comparison Mode UI:
The UI needs a mechanism, perhaps a "Compare" button, to enter a comparison mode.

In this mode, the user can select a two nodes of the same type to compare.  Examples could be, SavedAPIResults from multiple tenants.   Mock Database records across multiple tenants.
The Workspace page will then split into a two-panel "diff" view.
This view will display the mode-specific contents of the two nodes side-by-side, with clear visual highlighting (e.g., red for deletions, green for additions) for any differences found in the data, powered by the response from the /api/proxy/diff endpoint.

Project Configuration UI:

Within each project, there will be a muliple types of configurations that will be needed. 
Selecting this node shows a list of the saved configurations in the project.
The workspace will allow selecting an existing setting and editing and saving, or deleting.  Or adding a new setting.

