# Result Object

### Introduction 

The following code is a POC around result objects in JS. The goal of Result Objects is the simplify the flow of the code by separating normal operation (that might fail) and keep the errors for unexpected failures. 

To create a user, you might want to check if the email is not already used. So the function createUser can either succed or fail because the email is already in use or fail because the database cannot be reached. The difference between the two failures is the *raison d'être* of the Result Object. The operational failure, you might want to act on it, the other one maybe less so, or not a the same space, and not in the same workflow.

### Documentation

A Result object is an object which has a state (Success or Failure) and an associated value.
```javascript
const result = Result.Success(5);
```
Here for example, the object has the state `Success` and as associated value `5`.

* To create a success object : `Result.Success(value)`
* To create a failure object : `Result.Failure(value)`

A Result Object has two helper methods to check if it is a success or a failure: 
`result.isSuccess` and `result.isFailure` that return boolean to check the state.

Furthermore to simplify the flow in the promise chain two methods where added to the Promise prototype: 

 * `promise.thenForSuccess` 
 * `promise.thenForFailure`
 
 Those act like a regular `promise.then` function, but only evaluate if the object is an instance of `Result` and is or a success or a failure.
 
 ```javascript
const promise = Promise.resolve(Result.Success(5))

promise.thenForSuccess((result) => {
  // the code here will evaluate
  // result here is Result.Sccess(5)
})

promise.thenForFailure((result) => {
  // the code here will not evaluate
})

promise.then((result) => {
  // the code here will evaluate
  // result here is also Result.Sccess(5)
})
```

As `promise.thenForSuccess` and `promise.thenForFailure` return regular promises they can be chained like normal promises and mixed with `then` and `catch`

 ```javascript
 const promise = Respository.getRemoteValue()
 .thenForSuccess((result) => {
   // the code here will manage the result if the call was a success
 })
 .thenForFailure((result) => {
   // the code here will manage the result if the call failed
 })
 .then(() => {
   // then you can chain normal promises or continue returning Result Objects and chain with thenForSuccess and thenForFailure
 })
 .catch((error) => {
   // thenForSuccess and thenForFailure will not catch errors so exceptions can still be thrown whenever you want and be caught in your promise chain
 })
 ```   
