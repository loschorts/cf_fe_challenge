# CF Front-End Challenge

live demos: https://loschorts.github.io/cf_fe_challenge/index.html

[part 2 response](#part-2)

## Browser Support
	- IE9+
	- Chrome
	- Firefox
	- Safari

## Overview

The layout portion is done in pure html/css.

For the widgets portion, I decided to utilize React because the application
state and rendered UI changes frequently due to user input and (theoretically)
AJAX. React provides fast DOM updating and allows data to be passed between
different application components easily. I used Webpack with Babel to transpile
my ES6/JSX source code to cross-browser-compliant JS. Styles are done in basic CSS and
transpiled with Autoprefixer to ensure cross-browser compatibility. End-to-end testing was done via Nightwatch/Selenium. Unit testing could improve diagnostics, but the scope of the project and timeframe led me to prioritize end-to-end testing as a MVP litmus test.

Part 2 was written in ES5 (it seemed to match the concept of the problem more
closely). `EventEmitter`, `FriendEmitter`, `FriendList`, and `LinkedList` are
required directly in script tags by the document. In a more realistic scenario,
I would have used webpack to prevent global namespace pollution. DOM manipulation
was carried out with vanilla JS methods. 

## Responses to Design Questions

### Which design details are difficult to implement?

-**IE9 Compatibility**: IE9's lack of Flexbox support made layout more time-consuming, less responsive, and brittler than it would otherwise have been.

-**Table overflow support for long entries**: The presence of potentially long strings of data in the table made it necessary to implement a fixed table layout. This required explicit specification of column widths that would otherwise have been automatic.

### Which design details are impossible to implement?

I don't think any details were impossible to implement.

### Do they provide you with enough information to facilitate implementation?

The designs were vague on several key points, for which I made the following assumptions: 

- **Extreme screen dimensions:** Ideally, there would be an alternate layout for extreme screen dimensions (such as on vertical phone screens) that rearranged the widgets in a column or something similar. Because no specification was provided, I opted not to implement this and instead chose to crop the main window when its size began to dip below the widgets' collective minimums. If necessary, variable screen size could be addressed with more dynamic styling (Flexbox) and media queries.

- **Table mutability:** The specs are unclear about whether the table contents were meant to be mutable by user input, e.g. sortable, editable, etc. Therefore I assumed that the table data was static but kept the `Table` component modular so that changes could be easily introduced if necessary. This change would basically entail having the `Table` add `ord` and `id` params to each row of data provided and updating its render logic accordingly.

- **Check and select row functionality:** The requirements didn't specify any functionality, but I believe these features implicitly indicate a need for change handlers. Therefore, I built `Table` to store the active checked and selected rows in its internal state, and exposed an optional `onChange` callback prop that its parent could use to receive such changes.

```jsx
	//table.jsx
	handleChange(type, i) {
		return ()=> {
			const newSet = this.state[type].slice()
			newSet[i] = !newSet[i];
			this.setState({[type]: newSet}, ()=> {
				if (this.props.onChange) this.props.onChange(this.state);
			})
		}
	}

```

- **Navigation:** The App's navigation scheme had several ambiguities. First, I assumed that navigation would be single-page and implemented a hash-based routing scheme with `react-router`. Second, the designs didn't specify the behavior of the left-side nav bar. Therefore, I assumed that each link would redirect to a different path and have a different main (center) component. I defaulted the root path to redirect to `/#/dns`, the path containing the DNS table, and added a missing route placeholder component.

```jsx
const AppRouter = () => (
	<Router history={hashHistory}>
		<Redirect from="/" to="/dns" />
		<Route path="/" component={Root}>
			<Route path="dns" component={DNSTable}/>
			<Route path=":missing" component={NotFound}/>
			<IndexRoute component={DNSTable}/>
		</Route>
	</Router>
)
```

- **Table coloration**: I assumed the color scheme was based on the `Type` column of the table. However, I built the table to allow user specification of which column to color-code by, and what colors to use for which values, to improve modularity. One improvement going forward would be to delegate the specification of color to classes instead of setting them directly on the elements. I kept `TableRow` agnostic to whether colorization was needed by checking for the presence of a `colorBy` prop, and doing coloration in a `ColorSpan` component.

```jsx
	//table_row.jsx
		render(){
		...
		let borderColor;
		entries = entries.concat(values.map((v, i) => {
			const colorize = (i === headers.indexOf(colorBy));
			const color =  colorMap[v];
			if (colorize) borderColor = color;
			const content = colorize ? <ColorSpan color={color}>{v}</ColorSpan> : v;
			return(
				<td key={`${className}-row-${ord}-${i}`} className={headers[i]}>
					{content}
				</td>
			);
		}));

		return (
			<tr 
				style={{borderColor}}
				key={`className-row-${ord}`}
				onClick={this.handleSelect} 
				className={`${className}-row ${selectedClass} ${checkedClass}`}>
				{entries}
			</tr>
		)
	}
```

- **Value text**: I assumed that light-gray text was boilerplate generated based on the record `Type`, and implemented a switch to automatically insert it into the table. I kept this logic in the `DNSTable` component to keep the `Table` more content-agnostic.

```jsx
	//dns_table.jsx
	const prepend = (type, text) => {
		let prefix;
		switch (type) {
			case "A":
			case "AAAA":
				prefix = <Prefix text="points to"/>
				break;
			case "MX":
				prefix = <Prefix text="mail handled by"/>
				break;
		}

		return <span>{prefix}{text}</span>
	}

	class DNSTable extends React.Component {
		...
		componentDidMount () {
			this.fetchData().then(records => {
				records = records.map(r => ({
					Type: r.type,
					Name: r.name,
					Value: prepend(r.type, r.value),
					TTL: r.ttl
				}))
				this.setState({ records })
			});
		}
		...
		render() {
			if (this.state.records) {
				return (
					<Table 
						className="dns-table" 
						headers={headers} 
						colorBy="Type" 
						colorMap={colorMap}
						data={this.state.records}
					/>
				);			
			} else {
				return <div>loading...</div>
			}
		}
	}
```

- **TTL values**: I assumed these were generated by the API response, but another possible format would be for the API to return an expiration date, leaving it up to the front-end to generate a TTL.

- **Login form validation && authentication:** These were unspecified, so I implemented basic format and length checks on email and password, respectively. The `LoginForm` is also able to receive server-side authentication errors and display them once a response is received.


```jsx
	//login_form.jsx
	class LoginForm extends React.Component {
		handleSubmit(e){
			e.preventDefault();
			this.clearErrors().then(this.validate).then(this.submit, this.updateErrors);
		}
		clearErrors(){
			const errors = getNewErrors();
			return new Promise(resolve => {
				this.setState({errors}, resolve)
			});
		}
		validate(){
			let {email, password} = this.state;
			const emailIsValid = emailValidator.test(email)
			const pwIsValid = pwValidator.test(password)

			return new Promise((resolve, reject) => {

				if (emailIsValid && pwIsValid) {
					resolve()
				} else {
					const errors = getNewErrors();
					if (!emailIsValid) errors.email.push(invalidEmailMsg)
					if (!pwIsValid) errors.password.push(invalidPwMsg)
					reject(errors);
				}
			})
		}
		submit(){
			// simulates server-side error response
			setTimeout(()=>{
				const resErrorMsg = "Server-side authentication error."
				const errors = getNewErrors();
				errors.email.push(resErrorMsg);
				this.updateErrors(errors);
			}, 500)
		}
		updateErrors(errors){
			this.setState({errors});
		}
	}
```

### How would you change them? How might you seek confirmation or feedback?

The designs leave many implementation details undiscussed, so my main revision would be to add wireframes of more specific application states throughout. 

I would have (and should have) supplied additional wireframes with my clarification questions in seeking feedback about the project parameters. Had I been able to receive feedback during the development process, I would probably solicit it through sharing screenshots and requesting feedback after completing each major feature.

### Are they good designs? That is, in your opinion, do they contain design errors?

I think the designs were good, despite a few errors. As discussed above, more detail would have improved the development process. Another possible area of improvement would be in screen-size responsiveness, which is largely unaddressed.

From a UX perspective, I think the checkbox/select features were slightly vague and could potentially overlap in functionality. I would also question the prominence and permanence of the login form, which could have been displayed in a way that was less obtrusive to the main functionality (viewing the table).

### If they were to be implemented as is, would they enhance or hinder the user experience?

Please see the above response.

### What browser-specific issues arise from the designs?

The primary browser-specific issue I encountered was styling for IE9. Without flexbox, I had to use much more explicit layout settings than otherwise, and the app as-it-stands suffers from poor responsiveness. 

Another issue I had was with the varying levels of vendor support for certain CSS styles. I solved this by using `autoprefixer` with `postcss-cli`, which allowed me to auto-generate the appropriate prefixes for my CSS.

Because I used webpack for JS transpilation, I had very few other cross-browser issues. The only issue I specifically had to address was with the use of `Promise` syntax. I required the `es6-promise` polyfill to handle this. 

### What compromises or changes would you make to facilitate cross-browser implementation?

I believe that the main compromise on this project was doing CSS layout without flexbox. The other main compromise was locating all of my CSS in one file to simplify autoprefixing. This was mainly a time-constraint compromise, as I didn't have time to research the proper way of easily transpiling multiple CSS files with the tools I had at hand. This was partly due the the constraints of the first part of the project, where JS was disallowed, making certain webpack modules for style-processing unusable.

## Improvements

- [x] End-to-End testing via Nightwatch.
- [ ] Implement Unit.

- [ ] Refactor stylesheets to use webpack and / or multiple files organized by domain.

- [ ] Implement a better CSS transpiling strategy.

- [ ] Responsive styling.

- [ ] Table ordering should be explicit and not implied from data order.

- [ ] Extract coloring logic from `Table` and into CSS.

- [ ] Disable Submit button while a request is pending.


## Part 2

https://loschorts.github.io/cf_fe_challenge/part2/index.html

[response source code](part2)

## Bonus Questions

### How can EventEmitter change to support wildcard tokens in the event key ( app.*.log )?

By storing regex matchers for wildcards:

```js

function EventEmitter(options) {
	this._ons = {};
	this._onces = {};
}

EventEmitter.prototype.on = function(name, cb){
	
	var matcher = name.replace("*", ".+")

	if(!this._ons[matcher]) this._ons[matcher] = [];
	this._ons[matcher].push(cb);
}

EventEmitter.prototype.emit = function(name){
	var args = [].slice.call(arguments, 1)

	for (matcher in this._ons) {
		if new RegExp(matcher).test(name) {
			for (var i = 0 ; i < this._ons[matcher].length ; i++) {
			this._ons[name][i].apply(null, args)
		}
	}
	...
}

```

### How Can EventEmitter be modified to support a limited number of callbacks for a given event key?

By checking the number of callbacks already registered before adding the callback passed to `on`.

```js
function EventEmitter(options) {
	this._ons = {};
	this._onces = {};
	this.maxHandlers = options.maxHandlers;
}

EventEmitter.prototype.on = function(name, cb){
	
	if(!this._ons[name]) this._ons[name] = [];
	if (this.maxHandlers && this._ons[name].length >= this.maxHandlers) return;
	this._ons[name].push(cb);
}

```
