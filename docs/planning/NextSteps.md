
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

React  Setup and Tooling
Your first step is to create the React project itself. For a modern, fast, and efficient developer experience, it's best to use a build tool like Vite.
Initialize with Vite: Within your main project directory, run the command to initialize a new Vite project. Choose the React template with the TypeScript variant. This will create a new sub-directory (e.g., client or frontend) containing a standard React project structure. Using Vite is a best practice because it offers near-instantaneous startup and Hot Module Replacement (HMR), which significantly speeds up development compared to older tools.
Development Workflow: During development, you will run two processes simultaneously: your Fastify backend server and the Vite frontend development server. They will operate on different ports. To handle API calls from the React app to the backend without running into CORS errors, you must configure a proxy in the Vite configuration file (vite.config.ts). This will forward any requests from your React app (e.g., to /api/...) to the Fastify server.

Component-Based Architecture
React's core strength is its component model. You should structure your UI by breaking it down into small, reusable, and logical components. This separation of concerns makes the application easier to understand, test, and maintain.
Application Shell: The main App.tsx component will serve as the application shell. Its primary job is to define the overall layout, such as placing the project panel on the left and the main work area on the right.
Container and Presentational Components: A best practice in React is to differentiate between "container" (smart) components that manage logic and state, and "presentational" (dumb) components that just display data.
Container Components: These will fetch data and manage the state for a specific feature. For example, you would have a ProjectManager container that fetches the list of projects and a RequestRunner container that holds the state for the request builder and response panels.
Presentational Components: These receive data via props and render UI. For instance, a ProjectList component would simply take an array of projects as a prop and render them as a list. A ResponseDisplay component would take response data as a prop and format it for the user.

An Example Component Breakdown - Not Final:
ProjectPanel: A container component that fetches and displays a list of projects and their associated API endpoints.
RequestBuilder: A stateful component that uses React's useState hook to manage the form inputs for the URL, payload, and headers.
ResponsePanel: A presentational component that receives the API response data and displays it.

State Management
Managing state that needs to be shared across different parts of your application is critical. For example, when a user selects a project, the RequestBuilder needs to know about it.
Start with React Context: For sharing state like the currently selected project ID, React's built-in Context API is the perfect starting point. You can create a ProjectContext to provide the project data to any component in the tree that needs it. This avoids "prop drilling" (passing props down through many layers of components), which is a common challenge in React applications.
Consider a State Management Library: As your application grows, if you find that the Context API is becoming complex to manage, you can adopt a dedicated state management library. A modern and simple choice is Zustand. It provides a clean and minimal API for managing global state without the boilerplate of older solutions like Redux. The best practice is to introduce such a library only when the need becomes clear, to avoid over-engineering.

Data Fetching
Efficiently fetching data from your backend is crucial for a responsive UI. While you can use the fetch API inside a useEffect hook, a more robust and modern approach is highly recommended.
Use TanStack Query (formerly React Query): The best practice for data fetching in modern React applications is to use a library like TanStack Query. This library is not just for fetching data; it's a server-state management tool.
Why: It provides numerous out-of-the-box features that dramatically simplify your code: automatic caching (to avoid re-fetching the same data), seamless loading and error state handling, re-fetching data on window focus to keep it fresh, and much more. This will allow you to remove complex useEffect logic and build a faster, more reliable user experience. You would use it in your container components to fetch projects and endpoints from your Fastify API.

