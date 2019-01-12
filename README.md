This is a proof of concept for a WebExtension that would like to provide for a safe way to execute
custom script actions. Such scripts are untrusted and need some sandboxing. For this purpose, an
`<iframe>` with the sandbox attribute can be used. 

The CSP uses unsafe-eval and a hashed script checksum. This isn't great from a reviewer perspective
since a CSP with unsafe-eval is always a red flag, therefore it is very important that eval is not
used anywhere outside of the sandbox.

If you are migrating from an already existing user script API keep in mind that functions that
should return a value will require slightly more work, and will defintely be asynchronous. One
possible way to solve this would be to wrap the eval'd code into an async function and prefix all
usage of the formerly synchronous function with await. This isn't pretty, but it should work.

It is possible that a library such as [asvd/jailed](https://github.com/asvd/jailed) would take this
to the next level. It would be interesting to get input from the security experts on this library.
