const events = require("events");
const { emitWarning } = require("process");

const emitter = new events.EventEmitter();

emitter.on("customEvent", (message, user) => {
    console.log(`${user}: ${message}`);
});

process.stdin.on("data", data => {
    const input = data.toString().trim();

    if (input === "exit") {
        emitter.emit("customEvent", "Goodbye!", "process");
        process.exit();
    }
    emitter.emit("customEvent", input, "terminal");
});