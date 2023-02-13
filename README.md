# Auto React context

---

[![npm version](https://badge.fury.io/js/auto-react-context.svg)](//npmjs.com/package/auto-react-context)

**Lightweight and simple solution to react context creation.**

Creating a React context is simple and straightforward, the tediousness begins when we need to deal with more than a single context.

Traditionally, you would need to go through the context creation boilerplate, each time you need to make a new one.

**Solution**

> auto-react-context creates automatically a new context for you, all you have to do is follow the steps below.

## Getting started

### Installation

```bash
npm install auto-react-context
```

Let's use a simple book store application as an example.

The application let's you perform basic CRUD operations, to implement this feature using Context API with **auto-react-context** we would do the following :

```javascript
// in your Context file
import createDataContext from "auto-react-context";

// book reducer function
const bookReducer = (state, action) => {
  switch (action.type) {
    case "ADD_BOOK":
      return { ...state, books: [...state.books, action.payload] };
    case "REMOVE_BOOK":
      return {
        ...state,
        books: state.books.filter((book) => book.id !== action.payload),
      };
    default:
      return state;
  }
};

// Create your action creators
const addBook = (dispatch) => (title, author) => {
  dispatch({ type: ADD_BOOK, payload: { title, author } });
};

const removeBook = (dispatch) => (id) => {
  dispatch({ type: REMOVE_BOOK, payload: id });
};

// here is where it all happens
// Export Context and Provider from createDataContext 
export const { Context, Provider } = createDataContext(
  // Pass the reducer as first argument
  bookReducer,
  // Pass an object with your action creators
  {
    addBook,
    removeBook,
  },
  //Pass your state object
  {}
);
```

Now that we exported the Context and The Provider, let's use them:

**Provider**

---

```javascript
// In your App.js
// Rename Provider as it will collide with other providers, in case we have multiple instances
// in this use case bookProvider.
import { Provider as BookProvider } from "./context/BookContext";

function App() {
  return (
    <div className="App">
      <BookProvider>
       <OtherComponentsGoHere>
      </BookProvider>
    </div>
  );
}
```

**Context**

---

```javascript
// Same here
import { Context as BookContext } from "../context/BookContext";

// here you have access to your BookContext
const BookList = () => {
  const {
    state: { books },
  } = useContext(BookContext);
  return books && books.length ? (
    <div className="book-list">
      <ul>
        {books.map((book) => {
          return <BookDetails book={book} key={book.id} />;
        })}
      </ul>
    </div>
  ) : (
    <div className="empty">No Books to read at this moment.</div>
  );
};
```
