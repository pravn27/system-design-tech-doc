---
sidebar_position: 6
---

# E6 - undefined vs not defined in JS 🤔

> JS is a loosely typed language (weakly typed language). This video covers an in-depth analysis of the undefined keyword and mistakes you should avoid while using this keyword. It is a special keyword in JS and it acts as a placeholder for variables until they are assigned any value in them.

> Understand the difference between undefined and not defined in JS. Many developers assume that undefined is exactly the same as not defined, but that's not true. undefined is a value in JavaScript and in fact, it also takes up memory space. So watch this video to understand everything in deep.

- **undefined** is very special keyword in JS language

- Run below JS code to understand undefined

  - ```javascript
    var userName;

    if (userName === undefined) {
      console.log("userName is undefined");
    } else {
      console.log(
        "userName is not undefined, which is assigned some value to userName"
      );
    }

    // assign some value to userName
    userName = "Praveen";

    if (userName === undefined) {
      console.log("userName is undefined");
    } else {
      console.log(
        "userName is not undefined, which is assigned some value to userName"
      );
    }
    ```

- Undefined comes into picture during memory allocation phase, before starts executing the code

  - ![alt text](images/22kofkpj.3sp.png)

  - **<mark>undefined is like placeholder placed in the memory</mark>** during JS variables memory allocation, until assign some values to JS variables

- **<mark>undefined is completely different from not defined</mark>**

  - **not defined** will get which is not allocated memory to variables or functions
  - ![alt text](images/nunbuthb.jvl.png)

- **<mark>JS is loosely typed / weakly typed language, since JS does not attach its variable to any specific data types. JS is very flexible to changes its data types for variable, calling as dynamically typed language</mark>**

  - ![alt text](images/14uv0ky5.nld.png)

- Never do the mistake by assigning “undefined” to variable, not a good practice
  ```javascript
  var userName = undefined; // not recommended
  ```
