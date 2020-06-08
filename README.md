## To Run

Please Run:

$ npm install

$ npm start

The page should load on http://localhost:3000/


## Explanation

This project was created on React with some minimal extra dependencies. I didn't want to use any big dependency like _React-Table_ to create a whole Dashboard, because the exercise was mostly to show a demo pull info from the API and to display on the site.

I used the framework D3 for the graphics, and a couple of small dependencies for practical purposes like Range Input and Multselct input.

## Needs Work

- This is a MVP showing some basic elements from the API in an easy to navigate and to understand.
- The site is using SCSS altough super basic wihout much work in the areas of Mixins. Normally the mixins and variables will be created once we have a complete design insted of a design-as-you-go.
- The movie details page is also basic, and there's some missing information like Cast or Similar Movies. This implementation should be fairly straight forward.
- The "star" in the movies page to Rate the film, is just front end, and it will need a call to API or DB to be able to implement it correctly.
- Responsiveness: Because of the time contraint, the responsiveness is minimal. A new d3 graphic would need to be created to properly display in mobile. SVG is not a responsive-friendly format.
- Cleanup: The code needs some clean up, the are some variables and console.logs leftofvers, as well as missing Comments.