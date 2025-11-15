# Development Guide

This guide provides detailed instructions for setting up a local development environment, understanding the codebase, and contributing to Code Cafe.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Local Development Setup](#local-development-setup)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
- [Code Style Guidelines](#code-style-guidelines)
- [Testing](#testing)
- [Common Development Tasks](#common-development-tasks)
- [Debugging](#debugging)
- [Troubleshooting](#troubleshooting)
- [API Documentation](#api-documentation)

## Prerequisites

### Required Software

Before you begin, ensure you have the following installed:

- **Node.js** (v12.0 or higher)
  - Download from [nodejs.org](https://nodejs.org/)
  - Verify installation: `node --version`

- **npm** (comes with Node.js)
  - Verify installation: `npm --version`

- **Git** (for version control)
  - Download from [git-scm.com](https://git-scm.com/)
  - Verify installation: `git --version`

### Recommended Tools

- **Code Editor**: Visual Studio Code, Sublime Text, or similar
- **Browser**: Chrome or Firefox with developer tools
- **REST Client**: Postman or similar (for API testing)

## Local Development Setup

### Step 1: Clone the Repository

```bash
# Clone the repository
git clone <repository-url>

# Navigate to the project directory
cd codecafe
```

### Step 2: Install Dependencies

```bash
# Install Express.js
npm install express

# Or install all dependencies if package.json exists
npm install
```

### Step 3: Start the Development Server

```bash
# Start the server
node server.js

# You should see: "mAGIC HAPPENING AT 1111"
```

### Step 4: Access the Application

Open your browser and navigate to:
```
http://localhost:1111
```

You should see the Code Cafe interface with a loading spinner that displays code submissions once loaded.

## Project Structure

```
codecafe/
│
├── img/                          # Image assets
│   ├── logo.png                  # Application logo
│   ├── loading.gif               # Loading spinner animation
│   └── concrete_seamless.png     # Background texture
│
├── controllers/                  # AngularJS controllers
│   └── searchController.js       # Main controller for search and display logic
│
├── factories/                    # AngularJS services (Factory pattern)
│   └── codeFactory.js           # API communication service
│
├── docs/                         # Documentation
│   ├── ARCHITECTURE.md          # Architecture documentation
│   └── DEVELOPMENT.md           # This file
│
├── app.js                        # AngularJS module initialization
├── index.html                    # Main HTML template
├── server.js                     # Express.js server configuration
├── style.css                     # Custom CSS styles
└── README.md                     # Project overview and quick start
```

## Development Workflow

### 1. Making Changes

#### Frontend Changes (HTML/CSS/JavaScript)

Since this is a static file server, changes to frontend files are reflected immediately:

1. Make your changes to the file
2. Save the file
3. Refresh your browser (Ctrl+R or Cmd+R)
4. No server restart needed

#### Backend Changes (server.js)

For changes to the Express server:

1. Make your changes to `server.js`
2. Stop the server (Ctrl+C in terminal)
3. Restart the server: `node server.js`
4. Refresh your browser

### 2. Development Tools

#### Browser Developer Tools

Press `F12` or right-click → "Inspect" to open developer tools:

- **Console**: View logs, errors, and debug output
- **Network**: Monitor API requests and responses
- **Elements**: Inspect and modify HTML/CSS in real-time
- **AngularJS Batarang** (Chrome extension): Debug AngularJS applications

#### Live Server (Optional)

For automatic browser refresh, use a live server:

```bash
# Install live-server globally
npm install -g live-server

# Run from project directory
live-server --port=8080
```

Note: You'll need to update the Express server port to avoid conflicts.

### 3. Version Control

#### Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make your changes and commit
git add .
git commit -m "Add: brief description of changes"

# Push to remote
git push origin feature/your-feature-name

# Create a pull request on GitHub
```

#### Commit Message Conventions

Follow these conventions for clear commit history:

- `Add:` New feature or functionality
- `Fix:` Bug fix
- `Update:` Improvements to existing features
- `Refactor:` Code restructuring without behavior change
- `Docs:` Documentation changes
- `Style:` Formatting, whitespace changes
- `Test:` Adding or updating tests

Examples:
```
Add: pagination for code submissions
Fix: search not working with special characters
Update: improve loading animation
Refactor: extract statistics logic to separate service
Docs: update API documentation
```

## Code Style Guidelines

### JavaScript

#### Naming Conventions

```javascript
// Variables and functions: camelCase
var codeList = [];
function getCodeList() { }

// Constants: UPPER_SNAKE_CASE
var API_ENDPOINT = 'http://...';

// AngularJS controllers: camelCase with 'Controller' suffix
app.controller('searchController', ...);

// AngularJS factories: camelCase with 'Factory' suffix
app.factory('codeFactory', ...);
```

#### Code Formatting

- **Indentation**: 4 spaces (no tabs)
- **Line Length**: Maximum 100 characters
- **Semicolons**: Use semicolons at end of statements
- **Quotes**: Use single quotes for strings
- **Braces**: Opening brace on same line

```javascript
// Good
function example() {
    if (condition) {
        doSomething();
    }
}

// Avoid
function example()
{
    if(condition)
    {
        doSomething()
    }
}
```

#### Comments

```javascript
/**
 * JSDoc-style comments for functions
 *
 * @param {string} parameter - Description
 * @returns {boolean} Description of return value
 */
function myFunction(parameter) {
    // Inline comments for complex logic
    var result = complexOperation();
    return result;
}
```

### HTML

- Use semantic HTML5 elements
- Indent nested elements with 4 spaces
- Use lowercase for element names and attributes
- Always include `alt` attributes for images

```html
<!-- Good -->
<div class="container">
    <img src="logo.png" alt="Code Cafe Logo">
    <p>Description text</p>
</div>
```

### CSS

- Use meaningful class names (kebab-case)
- Group related properties
- Add comments for sections

```css
/* Header Section */
.header {
    height: 100px;
    width: 100%;
    background-color: white;
}

/* Code Display */
.code-display {
    padding: 10px;
    border: 1px solid #ccc;
}
```

### AngularJS Specific

#### Dependency Injection

Always use array notation for minification safety:

```javascript
// Good (minification-safe)
app.controller('searchController', ['$scope', 'codeFactory',
    function ($scope, codeFactory) {
        // Controller logic
    }
]);

// Avoid (breaks with minification)
app.controller('searchController', function ($scope, codeFactory) {
    // Controller logic
});
```

#### Scope Variables

Prefix private variables with underscore:

```javascript
$scope.publicVariable = 'accessible';
var _privateVariable = 'internal only';
```

## Testing

### Manual Testing Checklist

Currently, the project uses manual testing. Test these scenarios before committing:

#### Search Functionality
- [ ] Search by problem title
- [ ] Search by programming language
- [ ] Search by difficulty level
- [ ] Search is case-sensitive
- [ ] Empty search shows all results
- [ ] Clear search box resets results

#### Filter Functionality
- [ ] Filter by "Accepted" status
- [ ] Filter by "Wrong Answer" status
- [ ] Filter by "Time Limit Exceeded" status
- [ ] Filter by "Skipped" status
- [ ] Filters work with search simultaneously

#### Display and UI
- [ ] Loading spinner appears while fetching data
- [ ] All submissions display correctly
- [ ] Statistics panel shows correct counts
- [ ] Code syntax displays properly in code boxes
- [ ] Scrolling works in code display areas
- [ ] Responsive design works on different screen sizes

#### Cross-Browser Testing
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge

### Future: Automated Testing

Consider adding these testing frameworks:

```bash
# Unit Testing
npm install --save-dev jasmine karma karma-jasmine

# E2E Testing
npm install --save-dev protractor
```

## Common Development Tasks

### Task 1: Add a New Filter

To add a new filter option (e.g., filter by language):

1. **Update HTML** (`index.html`):
```html
<div class="radio">
    <label>
        <input type="radio" name="language" value="Python" ng-model="languageFilter">
        Python
    </label>
</div>
```

2. **Update Controller** (if needed):
```javascript
$scope.languageFilter = '';
```

3. **Update View Filter**:
```html
<div ng-repeat="code in codeList | filter:languageFilter">
```

### Task 2: Change API Endpoint

To modify the API endpoint:

Edit `factories/codeFactory.js`:
```javascript
function getCodeList() {
    return $http.get('YOUR_NEW_API_ENDPOINT')
}
```

### Task 3: Modify Port Number

To change the server port from 1111:

Edit `server.js`:
```javascript
var PORT = 3000; // Your preferred port
app.listen(PORT, function() {
    console.log('Server running on port ' + PORT);
});
```

### Task 4: Add New Statistics

To add new statistical analysis:

Edit `controllers/searchController.js`:
```javascript
$scope.stats = {
    // Existing stats...
    'new_statistic': _.countBy(data.websites, function (website) {
        return website.some_property;
    })
}
```

Then update `index.html` to display it:
```html
<li><b>New Statistic:</b>
    <ul style="list-style: none">
        <li ng-repeat="(key,val) in stats.new_statistic">
            <b>{{key}}</b> : {{val}}
        </li>
    </ul>
</li>
```

### Task 5: Add Syntax Highlighting

To add code syntax highlighting:

1. Include a syntax highlighting library (e.g., Prism.js or Highlight.js):
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/default.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js"></script>
```

2. Create an AngularJS directive to apply highlighting:
```javascript
app.directive('highlightCode', function($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element) {
            $timeout(function() {
                hljs.highlightBlock(element[0]);
            });
        }
    };
});
```

3. Update HTML:
```html
<pre><code highlight-code>{{code.source_code}}</code></pre>
```

## Debugging

### Common Debugging Techniques

#### 1. Console Logging

Add console.log statements to track data flow:

```javascript
console.log('Data received:', data);
console.log('Scope variable:', $scope.codeList);
```

#### 2. AngularJS Scope Inspection

In Chrome DevTools Console:
```javascript
// Get scope of an element
angular.element(document.querySelector('[ng-controller]')).scope()

// Access scope variables
angular.element(document.querySelector('[ng-controller]')).scope().codeList
```

#### 3. Network Inspection

1. Open DevTools → Network tab
2. Refresh the page
3. Click on the API request to HackerEarth
4. Inspect request/response headers and payload

#### 4. Breakpoints

Add `debugger;` statement in JavaScript:
```javascript
codeFactory.getCodeList()
    .success(function (data) {
        debugger; // Execution will pause here
        $scope.codeList = data.websites;
    });
```

### AngularJS Debugging Tips

#### Check if AngularJS is Loaded
```javascript
console.log(angular.version);
```

#### Watch Scope Changes
```javascript
$scope.$watch('codeList', function(newVal, oldVal) {
    console.log('codeList changed:', newVal);
});
```

## Troubleshooting

### Problem: Server Won't Start

**Error**: `Error: listen EADDRINUSE :::1111`

**Solution**: Port 1111 is already in use

```bash
# Find process using port 1111
lsof -i :1111

# Kill the process
kill -9 <PID>

# Or change the port in server.js
```

### Problem: No Data Displays

**Symptoms**: Loading spinner never disappears, no submissions shown

**Debugging Steps**:

1. Check browser console for errors
2. Check Network tab for failed API request
3. Verify API endpoint is accessible:
   ```bash
   curl http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=1
   ```
4. Check CORS policy
5. Verify internet connection

### Problem: Search Not Working

**Symptoms**: Typing in search box doesn't filter results

**Debugging Steps**:

1. Check console for JavaScript errors
2. Verify `ng-model="quickSearch"` is set on input
3. Verify filter syntax in ng-repeat
4. Check `compareValues` function is defined
5. Test with browser console:
   ```javascript
   angular.element(document.querySelector('[ng-controller]')).scope().quickSearch = 'Python';
   ```

### Problem: Filters Not Working

**Symptoms**: Radio buttons don't filter submissions

**Debugging Steps**:

1. Verify `ng-model="levelCheckbox"` is set correctly
2. Check that filter values match data values exactly
3. Inspect scope variable:
   ```javascript
   angular.element(document.querySelector('[ng-controller]')).scope().levelCheckbox
   ```

### Problem: Changes Not Reflecting

**Solution**: Hard refresh the browser
- Chrome/Firefox: `Ctrl + Shift + R` (Windows/Linux) or `Cmd + Shift + R` (Mac)
- Or clear browser cache

### Problem: Express Module Not Found

**Error**: `Error: Cannot find module 'express'`

**Solution**:
```bash
npm install express
```

## API Documentation

### HackerEarth API

**Endpoint**: `http://hackerearth.0x10.info/api/ctz_coders`

**Parameters**:
- `type`: `json` (Response format)
- `query`: `list_submissions` (Query type)
- `page`: `1` (Page number)

**Request Example**:
```bash
curl "http://hackerearth.0x10.info/api/ctz_coders?type=json&query=list_submissions&page=1"
```

**Response Structure**:
```json
{
  "websites": [
    {
      "title": "Problem Title",
      "language": "Python",
      "compiler_status": "Accepted",
      "source_code": "print('Hello World')",
      "metadata": {
        "level": "Easy"
      }
    }
  ]
}
```

### Internal API (AngularJS Services)

#### codeFactory.getCodeList()

**Description**: Fetches list of code submissions from HackerEarth API

**Returns**: Promise (AngularJS $http promise)

**Usage**:
```javascript
codeFactory.getCodeList()
    .success(function(data) {
        console.log('Submissions:', data.websites);
    })
    .error(function(error) {
        console.error('Error:', error);
    });
```

## Performance Optimization Tips

1. **Minimize DOM Manipulation**: Let AngularJS handle DOM updates
2. **Use One-Time Binding**: For static data, use `::` prefix
   ```html
   {{::code.title}}
   ```
3. **Limit ng-repeat**: Use pagination or virtual scrolling for large lists
4. **Debounce Search**: Add delay before filtering on keypress
5. **Track By**: Use `track by` in ng-repeat for better performance
   ```html
   <div ng-repeat="code in codeList track by $index">
   ```

## Environment Variables

For production deployments, consider using environment variables:

```javascript
// server.js
var PORT = process.env.PORT || 1111;
var NODE_ENV = process.env.NODE_ENV || 'development';

app.listen(PORT, function() {
    console.log('Server running on port ' + PORT + ' in ' + NODE_ENV + ' mode');
});
```

Set environment variables:
```bash
# Linux/Mac
export PORT=3000
export NODE_ENV=production

# Windows
set PORT=3000
set NODE_ENV=production
```

## Additional Resources

- [AngularJS Documentation](https://docs.angularjs.org/)
- [Express.js Documentation](https://expressjs.com/)
- [Lodash Documentation](https://lodash.com/docs/)
- [Bootstrap 3 Documentation](https://getbootstrap.com/docs/3.3/)
- [MDN Web Docs](https://developer.mozilla.org/)

## Getting Help

If you encounter issues not covered in this guide:

1. Check existing GitHub issues
2. Search Stack Overflow with tags: `angularjs`, `express`, `javascript`
3. Open a new issue on GitHub with:
   - Description of the problem
   - Steps to reproduce
   - Expected vs actual behavior
   - Browser and Node.js versions
   - Error messages or screenshots

---

Happy coding! 🚀
