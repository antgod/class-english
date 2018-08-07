https://developer.mozilla.org/en-US/docs/WebAssembly/Concepts

这篇文章在说明WebAssembly如何工作之前解释它的概念包含它的目标。
它是解决什么问题的，以及他在web浏览器里渲染引擎里如何运行。

什么是WebAssembly？
WebAssembly是一个可以运行在现代浏览器并提供新特性和以性能为主要目标的代码类型。它不是以手写为主要目标，而它的设计是为了
有效编译低等级的源码语言诸如：c,c++,rust等等为目标



What is WebAssembly?
WebAssembly is a new type of code that can be run in modern web browsers and provides new features and major gains in performance. It is not primarily intended to be written by hand, rather it is designed to be an effective compilation target for low-level source languages like C, C++, Rust, etc.

This has huge implications for the web platform — it provides a way to run code written in multiple languages on the web at near-native speed, with client apps running on the web that previously couldn’t have done so.

What’s more, you don’t even have to know how to create WebAssembly code to take advantage of it. WebAssembly modules can be imported into a web (or Node.js) app, exposing WebAssembly functions for use via JavaScript. JavaScript frameworks could make use of WebAssembly to confer massive performance advantages and new features while still making functionality easily available to web developers.

WebAssembly goals
WebAssembly is being created as an open standard inside the W3C WebAssembly Community Group with the following goals:

Be fast, efficient, and portable — WebAssembly code can be executed at near-native speed across different platforms by taking advantage of common hardware capabilities.
Be readable and debuggable — WebAssembly is a low-level assembly language, but it does have a human-readable text format (the specification for which is still being finalized) that allows code to be written, viewed, and debugged by hand.
Keep secure — WebAssembly is specified to be run in a safe, sandboxed execution environment. Like other web code, it will enforce the browser's same-origin and permissions policies.
Don't break the web — WebAssembly is designed so that it plays nicely with other web technologies and maintains backwards compatibility.
Note: WebAssembly will also have uses outside web and JavaScript environments (see Non-web embeddings).

How does WebAssembly fit into the web platform?
The web platform can be thought of as having two parts:

A virtual machine (VM) that runs the Web app’s code, e.g. the JavaScript code that powers your apps.
A set of Web APIs that the Web app can call to control web browser/device functionality and make things happen (DOM, CSSOM, WebGL, IndexedDB, Web Audio API, etc.).
Historically, the VM has been able to load only JavaScript. This has worked well for us as JavaScript is powerful enough to solve most problems people have on the Web today. We have run into performance problems, however, when trying to use JavaScript for more intensive use cases like 3D games, Virtual and Augmented Reality, computer vision, image/video editing, and a number of other domains that demand native performance (see WebAssembly use cases for more ideas).

Additionally, the cost of downloading, parsing, and compiling very large JavaScript applications can be prohibitive.  Mobile and other resource-constrained platforms can further amplify these performance bottlenecks.

WebAssembly is a different language from JavaScript, but it is not intended as a replacement. Instead, it is designed to complement and work alongside JavaScript, allowing web developers to take advantage of both languages' strong points:

JavaScript is a high-level language, flexible and expressive enough to write web applications.  It has many advantages — it is dynamically typed, requires no compile step, and has a huge ecosystem that provides powerful frameworks, libraries, and other tools.
WebAssembly is a low-level assembly-like language with a compact binary format that runs with near-native performance and provides languages with low-level memory models such as C++ and Rust with a compilation target so that they can run on the web. (Note that WebAssembly has the high-level goal of supporting languages with garbage-collected memory models in the future.)
With the advent of WebAssembly appearing in browsers, the virtual machine that we talked about earlier will now load and run two types of code — JavaScript AND WebAssembly.

The different code types can call each other as required — the WebAssembly JavaScript API wraps exported WebAssembly code with JavaScript functions that can be called normally, and WebAssembly code can import and synchronously call normal JavaScript functions.  In fact, the basic unit of WebAssembly code is called a module and WebAssembly modules are symmetric in many ways to ES2015 modules.

WebAssembly key concepts
There are several key concepts needed to understand how WebAssembly runs in the browser.  All of these concepts are reflected 1:1 in the WebAssembly JavaScript API.

Module: Represents a WebAssembly binary that has been compiled by the browser into executable machine code.  A Module is stateless and thus, like a Blob, can be explicitly cached in IndexedDB or shared between windows and workers (via postMessage()).  A Module declares imports and exports just like an ES2015 module.
Memory: A resizable ArrayBuffer that contains the linear array of bytes read and written by WebAssembly’s low-level memory access instructions.
Table: A resizable typed array of references (e.g. to functions) that could not otherwise be stored as raw bytes in Memory (for safety and portability reasons).
Instance: A Module paired with all the state it uses at runtime including a Memory, Table, and set of imported values.  An Instance is like an ES2015 module that has been loaded into a particular global with a particular set of imports.
The JavaScript API provides developers with the ability to create modules, memories, tables, and instances.  Given a WebAssembly instance, JavaScript code can synchronously call its exports, which are exposed as normal JavaScript functions.  Arbitrary JavaScript functions can also be synchronously called by WebAssembly code by passing in those JavaScript functions as the imports to a WebAssembly instance.

Since JavaScript has complete control over how WebAssembly code is downloaded, compiled and run, JavaScript developers could even think of WebAssembly as just a JavaScript feature for efficiently generating high-performance functions.

In the future, WebAssembly modules will be loadable just like ES2015 modules (using <script type='module'>), meaning that JavaScript will be able to fetch, compile, and import a WebAssembly module as easily as an ES2015 module.

How do I use WebAssembly in my app?
Above we talked about the raw primitives that WebAssembly adds to the Web platform: a binary format for code and APIs for loading and running this binary code.  Now let’s talk about how we can use these primitives in practice.

The WebAssembly ecosystem is at a nascent stage; more tools will undoubtedly emerge going forward. Right now, there are three main entry points:

Porting a C/C++ application with Emscripten.
Writing or generating WebAssembly directly at the assembly level.
Writing a Rust application and targetting WebAssembly as its output.
Let’s talk about these options:

Porting from C/C++
Two of the many options for creating WASM code are an online wasm assembler or Emscripten. There are a number of online WASM assembler choices, such as:

WasmFiddle
WasmFiddle++
WasmExplorer
These a great place to start for people who are just trying to figure out where to start, but they lack some of the inbuilt tools and optimizations of Emscripten.

The Emscripten tool is able to take just about any C/C++ source code and compile it into a .wasm module, plus the necessary JavaScript "glue" code for loading and running the module, and an HTML document to display the results of the code.



In a nutshell, the process works as follows:

Emscripten first feeds the C/C++ into clang+LLVM — a mature open-source C/C++ compiler toolchain, shipped as part of XCode on OSX for example.
Emscripten transforms the compiled result of clang+LLVM into a .wasm binary.
By itself, WebAssembly cannot currently directly access the DOM; it can only call JavaScript, passing in integer and floating point primitive data types. Thus, to access any Web API, WebAssembly needs to call out to JavaScript, which then makes the Web API call. Emscripten therefore creates the HTML and JavaScript glue code needed to achieve this.
Note: There are future plans to allow WebAssembly to call Web APIs directly.

The JavaScript glue code is not as simple as you might imagine. For a start, Emscripten implements popular C/C++ libraries like SDL, OpenGL, OpenAL, and parts of POSIX. These libraries are implemented in terms of Web APIs and thus each one requires some JavaScript glue code to connect WebAssembly to the underlying Web API.

So part of the glue code is implementing the functionality of each respective library used by the C/C++ code. The glue code also contains the logic for calling the above-mentioned WebAssembly JavaScript APIs to fetch, load and run the .wasm file.

The generated HTML document loads the JavaScript glue file and writes stdout to a <textarea>. If the application uses OpenGL, the HTML also contains a <canvas> element that is used as the rendering target. It’s very easy to modify the Emscripten output and turn it into whatever web app you require.

You can find full documentation on Emscripten at emscripten.org, and a guide to implementing the toolchain and compiling your own C/C++ app across to wasm at Compiling from C/C++ to WebAssembly.

Writing WebAssembly directly
Do you want to build your own compiler, or your own tools, or make a JavaScript library that generates WebAssembly at runtime?

In the same fashion as physical assembly languages, the WebAssembly binary format has a text representation — the two have a 1:1 correspondence. You can write or generate this format by hand and then convert it into the binary format with any of several WebAssemby text-to-binary tools.

For a simple guide on how to do this, see our Converting WebAssembly text format to wasm article.

Writing Rust Targetting WebAssembly
Since the end of November 2017, Rust Nightly has supported targetting WebAssembly as its output, without requiring Emscripten to port it over. More details here.

Summary
This article has given you an explanation of what WebAssembly is, why it is so useful, how it fits into the web, and how you can make use of it.

See also
WebAssembly articles on Mozilla Hacks blog
WebAssembly on Mozilla Research
Loading and running WebAssembly code — find out how to load your own WebAssembly module into a web page.
Using the WebAssembly JavaScript API — find out how to use the other major features of the WebAssembly JavaScript API.
Document Tags and Contributors
 Tags:  C C++ concepts Emscripten JavaScript rust text format web platform WebAssembly
 Contributors to this page: JonathanPool, chrisdavidmills, terrynsun, anonyco, sideshowbarker, Spidey, kenrick95, lukewagner, valera-rozuvan, kdex, rhmoller, davidg42, BrainBuzzer
 Last updated by: JonathanPool, Apr 16, 2018, 10:51:13 AM
