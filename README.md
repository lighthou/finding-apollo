# Bit of a rundown
Here's a brief rundown so it's a bit clearer what I've done.    

Styling-wise I tried to just avoid any libraries other than using JSS because figured it'd make my life a bit easier for this.

## The Multi Section Nav

I started off by making an enum to represent what states the icons could be in (available/unavailable/completed/invalid), and (since it conviniently worked not that it's good practice), assigned the appropriate colours to those enums.   

So MultiSectionIcon.tsx is a simple component that will take one of those states (and whether the icon is active or not) and appropriately return the icon necessary and colour necessary. This way the parent can simply track the 'state' of each icon and which icon is active to have access to all the colours and icons needed. It also meant, since the parent will have access to each of the screens 'states' which each map to a colour, the parent also has access to what colours the lines in between sections need to be.

## Tooltip over Icons

I wasn't getting the cssarrowplease to work effectively for this, so I went a different route for the tooltip. Which left me where the 'content' is needed to be specified to get the appropriate text in the tooltip. At this point I didn't want to spend more time on this so while the tooltips are there they dont work properly. 

## The Forms

To be honest these were done pretty ad-hoc since I spent more time thinking about the other stuff. Which to be fair it said they can be whatever...so they are.

## Weirdness

I think there's probably some residual confusing things around given that I tried to pivot how the component would work. Started off trying to make a generic component that could take in screens and appropriately handle creating navigation between those screens etc etc. Ran into some problems fairly quickly.   

 - You'd have to have some super dynamic stuff to handle each screen being able to update different state (e.g one screen updates name,email,phone and another updates simply a time) and it being this dynamic is probably too much effort for what it ends up providing. 

Mostly the 'screens' needing to be aware of the navigation and take appropriate props to trigger state callback (I didn't really want to do non-local state for this). So I thought about passing elements and building them but it was being weird and I didn't want to spend a ton of time on this. 

So for now I've just made a set number of screen that take shared props and have callbacks to update state - not ideal really but I think this is a side-effect of trying to make it generic at the start.



# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
