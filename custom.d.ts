declare module '*.svg' {
  const content: any
  export default content
}

declare module 'bcrypt'

// declare module 'JSX.IntrinsicElements' {
//   export interface JSX.IntrinsicElements {}
// }
declare module 'JSX' {
  export default interface JSX {
    IntrinsicElements: any;
  }
}
