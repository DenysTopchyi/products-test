# SOLUTION

```
Architecture: React + Vite + TypeScript for the front-end, Zustand for state management, shadcn/ui + TailwindCSS for the UI components and styling. json-server is used as a mock API, Axios for HTTP requests.

It connects to a mock API powered by json-server and demonstrates:
A products table with pagination
A sidebar with filters (search, tags, price, subscription, published)
Loading, error, and empty states
Clean UI with reusable components and debounced inputs
The goal is to showcase a scalable front-end architecture that is simple to extend, easy to use, and aligned with the acceptance criteria of the assignment.
```

```
How to run:

npm install
npm run dev
```

```gherkin
Scenario: Default view shows table, filters, and pagination
Given I open the product collection page
Then I see the filters sidebar
And I see a products table
And I see 7 products in the table on the first page
And I see pagination controls
And the total number of products is 12

Scenario: Search by tag "Dog" returns 11 items
Given I am on the product collection page
When I type "Dog" in the "Tags search" field
Then the resulting table shows 11 matching products (across pages)
And the first page shows up to 7 items due to pagination

Scenario: Filter by price 127 returns 4 items
Given I am on the product collection page
When I enter "127" in the "Price (exact)" field
Then the resulting table shows 4 products (across pages)
And the first page shows up to 4 items if fewer than page size

Scenario: Filter by Subscription Yes and search "Cat"
Given I am on the product collection page
And "Published only" is OFF by default
When I enable the "Subscription (Yes)" filter
And I type "Cat" in the "Tags search" field
Then the resulting table shows 5 products (across pages)
```

## Estimation

Estimated: 5 hours

Spent: 4 hours

## Solution

Comments on your solution

```
- Skeleton components could be added for the loading state to improve the UX.
- For API calls, React Query (TanStack Query) could be used instead of a manual store/fetch implementation, but given the simplicity of the app it was not strictly necessary.
- Error and empty states are handled, but could be enhanced with more user-friendly visuals. ( toast for example )
- Sorting, advanced filters (e.g., price ranges, multi-tag selection), and persistence of filters (URL or localStorage) could be added in a real product scenario.
```
