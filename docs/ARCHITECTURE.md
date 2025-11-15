# Architecture Documentation

## Overview

Code Cafe is a single-page web application (SPA) built using AngularJS 1.x on the frontend and Express.js on the backend. The application follows the Model-View-Controller (MVC) architectural pattern provided by AngularJS.

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                           Browser                                │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    AngularJS Application                     │ │
│  │                                                              │ │
│  │  ┌──────────┐  ┌────────────┐  ┌───────────────────────┐  │ │
│  │  │   View   │  │ Controller │  │       Factory         │  │ │
│  │  │          │◄─┤            │◄─┤    (codeFactory)      │  │ │
│  │  │index.html│  │searchCtrl  │  │                       │  │ │
│  │  └──────────┘  └────────────┘  └───────────┬───────────┘  │ │
│  │                                             │               │ │
│  └─────────────────────────────────────────────┼──────────────┘ │
└─────────────────────────────────────────────────┼────────────────┘
                                                  │
                                          HTTP GET Request
                                                  │
                    ┌─────────────────────────────▼──────────────┐
                    │      HackerEarth API                       │
                    │  http://hackerearth.0x10.info/api/...      │
                    └────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                      Express.js Server                          │
│                      (Port 1111)                                │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              Static File Server                         │   │
│  │  - Serves HTML, CSS, JavaScript                         │   │
│  │  - Serves image assets                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components

#### 1. Application Module (`app.js`)
- **Purpose**: Initializes the AngularJS application
- **Dependencies**: `ui.bootstrap`
- **Responsibilities**:
  - Bootstrap the AngularJS framework
  - Register the application module
  - Define module dependencies

#### 2. View Layer (`index.html`)
- **Purpose**: User interface and presentation
- **Key Features**:
  - Two-column responsive layout (Bootstrap grid)
  - Left column: Search input and code submission cards
  - Right column: Filter controls and statistics panel
- **Data Binding**: Uses AngularJS directives for two-way data binding
  - `ng-model`: Binds input fields to scope variables
  - `ng-repeat`: Iterates over data collections
  - `ng-show`: Conditionally displays elements
  - Filters: `filter:quickSearch:compareValues` and `filter:levelCheckbox`

#### 3. Controller Layer (`controllers/searchController.js`)
- **Purpose**: Business logic and data management
- **Responsibilities**:
  - Initialize application state
  - Fetch data from API via factory
  - Process and aggregate data for statistics
  - Manage search and filter functionality
  - Control UI loading states

**Key Scope Variables**:
```javascript
$scope.loading          // Controls content visibility
$scope.imageLoading     // Controls loading spinner
$scope.codeList         // Complete list of submissions
$scope.stats            // Statistical aggregations
$scope.levelCheckbox    // Filter state
```

**Key Methods**:
```javascript
compareValues(value, searchValue)  // Custom search filter logic
```

#### 4. Service Layer (`factories/codeFactory.js`)
- **Purpose**: Data access and API communication
- **Pattern**: Factory pattern
- **Methods**:
  - `getCodeList()`: Fetches submissions from HackerEarth API
- **Returns**: Promise object from `$http` service

### Backend Components

#### Express.js Server (`server.js`)
- **Purpose**: Serve static files and host the application
- **Port**: 1111
- **Routes**:
  - `GET /`: Serves `index.html`
  - Static file middleware: Serves all files from root directory
- **Architecture**: Simple static file server (no server-side rendering)

## Data Flow

### Application Initialization Flow

```
1. User navigates to http://localhost:1111
        ↓
2. Express serves index.html
        ↓
3. Browser loads HTML, CSS, and JavaScript
        ↓
4. AngularJS bootstraps application
        ↓
5. searchController initializes
        ↓
6. Controller calls codeFactory.getCodeList()
        ↓
7. Factory makes HTTP GET request to HackerEarth API
        ↓
8. API returns JSON data with submissions
        ↓
9. Controller processes data:
   - Stores in $scope.codeList
   - Generates statistics using Lodash
   - Updates loading states
        ↓
10. View updates via data binding
        ↓
11. User sees code submissions and statistics
```

### Search and Filter Flow

```
User types in search box
        ↓
ng-model updates $scope.quickSearch
        ↓
AngularJS filter chain executes:
  1. filter:quickSearch:compareValues
     - Calls compareValues() for each item
     - Returns true/false for inclusion
  2. filter:levelCheckbox
     - Filters by selected status
        ↓
ng-repeat re-renders filtered results
        ↓
View updates in real-time
```

### Statistics Generation Flow

```
Raw data received from API
        ↓
Lodash _.countBy() aggregates data:
  - Count by language
  - Count by title
  - Count by difficulty level
        ↓
Results stored in $scope.stats object
        ↓
ng-repeat displays statistics
```

## Design Patterns

### 1. Model-View-Controller (MVC)
- **Model**: Data from HackerEarth API, stored in `$scope.codeList`
- **View**: HTML template with AngularJS directives
- **Controller**: `searchController` manages business logic

### 2. Factory Pattern
- Used for service creation (`codeFactory`)
- Encapsulates API communication logic
- Provides reusable service interface

### 3. Dependency Injection
- AngularJS DI container manages dependencies
- Controllers and factories declare dependencies via array notation
- Example: `['$scope', 'codeFactory', function($scope, codeFactory) {...}]`

### 4. Observer Pattern
- AngularJS's two-way data binding
- View automatically updates when model changes
- User input automatically updates model

### 5. Filter Pattern
- Custom `compareValues` function for search logic
- Chained filters for multiple criteria
- Declarative filtering in templates

## Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|------------|---------|---------|
| AngularJS | 1.5.8 | JavaScript MVC framework |
| Bootstrap | 3.3.7 | CSS framework and responsive design |
| Angular UI Bootstrap | 2.1.3 | Bootstrap components for AngularJS |
| Lodash | 4.15.0 | Utility library for data manipulation |

### Backend Technologies

| Technology | Purpose |
|------------|---------|
| Node.js | JavaScript runtime environment |
| Express.js | Web server framework |

### External APIs

| API | Purpose |
|-----|---------|
| HackerEarth API | Source of code submission data |

## Data Model

### Submission Object Structure

Based on API response, each submission object contains:

```javascript
{
  title: String,              // Problem title
  language: String,           // Programming language (e.g., "Python", "C++")
  compiler_status: String,    // Status: "Accepted", "Wrong Answer", etc.
  source_code: String,        // Full source code of submission
  metadata: {
    level: String            // Difficulty level
  }
}
```

### Statistics Object Structure

```javascript
$scope.stats = {
  top_5_languages_used: {
    "Python": 25,
    "C++": 18,
    "Java": 12,
    // ... more languages
  },
  top_2_submissions_attempted: {
    "Problem Title 1": 15,
    "Problem Title 2": 12,
    // ... more problems
  },
  submissions_per_level: {
    "Easy": 30,
    "Medium": 20,
    "Hard": 10
  },
  total_submissions: 60
}
```

## Security Considerations

### Current State

1. **No Authentication**: Application is publicly accessible
2. **CORS**: Relies on HackerEarth API CORS policy
3. **No Input Sanitization**: User input not sanitized (XSS risk if data source changes)
4. **HTTP**: Uses HTTP instead of HTTPS (in development)

### Recommendations for Production

1. Implement HTTPS for secure communication
2. Add Content Security Policy (CSP) headers
3. Sanitize user input to prevent XSS attacks
4. Implement rate limiting for API requests
5. Add error handling for failed API requests
6. Consider caching API responses to reduce load

## Performance Considerations

### Current Optimizations

1. **Single API Call**: All data fetched once on load
2. **Client-Side Filtering**: No server round-trips for search/filter
3. **Loading Indicators**: Visual feedback during data fetch

### Potential Improvements

1. **Lazy Loading**: Load submissions on scroll (virtualization)
2. **Caching**: Cache API responses in browser storage
3. **Code Splitting**: Separate vendor and application JavaScript
4. **Minification**: Minify CSS and JavaScript
5. **Image Optimization**: Compress and optimize images
6. **CDN Usage**: Already using CDNs for libraries (good)

## Scalability Considerations

### Current Limitations

1. All data loaded at once (memory intensive for large datasets)
2. No pagination (API request is hardcoded to page 1)
3. Client-side filtering becomes slow with thousands of items

### Scaling Strategies

1. Implement pagination or infinite scroll
2. Add server-side filtering and search
3. Implement virtual scrolling for large lists
4. Consider backend caching layer
5. Optimize bundle size with tree-shaking
6. Migrate to modern framework (React/Vue/Angular) for better performance

## Deployment Architecture

### Current Setup
```
Developer Machine
    ↓
node server.js
    ↓
Express serves on localhost:1111
```

### Recommended Production Setup
```
Load Balancer (nginx)
    ↓
Application Server (PM2 + Node.js)
    ↓
CDN (for static assets)
```

## Future Architecture Considerations

1. **Framework Migration**: Consider upgrading from AngularJS 1.x to modern framework
2. **Backend API**: Build custom backend instead of direct API calls
3. **Database**: Store submissions in database for better querying
4. **Microservices**: Separate concerns into smaller services
5. **Testing**: Add unit and integration tests
6. **CI/CD Pipeline**: Automate testing and deployment
7. **Monitoring**: Add application performance monitoring (APM)
8. **Logging**: Implement structured logging for debugging

## Conclusion

Code Cafe follows a simple but effective architecture suitable for a small to medium-sized application. The separation of concerns through MVC pattern, use of dependency injection, and client-side rendering make it maintainable and easy to understand. However, for production use and scaling, several improvements should be considered as outlined in the recommendations above.
