const thisIsAnObject = (thing: any) => typeof thing === 'object' && !Array.isArray(thing)
const thisIsPrimitive = (thing: any) => typeof thing === 'string' || typeof thing === 'number' || typeof thing === 'boolean'

// this will deep copy objects and arrays
// I recently added support for functions, and a condition for unique classes but I haven't tested it much
// it might be borked if you pass in any "array-like objects" or Date objects, Nodelists, weird things like that
// it can handle Arrays, Objects, Number, String, Boolean, and functions
const recursiveStateCopy = (oldState: any) => {
  if (thisIsPrimitive(oldState) || typeof oldState === 'function') {
    return oldState
  }
  let newState: any
  if (Array.isArray(oldState)) {
    newState = oldState.map(value => recursiveStateCopy(value))
  } else if (thisIsAnObject(oldState)) {
    if (Object.getPrototypeOf(oldState).constructor.name === 'Object') {
      // this is a normal object
      newState = Object.assign({}, oldState)

      // iterate over keys, recurse
      Object.keys(oldState).forEach(key => { newState[key] = recursiveStateCopy(oldState[key]) })
    } else {
      // must be a unique class
      newState = Object.assign(Object.create(Object.getPrototypeOf(oldState)), oldState)

      // iterate over keys, recurse
      Object.keys(oldState).forEach(key => { newState[key] = recursiveStateCopy(oldState[key]) })
    }
  }
  return newState
}

export default recursiveStateCopy
